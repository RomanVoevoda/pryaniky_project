import { lazy } from "react";
import { routeElement } from "../model/types";
import { publicRoutesEnum } from "@/shared/model";
import { Navigate } from "react-router-dom";

const HomePage = lazy(() => import("@/pages/homePage/ui/HomePage"));

export const publicRoutes: routeElement[] = [
  {
    path: publicRoutesEnum.home,
    element: <HomePage />,
  },
  {
    path: "*",
    element: <Navigate to={publicRoutesEnum.home} replace />,
  },
];
