import React from "react";
import { AppBar, Toolbar, Typography,Button } from "@mui/material";

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
        }}>
          {status}
        </Typography>
        {/* <Button
        color="inherit"
        onClick={() => saveThoughts(Thoughts)}
        variant="contained"
        >
          Save your thought
        </Button> */}
      </Toolbar>
    </AppBar>
  );
};
