import { privateRoutesEnum } from "@/shared/model";
import { routeElement } from "../model/types";
import { lazy } from "react";
import { Navigate } from "react-router-dom";

const LoginPage = lazy(() => import("@/pages/loginPage/ui/LoginPage"));

export const privateRoutes: routeElement[] = [
  {
    path: privateRoutesEnum.login,
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <Navigate to={privateRoutesEnum.login} replace />,
  },
];
