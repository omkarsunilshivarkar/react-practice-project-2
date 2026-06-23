const fs = require('node:fs/promises');

const { v4: generateId } = require('uuid');

const { NotFoundError } = require('../util/errors');

async function readData() {
  const data = await fs.readFile('blogs.json', 'utf8');
  return JSON.parse(data);
}

async function writeData(data) {
  await fs.writeFile('blogs.json', JSON.stringify(data));
}

async function getAll() {
  const storedData = await readData();
  if (!storedData.blogs) {
    throw new NotFoundError('Could not find any blogs.');
  }
  return storedData.blogs;
}

async function get(id) {
  const storedData = await readData();
  if (!storedData.blogs || storedData.blogs.length === 0) {
    throw new NotFoundError('Could not find any blogs.');
  }

  const blog = storedData.blogs.find((b) => b.id === id);
  if (!blog) {
    throw new NotFoundError('Could not find blog for id ' + id);
  }

  return blog;
}

async function add(data) {
  const storedData = await readData();
  storedData.blogs.unshift({ ...data, id: generateId() });
  await writeData(storedData);
}

async function replace(id, data) {
  const storedData = await readData();
  if (!storedData.blogs || storedData.blogs.length === 0) {
    throw new NotFoundError('Could not find any blogs.');
  }

  const index = storedData.blogs.findIndex((b) => b.id === id);
  if (index < 0) {
    throw new NotFoundError('Could not find blog for id ' + id);
  }

  storedData.blogs[index] = { ...data, id };

  await writeData(storedData);
}

async function remove(id) {
  const storedData = await readData();
  const updatedData = storedData.blogs.filter((b) => b.id !== id);
  await writeData({ blogs: updatedData });
}

exports.getAll = getAll;
exports.get = get;
exports.add = add;
exports.replace = replace;
exports.remove = remove;
