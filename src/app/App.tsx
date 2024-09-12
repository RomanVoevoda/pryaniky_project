import { FC } from "react";
import Providers from "./providers/Providers";
import { AppRouter } from "./appRouter";

const App: FC = () => {
  return (
    <Providers>
      <AppRouter />
    </Providers>
  );
};

export default App;
