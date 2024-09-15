import { LoginForm } from "@/widgets";
import { FC } from "react";
import styles from "./LoginPage.module.scss";

const LoginPage: FC = () => {
  return (
    <section className={styles.page}>
      <LoginForm />
    </section>
  );
};

export default LoginPage;
