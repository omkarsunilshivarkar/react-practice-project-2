import classes from './BlogsList.module.css';
import { Link } from 'react-router-dom';

function getInitials(name) {
  if (!name) return "";
  const parts = name.split(" ");
  return parts.map(p => p[0]).join("").toUpperCase().substring(0, 2);
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

function truncateDescription(text, maxLength = 120) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  const cleanText = lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated;
  return cleanText + "...";
}

function BlogsList({ blogs }) {
  return (
    <div className={classes.events}>
      <ul className={classes.list}>
        {blogs.map((blog) => {
          const isLongDescription = blog.description && blog.description.length > 120;
          const displayedDescription = isLongDescription 
            ? truncateDescription(blog.description, 120) 
            : blog.description;

          return (
            <li key={blog.id} className={classes.item}>
              <Link to={`/blogs/${blog.id}`}>
                <img src={blog.image} alt={blog.title} />
                <div className={classes.content}>
                  <span className={classes.category}>{blog.category || "General"}</span>
                  <div className={classes.titleContainer}>
                    <h2>{blog.title}</h2>
                    <svg
                      className={classes.arrowIcon}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                      />
                    </svg>
                  </div>
                  <p>
                    {displayedDescription}
                    {isLongDescription && <span className={classes.readMore}> Read more</span>}
                  </p>
                  <div className={classes.meta}>
                    <div className={classes.avatar}>
                      {getInitials(blog.author)}
                    </div>
                    <div className={classes.authorDetails}>
                      <span className={classes.author}>{blog.author}</span>
                      <span className={classes.date}>{formatDate(blog.date)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BlogsList;
