import { FC, useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { cutText, useAppDispatch, useAppSelector } from "@/shared/utils";
import { getDocs } from "@/features";
import { CustomModal, StyledTableCell, StyledTableRow } from "@/shared/ui";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { openModal } from "../../model/slice/docsModalSlice";
import styles from "./DocsTable.module.scss";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";

const DocsTable: FC = () => {
  const { docs, isLoading, error } = useAppSelector((store) => store.docs);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDocs());
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - docs.length) : 0;

  const handleChangePage = (
    //Не удалять событие
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (error) {
    <h1>Ошибка загрузки документов, перезагрузите страницу</h1>;
  }

  if (isLoading) {
    return (
      <CustomModal open>
        <CircularProgress className={styles.table__loader} />
      </CustomModal>
    );
  }

  return (
    <TableContainer component={Paper} className={styles.table}>
      <Table sx={{ minWidth: 1200 }} aria-label="customized table" stickyHeader>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">
              <Button
                variant="contained"
                size="small"
                color="success"
                onClick={() => dispatch(openModal({ formType: "create" }))}
              >
                Создать
              </Button>
            </StyledTableCell>
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
          {(rowsPerPage > 0
            ? docs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : docs
          ).map((document) => (
            <StyledTableRow key={document.id}>
              <StyledTableCell align="center">
                <IconButton
                  aria-label="delete"
                  size="small"
                  color="primary"
                  onClick={() =>
                    dispatch(
                      openModal({
                        formType: "change",
                        currentDocument: document,
                      }),
                    )
                  }
                >
                  <EditIcon />
                </IconButton>
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {cutText(7, document.documentName)}
              </StyledTableCell>
              <StyledTableCell align="right">
                {cutText(7, document.documentType)}
              </StyledTableCell>
              <StyledTableCell align="right">
                {cutText(7, document.documentStatus)}
              </StyledTableCell>
              <StyledTableCell align="right">
                {cutText(7, document.companySignatureName)}
              </StyledTableCell>
              <StyledTableCell align="right">
                {document.companySigDate.slice(0, 10)}
              </StyledTableCell>
              <StyledTableCell align="right">
                {cutText(7, document.employeeNumber)}
              </StyledTableCell>
              <StyledTableCell align="right">
                {cutText(7, document.employeeSignatureName)}
              </StyledTableCell>
              <StyledTableCell align="right">
                {document.employeeSigDate.slice(0, 10)}
              </StyledTableCell>
              <StyledTableCell align="center">
                <IconButton
                  aria-label="delete"
                  color="error"
                  size="small"
                  onClick={() =>
                    dispatch(
                      openModal({
                        formType: "delete",
                        currentDocument: document,
                      }),
                    )
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
          {emptyRows > 0 && (
            <StyledTableRow style={{ height: 53 * emptyRows }}>
              <StyledTableCell colSpan={10} />
            </StyledTableRow>
          )}
        </TableBody>
        <TableFooter className={styles.table__footer}>
          <StyledTableRow>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, { label: "All", value: -1 }]}
              colSpan={10}
              count={docs.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </StyledTableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default DocsTable;
