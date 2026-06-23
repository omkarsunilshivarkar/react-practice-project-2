import { useNavigate, useNavigation, useActionData, json, redirect } from "react-router-dom";
import { Form } from "react-router-dom";

import classes from "./BlogForm.module.css";

function BlogForm({ method, blog }) {
  const navigate = useNavigate();
  const data = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

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
        <input
          id="category"
          type="text"
          name="category"
          required
          placeholder="e.g. Design, Product, Software Engineering"
          defaultValue={blog ? blog.category : ""}
        />
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
      <p>
        <label htmlFor="readTime">Read Time (minutes)</label>
        <input
          id="readTime"
          type="number"
          name="readTime"
          min="1"
          required
          defaultValue={blog ? blog.readTime : ""}
        />
      </p>
      <p>
        <label htmlFor="image">Featured Image URL</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={blog ? blog.image : ""}
        />
      </p>
      <p>
        <label htmlFor="date">Publish Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={blog ? blog.date : ""}
        />
      </p>
      <p>
        <label htmlFor="description">Blog Content</label>
        <textarea
          id="description"
          name="description"
          rows="10"
          required
          defaultValue={blog ? blog.description : ""}
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

  const blogData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
    author: data.get("author"),
    readTime: data.get("readTime"),
    category: data.get("category"),
  };

  let url = "http://localhost:8080/blogs";

  if (method === "PATCH") {
    const blogId = params.blogId;
    url = "http://localhost:8080/blogs/" + blogId;
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
