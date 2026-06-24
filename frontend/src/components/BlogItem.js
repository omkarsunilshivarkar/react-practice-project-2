import classes from './BlogItem.module.css';
import { Link, useSubmit } from 'react-router-dom';

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
    month: 'long',
    year: 'numeric'
  });
}

function BlogItem({ blog }) {
  const submit = useSubmit();
  
  function startDeleteHandler() {
    const proceed = window.confirm('Are you sure you want to delete this blog post?');
    if (proceed) {
      submit(null, { method: 'delete' });
    }
  }

  return (
    <article className={classes.article}>
      <Link to="/blogs" className={classes.backLink}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className={classes.backIcon}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        Back to blogs
      </Link>

      <span className={classes.category}>{blog.category || "General"}</span>
      <h1 className={classes.title}>{blog.title}</h1>
      
      <div className={classes.meta}>
        <div className={classes.authorRow}>
          <div className={classes.avatar}>
            {getInitials(blog.author)}
          </div>
          <div className={classes.authorDetails}>
            <span className={classes.author}>{blog.author}</span>
            <span className={classes.date}>{formatDate(blog.date)}</span>
          </div>
        </div>
        <span className={classes.badge}>{blog.readTime} min read</span>
      </div>

      <div className={classes.imageWrapper}>
        <img src={blog.image} alt={blog.title} />
      </div>
      
      <div className={classes.bodyContent}>
        <p>{blog.description}</p>
      </div>
      
      <menu className={classes.actions}>
        <Link to="edit" className={classes.editBtn}>Edit Post</Link>
        <button onClick={startDeleteHandler} className={classes.deleteBtn}>Delete Post</button>
      </menu>
    </article>
  );
}

export default BlogItem;
