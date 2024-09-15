import { changeDoc, deleteDoc } from "@/features";
import { createDoc } from "@/features/document";
import { DocsData } from "@/shared/api";
import { useAppDispatch } from "@/shared/utils";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ChangeEvent, forwardRef, useState } from "react";
import { initialDocumentState } from "../../consts/initialDocumentState";
import styles from "@/shared/ui/form/Form.module.scss";

interface DocsFormProps {
  document?: DocsData;
  type: "create" | "change" | "delete";
  onClose: () => void;
}

const DocsForm = forwardRef<HTMLFormElement, DocsFormProps>(
  ({ document, type, onClose }, ref) => {
    const dispatch = useAppDispatch();
    const [documentState, setDocumentState] = useState(
      document || initialDocumentState,
    );

    if (type === "delete") {
      return (
        <Box
          ref={ref}
          tabIndex={0}
          component="form"
          sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
          noValidate={true}
          autoComplete="off"
          className={styles.form_static}
        >
          <h1>Вы уверены, что хотите удалить документ?</h1>
          <div className={styles.form__buttons_container}>
          <Button
            variant="contained"
            color="error"
            className={styles.form__button}
            onClick={() => {
              dispatch(deleteDoc(documentState.id));
              onClose();
            }}
          >
            Удалить
          </Button>
          <Button variant="contained" color="primary" onClick={onClose} className={styles.form__button}>
            Отмена
          </Button>
          </div>
        </Box>
      );
    }

    const handleChange =
      (field: string) => (e: ChangeEvent<HTMLInputElement>) => {
        setDocumentState((prev) => ({ ...prev, [field]: e.target.value }));
      };

    const handleFormSubmit = () => {
      const updatedDocumentState = {
        ...documentState,
        companySigDate:
          documentState.companySigDate.length < 1
            ? new Date().toISOString()
            : documentState.companySigDate,
        employeeSigDate:
          documentState.employeeSigDate.length < 1
            ? new Date().toISOString()
            : documentState.employeeSigDate,
      };

      switch (type) {
        case "create":
          dispatch(createDoc(updatedDocumentState));
          break;
        case "change":
          dispatch(changeDoc(updatedDocumentState));
          break;
      }

      onClose();
    };

    return (
      <Box
        component="form"
        sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
        noValidate={true}
        autoComplete="off"
        ref={ref}
        tabIndex={0}
        className={styles.form}
      >
        <h1>
          {type === "create" ? "Создание документа" : "Изменение документа"}
        </h1>
        <TextField
          id="outlined-name-input"
          label="Имя документа"
          type="text"
          variant="standard"
          value={documentState.documentName}
          onChange={handleChange("documentName")}
          fullWidth
          margin="normal"
          required
          className={styles.form__field}
        />

        <TextField
          id="outlined-type-input"
          label="Тип документа"
          type="text"
          variant="standard"
          value={documentState.documentType}
          onChange={handleChange("documentType")}
          fullWidth
          margin="normal"
          required
          className={styles.form__field}
        />

        <TextField
          id="outlined-status-input"
          label="Статус документа"
          type="text"
          variant="standard"
          value={documentState.documentStatus}
          onChange={handleChange("documentStatus")}
          fullWidth
          margin="normal"
          required
          className={styles.form__field}
        />

        <TextField
          id="outlined-number-input"
          label="Номер сотрудника"
          type="text"
          variant="standard"
          value={documentState.employeeNumber}
          onChange={handleChange("employeeNumber")}
          fullWidth
          margin="normal"
          className={styles.form__field}
        />

        <div className={styles.form__buttons_container}>
          <Button
            variant="contained"
            color="success"
            onClick={handleFormSubmit}
            disabled={
              documentState.documentName.length < 1 ||
              documentState.documentType.length < 1 ||
              documentState.documentStatus.length < 1
            }
            className={styles.form__button}
          >
            {type === "create" ? "Создать" : "Изменить"}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={onClose}
            className={styles.form__button}
          >
            Отмена
          </Button>
        </div>
      </Box>
    );
  },
);

export default DocsForm;
