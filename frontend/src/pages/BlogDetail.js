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
import classes from "./BlogDetail.module.css";

function BlogDetailPage() {
  const { blog, blogs } = useRouteLoaderData("blog-detail");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center", color: "var(--text-secondary)" }}>Loading blog post...</p>}>
        <Await resolve={blog}>
          {(loadedBlog) => (
            <>
              <BlogItem blog={loadedBlog} />
              
              <Suspense fallback={<p style={{ textAlign: "center", color: "var(--text-secondary)" }}>Loading recommendations...</p>}>
                <Await resolve={blogs}>
                  {(loadedBlogs) => {
                    const recommendedBlogs = loadedBlogs
                      .filter((b) => b.id !== loadedBlog.id && b.category === loadedBlog.category)
                      .slice(0, 3);

                    if (recommendedBlogs.length === 0) return null;

                    return (
                      <div className={classes.recommendations}>
                        <h2 className={classes.recommendationsTitle}>More from TechHorizon</h2>
                        <BlogsList blogs={recommendedBlogs} />
                      </div>
                    );
                  }}
                </Await>
              </Suspense>
            </>
          )}
        </Await>
      </Suspense>
    </>
  );
}

export default BlogDetailPage;

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

async function loadBlog(id) {
  const response = await fetch(`${BACKEND_URL}/blogs/${id}`);

  if (!response.ok) {
    throw json({ message: "Could not fetch blog details." }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.blog;
  }
}

async function loadBlogs() {
  const response = await fetch(`${BACKEND_URL}/blogs`);

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
  const response = await fetch(`${BACKEND_URL}/blogs/${blogId}`, {
    method: request.method,
  });
  if (!response.ok) {
    throw json({ message: "Could not delete blog." }, { status: 500 });
  }
  return redirect("/blogs");
}
