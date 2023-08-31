import React from "react";
import RecordTable from "../features/record/RecordTable";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const RecordPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Typography variant={"h4"}>{t("main.record")}</Typography>
      <RecordTable />
    </>
  );
};

export default RecordPage;
