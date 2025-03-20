import { useEffect, useState } from "react";
import { CssBaseline, Box } from "@mui/material";
import AppHeader from './components/AppHeader';
import AppDrawer from "./components/AppDrawer";
import AppText from "./components/AppText";
import { v4 as uuid } from "uuid";

export default function App() {
  
  const[ Note, setNote ] = useState([]);
  const [ editedNote, setEditedNote ] =useState("");
  const[ Status, setStatus ] = useState("");
  const[ selectedNote, setSelectedNote ] = useState("null");
  
  useEffect(() => {
    if(!editedNote)return;
    setStatus("Now Saving...")
    const timer = setTimeout(() => {
      saveNote(Note);
    }, 1000);
  },[editedNote]);

  const saveNote = (notes) => {
    const updatedNotes = notes.map((note) => {
      if(note.id === selectedNote.id) {
        return {...note, text: editedNote};
      }
      return note;
    });
    setNote(updatedNotes);
    setStatus("Now Saved.");
    setTimeout(() => setStatus(""), 2000); // 2秒後にメッセージを消す
  }
  //ノートの選択
  const handleSelect = (note) => {
    setSelectedNote(note);
    setEditedNote(note.text);
  }
  //ノートの追加
  const handleNoteAdd = () => {
    const newNote = {
      id: uuid(),
      title: "title",
      text: "",
    };
    setNote([...Note, newNote]);
    setEditedNote(newNote.text);
    setSelectedNote(newNote);
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* ヘッダー */}
      <Box>
        <AppHeader status={Status}/>
      </Box>

      {/* サイドバー */}
      <Box>
        <AppDrawer notes={Note} onAddNote={handleNoteAdd} onSelectNote={handleSelect} selectNote={selectedNote}/>
      </Box>

      {/* メインコンテンツ */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: "64px" }}>
        <AppText editedNote={editedNote} setEditedNote={setEditedNote} selectedNote={selectedNote}/>
      </Box>
    </Box>
  );
}
