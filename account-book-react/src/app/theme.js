import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiDataGrid: {
      defaultProps: {
        autoHeight: true,
        density: "comfortable",
        filterMode: "server",
        paginationMode: "server",
        pageSizeOptions: [10, 20],
        sortingMode: "server",
        filterDebounceMs: 500,
      },
    },
  },
});

export default theme;
