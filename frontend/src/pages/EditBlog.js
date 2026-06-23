import { useRouteLoaderData } from 'react-router-dom';
import BlogForm from '../components/BlogForm';

function EditBlogPage() {
  const data = useRouteLoaderData('blog-detail');
  return (
    <>
      <BlogForm blog={data.blog} method="patch" />
    </>
  );
}

export default EditBlogPage;