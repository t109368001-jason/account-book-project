import React, { useMemo } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { Apps as AppsIcon, Receipt as ReceiptIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const drawerWidth = 240;

const SideBar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const items = useMemo(
    () => [
      { text: t("main.overview"), path: "", icon: AppsIcon },
      { text: t("main.record"), path: "record", icon: ReceiptIcon },
    ],
    [],
  );

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {items.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => handleClick(item.path)}>
                <ListItemIcon>
                  <item.icon />
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SideBar;
