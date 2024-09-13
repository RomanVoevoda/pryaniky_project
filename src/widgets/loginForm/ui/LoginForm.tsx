import { login } from "@/features";
import { publicRoutesEnum } from "@/shared/model";
import { useAppDispatch } from "@/shared/utils";
import { Button, Input, InputLabel } from "@mui/material";
import { ChangeEvent, FC, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm: FC = () => {
  const [userLogin, setUserLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserLogin(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      await dispatch(login({ login: userLogin, password }));
      const navigate = useNavigate();
      navigate(publicRoutesEnum.home);
    } catch(e) {
      if(e instanceof Error)
        throw new Error(e.message);
    }
  };

  return (
    <form>
      <InputLabel>Логин</InputLabel>
      <Input
        required
        type="text"
        autoComplete="username"
        value={userLogin}
        onChange={handleLoginChange}
        placeholder="Логин"
      />

      <InputLabel>Пароль</InputLabel>
      <Input
        required
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Пароль"
      />

      <Button variant="contained" onClick={handleLogin}>
        Войти
      </Button>
    </form>
  );
};

export default LoginForm;
