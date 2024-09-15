import { FC } from "react";
import classes from "./Layout.module.scss";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
  return (
    <main className={classes.layout}>
      <Outlet />
    </main>
  );
};

export default Layout;
