import { FC, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/shared/utils";
import { getDocs } from "@/features";
import { StyledTableCell, StyledTableRow } from "@/shared/ui";
import DeleteIcon from "@mui/icons-material/Delete";

const DocsTable: FC = () => {
  const { docs, isLoading, error } = useAppSelector((store) => store.docs);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDocs());
  }, []);

  if (error) {
    <h1>Ошибка загрузки документов, перезагрузите страницу</h1>;
  }

  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1200 }} aria-label="customized table" stickyHeader>
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell>Имя документа</StyledTableCell>
            <StyledTableCell align="right">Тип документа</StyledTableCell>
            <StyledTableCell align="right">Статус документа</StyledTableCell>
            <StyledTableCell align="right">Подпись компании</StyledTableCell>
            <StyledTableCell align="right">Дата подписи</StyledTableCell>
            <StyledTableCell align="right">Номер сотрудника</StyledTableCell>
            <StyledTableCell align="right">Подпись сотрудника</StyledTableCell>
            <StyledTableCell align="right">Дата подписи</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {docs.map((document) => (
            <StyledTableRow key={document.id}>
              <StyledTableCell>
                <Button variant="contained" size="small">
                  Изменить
                </Button>
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {document.documentName}
              </StyledTableCell>
              <StyledTableCell align="right">
                {document.documentType}
              </StyledTableCell>
              <StyledTableCell align="right">
                {document.documentStatus}
              </StyledTableCell>
              <StyledTableCell align="right">
                {document.companySignatureName}
              </StyledTableCell>
              <StyledTableCell align="right">
                {document.companySigDate.slice(0, 10)}
              </StyledTableCell>
              <StyledTableCell align="right">
                {document.employeeNumber}
              </StyledTableCell>
              <StyledTableCell align="right">
                {document.employeeSignatureName}
              </StyledTableCell>
              <StyledTableCell align="right">
                {document.employeeSigDate.slice(0, 10)}
              </StyledTableCell>
              <StyledTableCell>
                <IconButton aria-label="delete" color="error" size="small">
                  <DeleteIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DocsTable;
