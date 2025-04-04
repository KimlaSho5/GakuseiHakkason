import React from "react";
import { useRef, useEffect } from "react";
import { Button, Typography } from "@mui/material"

export default function AppText({ handleAddBranch, editedNote, setEditedNote, selectedNote }){

    const handleChange = (e) => {
        setEditedNote(e.target.value);
        if(textRef.current){
            textRef.current.style.height = "auto";
            textRef.current.style.height = textRef.current.scrollHeight + "px";
        }
    };

    const textRef = useRef(null);

    useEffect(() => {
        if (textRef.current) {
            textRef.current.style.height = "auto"; // 初期化
            textRef.current.style.height = textRef.current.scrollHeight + "px";
        }
      }, [selectedNote]);

    return(
      <>
      {selectedNote ? (
        <>
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
          <Button
          variant="contained"
          color="info"
          onClick={() => handleAddBranch()}
          >Branch</Button>
        </>
      ):(
        <div>
          Create Note
        </div>
      )}
      </>
    );
}