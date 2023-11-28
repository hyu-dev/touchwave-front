import { Loadable } from "@components/common/Loadable";
import {
  AdminHomeTemplate,
  NoTeamTemplate,
  SettingTeamTemplate,
  TeamTemplate,
} from "@components/templates/Admin";
import { HomeTemplate } from "@components/templates/Home";
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const AppHome = Loadable(lazy(() => import("@pages/AppHome")));
const AppUser = Loadable(lazy(() => import("@pages/AppUser")));
const AppAdmin = Loadable(lazy(() => import("@pages/AppAdmin")));
const AppLogin = Loadable(lazy(() => import("@pages/AppLogin")));
const AppSingUp = Loadable(lazy(() => import("@pages/AppSingUp")));
const NotFound = Loadable(lazy(() => import("@pages/NotFound")));
const NotAccess = Loadable(lazy(() => import("@pages/NotAccess")));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppHome />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <HomeTemplate />,
      },
      {
        path: "not-access",
        element: <NotAccess />,
        errorElement: <NotFound />,
      },
      {
        path: "user",
        element: <AppUser />,
      },
      {
        path: "admin",
        element: <AppAdmin />,
        children: [
          {
            path: "",
            element: <AdminHomeTemplate />,
          },
          {
            path: "no-team",
            element: <NoTeamTemplate />,
          },
          {
            path: "setting",
            element: <SettingTeamTemplate />,
          },
          {
            path: "team",
            element: <TeamTemplate />,
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <AppLogin />,
    errorElement: <NotFound />,
  },
  {
    path: "signup",
    element: <AppSingUp />,
    errorElement: <NotFound />,
  },
]);

const loader = () => {};
