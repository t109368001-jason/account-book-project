import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  MenuItem,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import moment from "moment/moment";
import { addRecord, getRecords } from "./RecordApi";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { commonStyles, paperStyles } from "../../app/styles";

const initialForm = {
  priceAmount: "",
  priceCurrency: "TWD",
  time: moment(moment.now()),
};

const AddRecordModal = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialForm);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddClick = useCallback(() => {
    addRecord({
      priceAmount: form.priceAmount,
      priceCurrency: form.priceCurrency,
      timestamp: form.time.format("x"),
    }).then(() => {
      setOpen(false);
      dispatch(getRecords());
    });
  }, [form]);

  useEffect(() => {
    if (!open) {
      setForm(initialForm);
    }
  }, [open]);

  return (
    <Modal
      id="add-record-modal"
      open={open}
      onClose={handleClose}
      aria-labelledby="add-record-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper sx={paperStyles.absoluteCenter}>
        <Typography id="add-record-modal-title" variant={"h5"}>
          {t("main.addNewRecord")}
        </Typography>
        <FormControl fullWidth sx={commonStyles.mb4ExcludeLast}>
          <Box display={"flex"} flexDirection={"row"}>
            <TextField
              fullWidth
              value={form.priceAmount}
              label={t("main.amount")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              onChange={(event) => {
                setForm((form) => ({
                  ...form,
                  priceAmount: event.target.value,
                }));
              }}
            />
            <TextField
              select
              value={form.priceCurrency}
              label={t("main.currency")}
              onChange={(event) => {
                setForm((form) => ({
                  ...form,
                  priceCurrency: event.target.value,
                }));
              }}
              sx={{ ml: 2, width: 200 }}
            >
              <MenuItem value={"TWD"}>TWD</MenuItem>
              <MenuItem value={"USD"}>USD</MenuItem>
            </TextField>
          </Box>
          <DateTimePicker
            value={form.time}
            onChange={(value) => {
              setForm((form) => ({
                ...form,
                time: value,
              }));
            }}
          />
          <Button
            // color="inherit"
            onClick={handleAddClick}
            variant="contained"
          >
            {t("main.add")}
          </Button>
        </FormControl>
      </Paper>
    </Modal>
  );
};

AddRecordModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default AddRecordModal;
