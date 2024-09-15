import { login } from "@/features";
import { publicRoutesEnum } from "@/shared/model";
import { useAppDispatch, useAppSelector } from "@/shared/utils";
import { Box, Button, TextField } from "@mui/material";
import { ChangeEvent, FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "@/shared/ui/form/Form.module.scss";

const LoginForm: FC = () => {
  const dispatch = useAppDispatch();

  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [loginInput, setLoginInput] = useState({
    login: "",
    error: false,
    errorMessage: "",
  });

  const [passwordInput, setPasswordInput] = useState({
    password: "",
    error: false,
    errorMessage: "",
  });

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.value.length) {
      case 0:
        setLoginInput((prev) => ({
          ...prev,
          login: e.target.value,
          errorMessage: "Введите логин",
          error: true,
        }));
        break;
      default:
        setLoginInput((prev) => ({
          ...prev,
          login: e.target.value,
          errorMessage: "",
          error: false,
        }));
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.value.length) {
      case 0:
        setPasswordInput((prev) => ({
          ...prev,
          password: e.target.value,
          errorMessage: "Введите пароль",
          error: true,
        }));
        break;
      default:
        setPasswordInput((prev) => ({
          ...prev,
          password: e.target.value,
          errorMessage: "",
          error: false,
        }));
    }
  };

  const handleLogin = async () => {
    setLoginInput((prev) => ({
      ...prev,
      error: false,
      errorMessage: "",
    }));
    setPasswordInput((prev) => ({
      ...prev,
      error: false,
      errorMessage: "",
    }));

    try {
      await dispatch(
        login({ login: loginInput.login, password: passwordInput.password }),
      );

      //Не перемещать навигацию
      const navigate = useNavigate();
      navigate(publicRoutesEnum.home);
    } catch (e) {
      setLoginInput((prev) => ({ ...prev, errorMessage: "", error: true }));
      setPasswordInput((prev) => ({
        ...prev,
        errorMessage: "Неправильный логин или пароль",
        error: true,
      }));
    }
  };

  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
      noValidate={false}
      autoComplete="off"
      className={styles.form}
    >
      <h1>Войдите в аккаунт</h1>
      <TextField
        error={loginInput.error}
        id="outlined-login-input"
        label="Логин"
        type="text"
        autoComplete="current-username"
        variant="standard"
        helperText={loginInput.errorMessage}
        value={loginInput.login}
        onChange={handleLoginChange}
        className={styles.form__field}
        fullWidth
        margin="normal"
        disabled={isLoading}
      />

      <TextField
        error={passwordInput.error}
        id="outlined-password-input"
        label="Пароль"
        type="password"
        autoComplete="current-password"
        variant="standard"
        helperText={passwordInput.errorMessage}
        value={passwordInput.password}
        onChange={handlePasswordChange}
        className={styles.form__field}
        fullWidth
        margin="normal"
        disabled={isLoading}
      />

      <Button
        variant="contained"
        onClick={handleLogin}
        className={styles.form__button}
        disabled={
          isLoading ||
          passwordInput.password.length < 1 ||
          loginInput.login.length < 1
        }
      >
        Войти
      </Button>
    </Box>
  );
};

export default LoginForm;
