import { changeDoc, deleteDoc } from "@/features";
import { createDoc } from "@/features/document";
import { DocsData } from "@/shared/api";
import { useAppDispatch } from "@/shared/utils";
import { Box, Button, TextField } from "@mui/material";
import { ChangeEvent, forwardRef, useState } from "react";
import { initialDocumentState } from "../../consts/initialDocumentState";

interface DocsFormProps {
  document?: DocsData;
  type: "create" | "change" | "delete";
  onClose: () => void;
}

const DocsForm = forwardRef<HTMLFormElement, DocsFormProps>(({ document, type, onClose }, ref) => {
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
      >
        <h1>Вы уверены, что хотите удалить документ?</h1>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            dispatch(deleteDoc(documentState.id));
            onClose();
          }}
        >
          Удалить
        </Button>
        <Button variant="contained" color="primary" onClick={onClose}>
          Отмена
        </Button>
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
      />

      <Button variant="contained" color="success" onClick={handleFormSubmit} disabled={documentState.documentName.length < 1 || documentState.documentType.length < 1 || documentState.documentStatus.length < 1}>
        {type === "create" ? "Создать" : "Измененить"}
      </Button>
      <Button variant="contained" color="primary" onClick={onClose}>
        Отмена
      </Button>
    </Box>
  );
});

export default DocsForm;
