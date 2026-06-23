import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import EditBlogPage from './pages/EditBlog';
import ErrorPage from './pages/Error';
import BlogDetailPage, {
  loader as blogDetailLoader,
  action as deleteBlogAction,
} from './pages/BlogDetail';
import BlogsPage, { loader as blogsLoader } from './pages/Blogs';
import BlogsRootLayout from './pages/BlogsRoot';
import HomePage from './pages/Home';
import NewBlogPage from './pages/NewBlog';
import RootLayout from './pages/Root';
import { action as manipulateBlogAction } from './components/BlogForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'blogs',
        element: <BlogsRootLayout />,
        children: [
          {
            index: true,
            element: <BlogsPage />,
            loader: blogsLoader,
          },
          {
            path: ':blogId',
            id: 'blog-detail',
            loader: blogDetailLoader,
            children: [
              {
                index: true,
                element: <BlogDetailPage />,
                action: deleteBlogAction,
              },
              {
                path: 'edit',
                element: <EditBlogPage />,
                action: manipulateBlogAction,
              },
            ],
          },
          {
            path: 'new',
            element: <NewBlogPage />,
            action: manipulateBlogAction,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;