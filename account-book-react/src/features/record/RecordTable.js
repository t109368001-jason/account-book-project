import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRecords, setPage, setSize } from "./RecordSlice";
import { getRecords } from "./RecordApi";
import {
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { Search as SearchIcon } from "@mui/icons-material";
import { paperStyles } from "../../app/styles";

const RecordTable = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { page, size, data } = useSelector(selectRecords);
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState({});

  const columns = useMemo(
    () => [
      { title: t("main.id"), getter: (o) => o.id },
      { title: t("main.purpose"), getter: (o) => o.purpose },
      {
        title: t("main.price"),
        getter: (o) => `${o.price.amount} ${o.price.currency}`,
      },
      {
        title: t("main.time"),
        getter: (o) => moment(o.timestamp).format("YYYY/MM/DD hh:mm:ss"),
      },
      {
        title: t("main.description"),
        align: "center",
        getter: (o) => (
          <IconButton
            onClick={() => {
              setDescription(o.description);
              setOpen(true);
            }}
          >
            <SearchIcon />
          </IconButton>
        ),
      },
    ],
    [t],
  );

  useEffect(() => {
    dispatch(getRecords({ page, size }));
  }, [page, size]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {Object.values(columns).map((c, i) => (
              <TableCell align={c?.align} key={i}>
                {c.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(data?.content || []).map((o, i) => (
            <TableRow key={i}>
              {Object.values(columns).map((c, i) => (
                <TableCell align={c?.align} key={i}>
                  {c.getter(o)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={data?.totalElements || 0}
        page={page}
        onPageChange={(_, newPage) => dispatch(setPage(newPage))}
        rowsPerPage={size}
        onRowsPerPageChange={(event) =>
          dispatch(setSize(parseInt(event.target.value, 10)))
        }
      />
      <Modal open={open} onClose={() => setOpen(false)}>
        <Paper sx={paperStyles.absoluteCenter}>
          <Typography>{description}</Typography>
        </Paper>
      </Modal>
    </TableContainer>
  );
};

export default RecordTable;
