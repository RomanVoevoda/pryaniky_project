import { LoginForm } from "@/widgets";
import { FC } from "react";
import styles from "./LoginPage.module.scss";

const LoginPage: FC = () => {
  return (
    <main className={styles.page}>
      <LoginForm />
    </main>
  );
};

export default LoginPage;
