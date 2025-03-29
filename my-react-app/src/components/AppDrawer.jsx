import React from "react";
import { Button, Drawer, List, ListItem, ListItemText, ListItemButton } from "@mui/material"
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import LabelIcon from '@mui/icons-material/Label';
import logo from '../logo.png';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';

export default function AppDrawer({ setNote, run, notes, onAddNote, onselectNote, selectedNote, onDeleteNote }){

    const drawerWidth = 360;

    const setTitle = () => {
      const updatedNotes = notes.map((note) => {
        if(note?.settitle){
          const newTitle = run(
            `＃次の文章の１行のタイトルを日本語で考え,それだけを出力. 
            ＃内容に意味がない場合は、一行目の１０文字目までを出力.
            ＃また, １行目に「●タイトル」の表記がある場合はそのタイトルを出力（「」を含まない）
            ${note.text}`
          );
          return{...note, title:newTitle, settitle:false};
        } else {
          return(note);
        }
      })
      setNote(updatedNotes);
    }

    return(
    <Drawer
    variant="permanent"
    anchor="left"
    sx={{ width: drawerWidth, flexShrink: 0, "& .MuiDrawer-paper": { width: drawerWidth } }}
    >
    <List>
      <ListItem>
        <img src={logo} alt="logo" width="50px" height="50px" style={{margin:"5px"}}/>
      </ListItem>
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
        <Button
        color="inherit"
        variant="contained"
        onClick={setTitle}>
          <AutoFixNormalIcon/>
          Set Title
        </Button>
      </ListItem>
      {notes.map((note) => (
        <>
        <ListItemButton
          key={note.id}
          onClick={() => onselectNote(note)}
          sx={{
            backgroundColor: note.id === selectedNote?.id ? "rgb(0,0,0,0.1)" : "transparent",
            paddingLeft: `${note.level * 20}px`
            }}
        >
        {note.level === 0 ? (
          <Button variant="text" key={note.id}>
            <LabelIcon/>
          </Button>
        ) : (
          <Button variant="text" key={note.id}>
            <ArrowRightIcon/>
          </Button>
        )}
        <ListItemText 
        primary={note.title}
        />
        </ListItemButton>
        </>
      ))}
    </List>
    </Drawer>
    );
};