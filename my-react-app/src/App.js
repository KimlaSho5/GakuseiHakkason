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
  const[ selectedNote, setSelectedNote ] = useState(null);
  const [Title, setTitle] =useState("");
  
  useEffect(() => {
    if(!editedNote || editedNote == selectedNote?.text){
      if(!Title || Title === selectedNote?.title )return;
    }
    setStatus("Now Saving...")
    const timer = setTimeout(() => {
      saveNote(Note);
    }, 1000);
  },[editedNote, Title]);

  const saveNote = (notes) => {
    const updatedNotes = notes.map((note) => {
      if(note.id === selectedNote.id) {
        return {...note, text: editedNote, title: Title};
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
    setTitle(note.title);
  }

  //ノートの追加
  const handleNoteAdd = () => {
    const newNote = {
      id: uuid(),
      title: "No name",
      text: "",
      parent:null,
      level:"0"
    };
    setNote([...Note, newNote]);
    setEditedNote(newNote.text);
    setTitle(newNote.title);
    setSelectedNote(newNote);
  }

  //delete
  const handleDelete = (noteID) => {
    const filteredNote = Note.filter((note) => note.id !== noteID);
    setNote(filteredNote);
    if( filteredNote.length > 0 ){
      handleSelect(filteredNote[ filteredNote.length-1 ] );
    } else {
      setSelectedNote(null);
    }
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* ヘッダー */}
      <Box>
        <AppHeader status={Status} selectedNote={selectedNote}/>
      </Box>

      {/* サイドバー */}
      <Box>
        <AppDrawer notes={Note} onAddNote={handleNoteAdd} onselectNote={handleSelect} selectedNote={selectedNote} onDeleteNote={handleDelete}/>
      </Box>

      {/* メインコンテンツ */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: "64px" }}>
        <AppText setNote={setNote} Note={Note} editedNote={editedNote} setEditedNote={setEditedNote} selectedNote={selectedNote} title={Title} setTitle={setTitle} handleAddNote={handleNoteAdd}/>
      </Box>
    </Box>
  );
}
