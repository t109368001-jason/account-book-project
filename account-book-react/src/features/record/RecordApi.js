import PropTypes from "prop-types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";
import moment from "moment";
import { initialState, setData } from "./RecordSlice";
import { debounce } from "@mui/material";

export const addRecord = (props) => {
  const priceAmount = props?.price?.amount || props.priceAmount;
  const priceCurrency = props?.price?.currency || props.priceCurrency;
  let timestamp = props.timestamp;
  if (isNaN(timestamp)) {
    timestamp = Number(moment(timestamp).format("x"));
  }
  return api.post("/records", {
    purpose: props.purpose,
    price: {
      amount: priceAmount,
      currency: priceCurrency,
    },
    timestamp: timestamp,
    description: props.description,
  });
};

addRecord.propTypes = PropTypes.oneOf([
  {
    price: PropTypes.shape({
      amount: PropTypes.oneOf([PropTypes.number, PropTypes.string]).isRequired,
      currency: PropTypes.string.isRequired,
    }),
    timestamp: PropTypes.oneOf([PropTypes.number, PropTypes.string]).isRequired,
  },
  {
    priceAmount: PropTypes.oneOf([PropTypes.number, PropTypes.string])
      .isRequired,
    PriceCurrency: PropTypes.string.isRequired,
    timestamp: PropTypes.oneOf([PropTypes.number, PropTypes.string]).isRequired,
  },
]);

export const getRecords = createAsyncThunk(
  "records/getRecords",
  debounce((_, { getState, dispatch, requestId }) => {
    console.log({ requestId });
    const state = getState();
    api
      .get("/records", {
        params: {
          page: state.records.page,
          size: state.records.size,
          sort: `${state.records.orderBy},${state.records.direction}`,
          search: state.records.search,
        },
      })
      .then((res) => {
        dispatch(setData(res.data));
      })
      .catch(dispatch(setData({ ...initialState.data })));
  }, 200),
);
