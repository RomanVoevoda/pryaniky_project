import { createContext } from "react";

interface AuthContextTypes {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextTypes | undefined>(
  undefined,
);
