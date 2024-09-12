import { FC, ReactNode, useState } from "react";
import { Provider } from "react-redux";
import { createStore } from "../store";
import { AuthContext } from "@/features";

interface ProvidersType {
  children: ReactNode;
}

const Providers: FC<ProvidersType> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
      }}
    >
      <Provider store={createStore()}>{children}</Provider>;
    </AuthContext.Provider>
  );
};

export default Providers;
