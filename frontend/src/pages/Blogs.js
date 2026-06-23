import { Suspense, useState } from "react";
import { useLoaderData, json, defer, Await } from "react-router-dom";

import BlogsList from "../components/BlogsList";
import classes from "./Blogs.module.css";

function BlogsPage() {
  const { blogs } = useLoaderData();
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearchChange(event) {
    setSearchQuery(event.target.value);
  }

  return (
    <>
      <div className={classes.hero}>
        <span className={classes.badge}>Our blog</span>
        <h1 className={classes.title}>Resources and insights</h1>
        <p className={classes.subtitle}>
          The latest industry news, interviews, technologies, and resources.
        </p>
        <div className={classes.searchContainer}>
          <svg
            className={classes.searchIcon}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z"
            />
          </svg>
          <input
            className={classes.searchInput}
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <Suspense fallback={<p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Loading blogs...</p>}>
        <Await resolve={blogs}>
          {(loadedBlogs) => {
            const filteredBlogs = loadedBlogs.filter((blog) => {
              const query = searchQuery.toLowerCase().trim();
              if (!query) return true;
              return (
                blog.title.toLowerCase().includes(query) ||
                blog.description.toLowerCase().includes(query) ||
                (blog.category && blog.category.toLowerCase().includes(query)) ||
                blog.author.toLowerCase().includes(query)
              );
            });

            return <BlogsList blogs={filteredBlogs} />;
          }}
        </Await>
      </Suspense>
    </>
  );
}

export default BlogsPage;

async function loadBlogs() {
  const response = await fetch("http://localhost:8080/blogs");

  if (!response.ok) {
    throw json({ message: "Could not fetch blogs." }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.blogs;
  }
}

export function loader() {
  return defer({
    blogs: loadBlogs(),
  });
}
