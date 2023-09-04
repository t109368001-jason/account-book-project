import React, { useState } from "react";
import RecordTable from "../features/record/RecordTable";
import { Fab, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Add as AddIcon } from "@mui/icons-material";
import AddRecordModal from "../features/record/AddRecordModal";
import { fabStyles } from "../app/styles";

const RecordPage = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Typography variant={"h4"}>{t("main.record")}</Typography>
      <RecordTable />
      <Fab
        color={"primary"}
        sx={fabStyles.absoluteBottomRight}
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
      <AddRecordModal open={open} setOpen={setOpen} />
    </>
  );
};

export default RecordPage;
