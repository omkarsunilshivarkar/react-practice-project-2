import BlogsNavigation from "../components/BlogsNavigation";
import { Outlet } from "react-router-dom";

function BlogsRootLayout() {
  return (
    <>
      <BlogsNavigation />
      <Outlet />
    </>
  );
}

export default BlogsRootLayout;