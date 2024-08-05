import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import AddPost from "./pages/AddPost";
import Root from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/posts", element: <Posts /> },
      { path: "/add-post", element: <AddPost /> },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
