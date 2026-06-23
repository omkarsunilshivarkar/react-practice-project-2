import {
  json,
  useRouteLoaderData,
  redirect,
  defer,
  Await,
} from "react-router-dom";
import BlogItem from "../components/BlogItem";
import BlogsList from "../components/BlogsList";
import { Suspense } from "react";

function BlogDetailPage() {
  const { blog, blogs } = useRouteLoaderData("blog-detail");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading blog post...</p>}>
        <Await resolve={blog}>
          {(loadedBlog) => <BlogItem blog={loadedBlog} />}
        </Await>
      </Suspense>

      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading other blogs...</p>}>
        <Await resolve={blogs}>
          {(loadedBlogs) => <BlogsList blogs={loadedBlogs} />}
        </Await>
      </Suspense>
    </>
  );
}

export default BlogDetailPage;

async function loadBlog(id) {
  const response = await fetch("http://localhost:8080/blogs/" + id);

  if (!response.ok) {
    throw json({ message: "Could not fetch blog details." }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.blog;
  }
}

async function loadBlogs() {
  const response = await fetch("http://localhost:8080/blogs");

  if (!response.ok) {
    throw json({ message: "Could not fetch blogs." }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.blogs;
  }
}

export async function loader({ request, params }) {
  const id = params.blogId;
  return defer({
    blog: await loadBlog(id),
    blogs: loadBlogs(),
  });
}

export async function action({ request, params }) {
  const blogId = params.blogId;
  const response = await fetch("http://localhost:8080/blogs/" + blogId, {
    method: request.method,
  });
  if (!response.ok) {
    throw json({ message: "Could not delete blog." }, { status: 500 });
  }
  return redirect("/blogs");
}
