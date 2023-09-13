import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  reset,
  selectRecords,
  setPagination,
  setSearch,
  setSort,
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
  const { page, size, orderBy, direction, search, data } =
    useSelector(selectRecords);
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
        quickFilter: (value) => `id${operators.equal}${value}`,
      },
      {
        field: "purpose",
        headerName: t("main.purpose"),
        flex: 1,
        sortable: false,
        filterOperators: getGridStringOperators({ t }),
        quickFilter: (value) => `purpose${operators.equal}*${value}*`,
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
        quickFilter: (value) => `price.amount${operators.equal}${value}`,
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
        quickFilter: (value) => `timestamp${operators.equal}${value}`,
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
        quickFilter: (value) => `description${operators.equal}*${value}*`,
      },
    ],
    [t],
  );

  const mapFieldName = (field) => {
    if (field === "price") {
      return "price.amount";
    }
    return field;
  };

  const handleFilterChange = (model) => {
    if (model.items.length <= 0 && model.quickFilterValues.length <= 0) {
      dispatch(setSearch(undefined));
      return;
    }
    let search = "";
    if (model.items.length > 0) {
      let field = model.items[0].field;
      let operator = model.items[0].operator;
      let value = model.items[0].value;
      search += buildSearchString({
        field: mapFieldName(field),
        operator,
        value,
      });
    }
    if (model.quickFilterValues.length > 0) {
      const value = model.quickFilterValues[0];
      if (search.length > 0) {
        search += " AND ";
      }

      search += `( ${columns.map((o) => o.quickFilter(value)).join(" OR ")} )`;
    }
    dispatch(setSearch(search));
  };

  const handlePaginationChange = ({ page, size }) => {
    dispatch(setPagination({ page, size }));
  };

  const handleSortChange = ({ orderBy, direction }) => {
    if (orderBy === undefined || direction === undefined) {
      return;
    }
    dispatch(setSort({ orderBy: mapFieldName(orderBy), direction }));
  };

  useEffect(() => {
    dispatch(getRecords());
  }, [page, size, orderBy, direction, search]);

  useEffect(() => {
    return () => dispatch(reset());
  }, []);

  return (
    <>
      <DataGrid
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
