import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <h2>404 page not found</h2>,
        children: [
            {
                path: "/",
                element: <Home />
            }
        ]
    }
])