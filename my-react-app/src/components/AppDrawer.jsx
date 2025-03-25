import React from "react";
import { Button, Drawer, List, ListItem, ListItemText, ListItemButton } from "@mui/material"

export default function AppDrawer({ notes, onAddNote, onselectNote, selectedNote, onDeleteNote }){

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
        color="inherit"
        variant="contained"
        onClick={onAddNote}
        >
          Add Origin
        </Button>
        <Button
        color="inherit"
        variant="contained"
        onClick={() => onDeleteNote(selectedNote?.id)}
        >
          Delete
        </Button>
      </ListItem>
      {notes.map((note) => (
        <ListItemButton
          key={note.id}
          onClick={() => onselectNote(note)}
          sx={{
            backgroundColor: note.id === selectedNote?.id ? "rgb(0,0,0,0.1)" : "transparent",
            }}
        >
          <ListItemText primary={note.title} />
        </ListItemButton>
      ))}
    </List>
    </Drawer>
    );
};