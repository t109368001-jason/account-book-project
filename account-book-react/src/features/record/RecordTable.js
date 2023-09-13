import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectRecords,
  setDirection,
  setOrderBy,
  setPage,
  setSearch,
  setSize,
} from "./RecordSlice";
import { getRecords } from "./RecordApi";
import { useTranslation } from "react-i18next";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import moment from "moment";
import { IconButton, Modal, Paper, Typography } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { paperStyles } from "../../app/styles";
import {
  buildSearchString,
  getGridNumericOperators,
  getGridStringOperators,
  operators,
} from "../../utils/operators";

const RecordTable = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { page, size, orderBy, direction, data } = useSelector(selectRecords);
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState({});

  const columns = useMemo(
    () => [
      {
        field: "id",
        headerName: t("main.id"),
        flex: 1,
        type: "number",
        filterOperators: getGridNumericOperators({ t }),
      },
      {
        field: "purpose",
        headerName: t("main.purpose"),
        flex: 1,
        sortable: false,
        filterOperators: getGridStringOperators({ t }),
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
        filterOperators: getGridNumericOperators({ t }),
      },
      {
        field: "timestamp",
        headerName: t("main.time"),
        flex: 1,
        align: "center",
        headerAlign: "center",
        type: "dateTime",
        valueGetter: ({ value }) => {
          return moment(value).toDate();
        },
        filterOperators: getGridNumericOperators({ t }),
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
        filterOperators: getGridStringOperators({ t }),
      },
    ],
    [t],
  );

  const handleFilterChange = (model) => {
    console.log({ model });
    if (model.items.length <= 0 && model.quickFilterValues.length <= 0) {
      dispatch(setSearch(undefined));
      return;
    }
    let search = "";
    if (model.items.length > 0) {
      let field = model.items[0].field;
      let operator = model.items[0].operator;
      let value = model.items[0].value;
      if (field === "price") {
        field = "price.amount";
      }
      search += buildSearchString({ field, operator, value });
    }
    if (model.quickFilterValues.length > 0) {
      const value = model.quickFilterValues[0];
      if (search.length > 0) {
        search += " AND ";
      }
      search += "( ";
      search += `id${operators.equal}${value}`;
      search += " OR ";
      search += `purpose${operators.equal}*${value}*`;
      search += " OR ";
      search += `price.amount${operators.equal}${value}`;
      search += " OR ";
      search += `timestamp${operators.equal}${value}`;
      search += " OR ";
      search += `description${operators.equal}*${value}*`;
      search += " )";
    }
    dispatch(setSearch(search));
  };

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
        pageSizeOptions={[10, 20]}
        sortingMode={"server"}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        onFilterModelChange={(model) => {
          handleFilterChange(model);
        }}
        onPaginationModelChange={(model) => {
          handlePaginationChange({ page: model.page, size: model.pageSize });
        }}
        onSortModelChange={(model) => {
          handleSortChange({
            orderBy: model?.[0]?.field,
            direction: model?.[0]?.sort,
          });
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
