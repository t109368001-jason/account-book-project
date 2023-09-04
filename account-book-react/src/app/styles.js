export const commonStyles = {
  mb4ExcludeLast: {
    "& > :not(:last-child)": { mb: 4 },
  },
};

export const paperStyles = {
  absoluteCenter: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "calc(100% - 6rem)", md: 600 },
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
    ...commonStyles.mb4ExcludeLast,
  },
};

export const fabStyles = {
  absoluteBottomRight: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
};
