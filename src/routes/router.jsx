import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import Event, {eventsLoader} from "../pages/event";
import Detail, {eventDetailLoader} from "../pages/detail";
import Root from "../layout/root.jsx";
import { createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/events",
        element: <Event />,
        loader: eventsLoader,
      },
      {
        path: "/events/:id",
        element: <Detail />,
        loader: eventDetailLoader,
      },
    ],
  },
]);
export default router