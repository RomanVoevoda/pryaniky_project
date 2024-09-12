import { FC } from "react";
import classes from "./Layout.module.scss";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
  return (
    <div className={classes.layout}>
      <Outlet />
    </div>
  );
};

export default Layout;
