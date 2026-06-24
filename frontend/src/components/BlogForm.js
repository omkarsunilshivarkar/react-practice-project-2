import { useNavigate, useNavigation, useActionData, json, redirect } from "react-router-dom";
import { Form } from "react-router-dom";
import { useState } from "react";

import classes from "./BlogForm.module.css";

function BlogForm({ method, blog }) {
  const navigate = useNavigate();
  const data = useActionData();
  const navigation = useNavigation();

  // Track the blog content for read time auto-calculation
  const [description, setDescription] = useState(blog ? blog.description : "");

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  // Calculate read time (assuming 200 words per minute average)
  const wordsCount = description.trim().split(/\s+/).filter(Boolean).length;
  const computedReadTime = Math.max(1, Math.ceil(wordsCount / 200));

  // Determine publish date: default to today's date for new blogs, or preserve original date for editing
  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <Form method={method} className={classes.form}>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Blog Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={blog ? blog.title : ""}
        />
      </p>
      <p>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          required
          defaultValue={blog ? blog.category : "Design"}
        >
          <option value="Design">Design</option>
          <option value="Product">Product</option>
          <option value="Software Engineering">Software Engineering</option>
          <option value="AI & Machine Learning">AI & Machine Learning</option>
          <option value="Cloud Computing">Cloud Computing</option>
          <option value="Cybersecurity">Cybersecurity</option>
          <option value="Others">Others</option>
        </select>
      </p>
      <p>
        <label htmlFor="author">Author Name</label>
        <input
          id="author"
          type="text"
          name="author"
          required
          defaultValue={blog ? blog.author : ""}
        />
      </p>
      <input
        type="hidden"
        name="readTime"
        value={computedReadTime}
      />
      <p>
        <label htmlFor="image">Featured Image URL (Optional)</label>
        <input
          id="image"
          type="url"
          name="image"
          placeholder="e.g. https://images.unsplash.com/... (optional)"
          defaultValue={blog ? blog.image : ""}
        />
      </p>
      <input
        type="hidden"
        name="date"
        value={blog ? blog.date : currentDate}
      />
      <p>
        <label htmlFor="description">Blog Content</label>
        <textarea
          id="description"
          name="description"
          rows="10"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Blog"}
        </button>
      </div>
    </Form>
  );
}

export default BlogForm;

export async function action({ request, params }) {
  const data = await request.formData();
  const method = request.method;

  // Select a default image if featured image url is left blank
  let imageUrl = data.get("image");
  if (!imageUrl || imageUrl.trim() === "") {
    imageUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80";
  }

  const blogData = {
    title: data.get("title"),
    image: imageUrl,
    date: data.get("date"),
    description: data.get("description"),
    author: data.get("author"),
    readTime: data.get("readTime"),
    category: data.get("category"),
  };

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";
  let url = `${BACKEND_URL}/blogs`;

  if (method === "PATCH") {
    const blogId = params.blogId;
    url = `${BACKEND_URL}/blogs/${blogId}`;
  }

  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(blogData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not save blog post.' }, { status: 500 });
  }

  return redirect('/blogs');
}
