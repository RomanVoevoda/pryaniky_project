import { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { createStore } from "../store";

interface ProvidersType {
  children: ReactNode;
}

const Providers: FC<ProvidersType> = ({ children }) => {
  return <Provider store={createStore()}>{children}</Provider>;
};

export default Providers;
