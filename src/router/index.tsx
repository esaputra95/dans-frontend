import { createBrowserRouter } from "react-router-dom";
import MidleWareAuth from "./middleware";
import LoginPage from "../pages/login";
import DetailPage from "../pages/jobs/detail";
import { lazy } from 'react';
const JobsPage = lazy(() => import('../pages/jobs'));

const Router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
      path: "/",
      element: <MidleWareAuth><JobsPage /></MidleWareAuth>,
    },
    {
      path: "/detail/:id",
      element: <DetailPage />,
    },
]);

export default Router