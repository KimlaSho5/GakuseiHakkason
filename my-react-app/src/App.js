import { useState } from "react";
import { CssBaseline, Box } from "@mui/material";
import AppHeader from './components/AppHeader';
import AppDrawer from "./components/AppDrawer";
import AppText from "./components/AppText";
import { v4 as uuid } from "uuid";

export default function App() {
  
  const[ Note, setNote ] = useState([]);
  
  //ノートの追加
  const handleNoteAdd = () => {
    const newNote = {
      id: uuid(),
      title: "title",
      text: "",
    };
    setNote([...Note, newNote]);
    console.log(Note);
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* ヘッダー */}
      <Box>
        <AppHeader/>
      </Box>

      {/* サイドバー */}
      <Box>
        <AppDrawer notes={Note} onAddNote={handleNoteAdd}/>
      </Box>

      {/* メインコンテンツ */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: "64px" }}>
        <AppText/>
      </Box>
    </Box>
  );
}
