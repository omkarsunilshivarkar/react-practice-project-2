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
    month: 'short',
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
    <article className={classes.event}>
      <span className={classes.category}>{blog.category || "General"}</span>
      <h1>{blog.title}</h1>
      
      <div className={classes.meta}>
        <div className={classes.avatar}>
          {getInitials(blog.author)}
        </div>
        <div className={classes.authorDetails}>
          <span className={classes.author}>{blog.author}</span>
          <span className={classes.dateRow}>{formatDate(blog.date)}</span>
        </div>
        <span className={classes.badge}>{blog.readTime} min read</span>
      </div>

      <img src={blog.image} alt={blog.title} />
      
      <p>{blog.description}</p>
      
      <menu className={classes.actions}>
        <Link to="edit">Edit Post</Link>
        <button onClick={startDeleteHandler}>Delete Post</button>
      </menu>
    </article>
  );
}

export default BlogItem;
