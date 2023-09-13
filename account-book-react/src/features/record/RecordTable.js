import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectRecords,
  setDirection,
  setOrderBy,
  setPage,
  setSize,
} from "./RecordSlice";
import { getRecords } from "./RecordApi";
import { useTranslation } from "react-i18next";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { IconButton, Modal, Paper, Typography } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { paperStyles } from "../../app/styles";

const RecordTable = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { page, size, orderBy, direction, data } = useSelector(selectRecords);
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState({});

  const columns = useMemo(
    () => [
      { field: "id", headerName: t("main.id"), flex: 1, type: "number" },
      {
        field: "purpose",
        headerName: t("main.purpose"),
        flex: 1,
        sortable: false,
      },
      {
        field: "price",
        headerName: t("main.price"),
        flex: 1,
        align: "right",
        headerAlign: "right",
        valueGetter: ({ value }) => {
          return `${value.amount} ${value.currency}`;
        },
      },
      {
        field: "timestamp",
        headerName: t("main.time"),
        flex: 1,
        align: "center",
        headerAlign: "center",
        valueGetter: ({ value }) => {
          return moment(value).format("YYYY/MM/DD hh:mm:ss");
        },
      },
      {
        field: "description",
        headerName: t("main.description"),
        flex: 1,
        sortable: false,
        align: "center",
        headerAlign: "center",
        renderCell: ({ row }) => (
          <IconButton
            onClick={() => {
              setDescription(row.description);
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

  const handlePaginationChange = ({ page, size }) => {
    dispatch(setPage(page));
    dispatch(setSize(size));
  };

  const handleSortChange = ({ orderBy, direction }) => {
    if (orderBy === undefined || direction === undefined) {
      return;
    }
    dispatch(setOrderBy(orderBy));
    dispatch(setDirection(direction));
  };

  useEffect(() => {
    dispatch(getRecords());
  }, [page, size, orderBy, direction]);

  return (
    <>
      <DataGrid
        autoHeight
        columns={columns}
        rows={data.content}
        rowCount={data.totalElements}
        initialState={{
          pagination: {
            paginationModel: {
              page: page,
              pageSize: size,
            },
          },
          sorting: {
            sortModel: [{ field: orderBy, sort: direction }],
          },
        }}
        filterMode={"server"}
        paginationMode={"server"}
        sortingMode={"server"}
        pageSizeOptions={[10, 20]}
        onSortModelChange={(model) => {
          handleSortChange({
            orderBy: model?.[0]?.field,
            direction: model?.[0]?.sort,
          });
        }}
        onPaginationModelChange={(model) => {
          handlePaginationChange({ page: model.page, size: model.pageSize });
        }}
      />
      <Modal open={open} onClose={() => setOpen(false)}>
        <Paper sx={paperStyles.absoluteCenter}>
          <Typography>{description}</Typography>
        </Paper>
      </Modal>
    </>
  );
};

export default RecordTable;
