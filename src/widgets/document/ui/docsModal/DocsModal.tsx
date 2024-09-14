import { CustomModal } from "@/shared/ui";
import { FC } from "react";
import DocsForm from "../docsForm/DocsForm";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/shared/utils";
import { closeModal } from "@/widgets/document/model/slice/docsModalSlice";

const DocsModal: FC = () => {
  const dispatch = useDispatch();
  const { open, formType, currentDocument } = useAppSelector(
    (state) => state.modal,
  );

  const renderForm = () => {
    switch (formType) {
      case "delete":
        return (
          <DocsForm
            onClose={() => dispatch(closeModal())}
            type="delete"
            document={currentDocument}
          />
        );
      case "create":
        return (
          <DocsForm onClose={() => dispatch(closeModal())} type="create" />
        );
      case "change":
        return (
          <DocsForm
            onClose={() => dispatch(closeModal())}
            type="change"
            document={currentDocument}
          />
        );
      default:
        return (
          <DocsForm onClose={() => dispatch(closeModal())} type="create" />
        );
    }
  };

  return <CustomModal open={open}>{renderForm()}</CustomModal>;
};

export default DocsModal;
