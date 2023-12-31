import React from "react";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const OverviewPage = () => {
  const { t } = useTranslation();
  return <Typography variant={"h4"}>{t("main.overview")}</Typography>;
};

export default OverviewPage;
