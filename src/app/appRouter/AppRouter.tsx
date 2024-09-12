import { privateRoutesEnum, publicRoutesEnum } from "@/shared/model";
import { FC, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { privateRoutes } from "./consts/privateRoutes";
import { publicRoutes } from "./consts/publicRoutes";
import { AuthContext } from "@/features";
import Layout from "../layout/Layout";

const AppRouter: FC = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error("Вы забыли добавить контекст для авторизации в провайдер!");

  const { isAuth } = context;

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
