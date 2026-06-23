import classes from "./BlogsNavigation.module.css";
import { NavLink } from "react-router-dom";

function BlogsNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/blogs"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              All Blogs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blogs/new"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              New Blog
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default BlogsNavigation;
