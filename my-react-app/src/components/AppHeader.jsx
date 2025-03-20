import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function AppHeader(){
  const drawerWidth = 360;

  return (
    <AppBar 
    position="fixed" 
    color ="default"
    sx={{
      zIndex: (theme) => theme.zIndex.drawer - 1,
      width: `calc(100% - ${drawerWidth}px)`,
      ml: `${drawerWidth}px`,
    }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap>
          MemoApp
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
