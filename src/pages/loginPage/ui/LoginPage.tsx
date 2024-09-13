import { LoginForm } from "@/widgets";
import { Modal } from "@mui/material";
import React, { FC } from "react";

const LoginPage: FC = () => {
  return (
    <main>
      <Modal open>
        <LoginForm />
      </Modal>
    </main>
  );
};

export default LoginPage;
