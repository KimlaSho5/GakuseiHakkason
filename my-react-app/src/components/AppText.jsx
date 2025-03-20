import React from "react";
import { useState, useRef, useEffect} from "react";
import { Typography } from "@mui/material"

export default function AppText(){
    const [ editedText, setEditedText ] =useState("");

    const handleChange = (e) => {
        setEditedText(e.target.value);
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
      }, []);

    return(
        <>
    <Typography variant="h4">
        Title
    </Typography>
    <Typography variant="body1">
        <label>
          <textarea
          ref={textRef}
          value={editedText}
          onChange={handleChange}
          placeholder="new text"
          style={{
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
      </>
    );
}