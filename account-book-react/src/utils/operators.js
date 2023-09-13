import { GridFilterInputValue } from "@mui/x-data-grid";

const EQUAL = "=";
const NOT_EQUAL = "!";
const GREATER_THEN = ">";
const LESS_THEN = "<";
const CONTAINS = "contains";
const STARTS_WITH = "startsWith";
const ENDS_WITH = "endsWith";

export const operators = {
  equal: EQUAL,
  notEqual: NOT_EQUAL,
  greaterThen: GREATER_THEN,
  lessThen: LESS_THEN,
  contains: CONTAINS,
  startsWith: STARTS_WITH,
  endsWith: ENDS_WITH,
};

export const getGridNumericOperators = ({ t }) => {
  return [
    {
      label: t !== undefined ? t("main.equal") : "Equal",
      value: EQUAL,
      InputComponent: GridFilterInputValue,
    },
    {
      label: t !== undefined ? t("main.notEqual") : "Not Equal",
      value: NOT_EQUAL,
      InputComponent: GridFilterInputValue,
    },
    {
      label: t !== undefined ? t("main.greaterThen") : "Greater Then",
      value: GREATER_THEN,
      InputComponent: GridFilterInputValue,
    },
    {
      label: t !== undefined ? t("main.lessThen") : "Less Then",
      value: LESS_THEN,
      InputComponent: GridFilterInputValue,
    },
  ];
};

export const getGridStringOperators = ({ t }) => {
  return [
    {
      label: t !== undefined ? t("main.equal") : "Equal",
      value: EQUAL,
      InputComponent: GridFilterInputValue,
    },
    {
      label: t !== undefined ? t("main.notEqual") : "Not Equal",
      value: NOT_EQUAL,
      InputComponent: GridFilterInputValue,
    },
    {
      label: t !== undefined ? t("main.contains") : "Contains",
      value: CONTAINS,
      InputComponent: GridFilterInputValue,
    },
    {
      label: t !== undefined ? t("main.startsWith") : "Starts With",
      value: STARTS_WITH,
      InputComponent: GridFilterInputValue,
    },
    {
      label: t !== undefined ? t("main.endsWith") : "Ends With",
      value: ENDS_WITH,
      InputComponent: GridFilterInputValue,
    },
  ];
};

export const buildSearchString = ({ field, operator, value }) => {
  if (operator === CONTAINS) {
    return `${field}=*${value}*`;
  } else if (operator === STARTS_WITH) {
    return `${field}=${value}*`;
  } else if (operator === ENDS_WITH) {
    return `${field}=*${value}`;
  }
  return `${field}${operator}${value}`;
};
