import React from "react";
import { Button, Drawer, List, ListItem, ListItemText } from "@mui/material"

export default function AppDrawer({ notes, onAddNote }){

    const drawerWidth = 360;

    return(
    <Drawer
    variant="permanent"
    anchor="left"
    sx={{ width: drawerWidth, flexShrink: 0, "& .MuiDrawer-paper": { width: drawerWidth } }}
    >
    <List>
      <ListItem>
        <Button 
        variant="contained"
        onClick={onAddNote}
        >
          Add Note
        </Button>
      </ListItem>
      { notes.map((note) => (
        <ListItem button key={note.id}>
          <ListItemText primary={note.title} />
        </ListItem>
      ))}
    </List>
    </Drawer>
    );
};