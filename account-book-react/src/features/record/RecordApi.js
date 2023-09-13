import PropTypes from "prop-types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";
import moment from "moment";

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
  (_, { getState }) => {
    const state = getState();
    let url = `/records?page=${state.records.page}&size=${state.records.size}&sort=${state.records.orderBy}%2C${state.records.direction}`;
    if (state.records.search) {
      url += `&search=${encodeURI(state.records.search)}`;
    }
    return api.get(url);
  },
);
