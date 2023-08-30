import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRecords, setPage, setSize } from "./RecordSlice";
import { getRecords } from "./RecordApi";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import moment from "moment";

const columns = [
  { title: "Id", getter: (o) => o.id },
  { title: "Amount", getter: (o) => o.price.amount },
  { title: "Currency", getter: (o) => o.price.currency },
  {
    title: "Time",
    getter: (o) => moment(o.timestamp).format("YYYY/MM/DD hh:mm:ss"),
  },
];
const RecordTable = () => {
  // const { t } = useTranslation();
  const dispatch = useDispatch();
  const { page, size, data, loading } = useSelector(selectRecords);

  useEffect(() => {
    dispatch(getRecords({ page, size }));
  }, [page, size]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {Object.values(columns).map((c, i) => (
                <TableCell key={i}>{c.title}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(data?.content || []).map((o, i) => (
              <TableRow key={i}>
                {Object.values(columns).map((c, i) => (
                  <TableCell key={i}>{c.getter(o)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
    </>
  );
};

export default RecordTable;