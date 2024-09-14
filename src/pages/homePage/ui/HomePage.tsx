import { DocsModal, DocsTable } from "@/widgets";
import { FC } from "react";

const HomePage: FC = () => {
  return (
    <>
      <DocsTable />
      <DocsModal />
    </>
  );
};

export default HomePage;
