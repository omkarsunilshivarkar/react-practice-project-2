import { Suspense, useState } from "react";
import { useLoaderData, json, defer, Await, useSearchParams } from "react-router-dom";

import BlogsList from "../components/BlogsList";
import classes from "./Blogs.module.css";

function BlogsPage() {
  const { blogs } = useLoaderData();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");

  function handleSearchChange(event) {
    setSearchQuery(event.target.value);
  }

  return (
    <>
      <div className={classes.hero}>
        <div className={classes.heroLeft}>
          <span className={classes.badge}>{categoryFilter ? categoryFilter : "Our blog"}</span>
          <h1 className={classes.title}>Engineering the Future</h1>
          <p className={classes.subtitle}>
            Deep dives into software architecture, artificial intelligence, and developer culture.
          </p>
        </div>
        <div className={classes.heroRight}>
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
              placeholder="Search articles..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>

      <Suspense fallback={<p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Loading blogs...</p>}>
        <Await resolve={blogs}>
          {(loadedBlogs) => {
            const filteredBlogs = loadedBlogs.filter((blog) => {
              if (categoryFilter && blog.category?.toLowerCase() !== categoryFilter.toLowerCase()) {
                return false;
              }
              const query = searchQuery.toLowerCase().trim();
              if (!query) return true;
              return (
                blog.title.toLowerCase().includes(query) ||
                blog.description.toLowerCase().includes(query) ||
                (blog.category && blog.category.toLowerCase().includes(query)) ||
                blog.author.toLowerCase().includes(query)
              );
            });

            if (filteredBlogs.length === 0) {
              return (
                <div className={classes.noBlogs}>
                  <h3 className={classes.noBlogsTitle}>No blogs found</h3>
                  <p className={classes.noBlogsSubtitle}>
                    {categoryFilter 
                      ? `We couldn't find any blog posts under the "${categoryFilter}" category.`
                      : "We couldn't find any blog posts matching your search."}
                  </p>
                </div>
              );
            }

            return <BlogsList blogs={filteredBlogs} />;
          }}
        </Await>
      </Suspense>
    </>
  );
}

export default BlogsPage;

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

async function loadBlogs() {
  const response = await fetch(`${BACKEND_URL}/blogs`);

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
