import { publicRoutesEnum } from "@/shared/model";
import { FC, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { privateRoutes } from "./consts/privateRoutes";
import { publicRoutes } from "./consts/publicRoutes";
import Layout from "../layout/Layout";
import { useAppSelector } from "@/shared/utils";

const AppRouter: FC = () => {
  const { isAuth } = useAppSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route path={publicRoutesEnum.home} element={<Layout />}>
            {isAuth
              ? publicRoutes.map((route) => (
                  <Route
                    path={route.path}
                    element={route.element}
                    key={route.path}
                  />
                ))
              : privateRoutes.map((route) => (
                  <Route
                    path={route.path}
                    element={route.element}
                    key={route.path}
                  />
                ))}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
