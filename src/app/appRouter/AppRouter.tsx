import { privateRoutesEnum, publicRoutesEnum } from "@/shared/model";
import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { privateRoutes } from "./consts/privateRoutes";
import { publicRoutes } from "./consts/publicRoutes";
import Layout from "../layout/Layout";
import { useAppSelector } from "@/shared/utils";

const AppRouter: FC = () => {
  const { isAuth } = useAppSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        {isAuth ? (
          <Route path={publicRoutesEnum.home} element={<Layout />}>
            {publicRoutes.map((route) => (
              <Route
                path={route.path}
                element={route.element}
                key={route.path}
              />
            ))}
          </Route>
        ) : (
          <Route path={privateRoutesEnum.login} element={<Layout />}>
            {privateRoutes.map((route) => (
              <Route
                path={route.path}
                element={route.element}
                key={route.path}
              />
            ))}
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
