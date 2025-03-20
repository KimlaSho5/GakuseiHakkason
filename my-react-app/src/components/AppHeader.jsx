import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function AppHeader({status}){
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
        <Typography variant="h7" sx={{
          color:"gray",
          textalign: "right"
        }}>
          {status}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
