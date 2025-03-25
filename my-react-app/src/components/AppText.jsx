import React from "react";
import { useState, useRef, useEffect } from "react";
import { Button, List, Typography } from "@mui/material"
import { v4 as uuid } from "uuid";

export default function AppText({ Note, setNote, editedNote, setEditedNote, title, setTitle, selectedNote, handleAddNote }){

    const handleChange = (e) => {
        setEditedNote(e.target.value);
        if(textRef.current){
            textRef.current.style.height = "auto";
            textRef.current.style.height = textRef.current.scrollHeight + "px";
        }
    };

    const handleTitleChange = (e) => {
      setTitle(e.target.value);
    };

    const textRef = useRef(null);
    const titleRef = useRef(null);

    const handleAddBranch = (comp) => {
      if (!selectedNote) return;
      
      const index = Note.findIndex(note => note.id === selectedNote.id);
      if (index === -1) return;

      const newNote = {
        id: uuid(),
        title: "{comp}No name",
        text: "",
        parent:{selectedNote},
        level:"selectedNote.level + 1"
      };
    
      const updatedNotes = [
        ...Note.slice(0, index + 1),
        newNote,
        ...Note.slice(index + 1)
      ];
      
      setNote(updatedNotes);
    };

    useEffect(() => {
        if (textRef.current) {
            textRef.current.style.height = "auto"; // 初期化
            textRef.current.style.height = textRef.current.scrollHeight + "px";
        }
      }, []);

    return(
      <>
      {selectedNote ? (
        <>
          <Typography variant="h4">
              <label>
                <textarea
                ref={titleRef}
                onChange={handleTitleChange}
                value={title}
                placeholder="title"
                maxLength={32}
                rows={1}
                wrap="off"
                style={{
                  width:"100%",
                  height:"24px",
                  border:"none", 
                  outline:"none", 
                  resize:"none", 
                  marginTop:"10px",
                  fontSize:"24px",
                  overflow:"hidden"
                }}
                />
              </label>
          </Typography>
          <Typography variant="body1">
              <label>
                <textarea
                ref={textRef}
                value={editedNote}
                onChange={handleChange}
                placeholder="new text"
                style={{
                  lineHeight:"1.5em",
                  width:"100%",
                  height:"100%",
                  border:"none", 
                  outline:"none", 
                  resize:"none", 
                  marginTop:"10px",
                  fontSize:"18px",
                  overflow:"hidden"
                }}
                />
              </label>
          </Typography>
          {["⇒","⇔","ex."].map((comp) => (
            <Button
            variant="contained"
            color="inherit"
            onClick={handleAddBranch(comp)}
            >{comp}</Button>        
          ))}
        </>
      ):(
        <div>
          Create Note
        </div>
      )}
      </>
    );
}