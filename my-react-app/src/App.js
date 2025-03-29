import { useEffect, useState } from "react";
import { CssBaseline, Box } from "@mui/material";
import AppHeader from './components/AppHeader';
import AppDrawer from "./components/AppDrawer";
import AppText from "./components/AppText";
import { v4 as uuid } from "uuid";
const { GoogleGenerativeAI } = require("@google/generative-ai");

export default function App() {
  
  // const[ Thoughts, setThoughts ] = useState([]);
  // const[ selectedThought, setSelectedThought] = useState(null);
  const[ Note, setNote ] = useState([]);
  const [ editedNote, setEditedNote ] =useState("");
  const[ Status, setStatus ] = useState("");
  const[ selectedNote, setSelectedNote ] = useState(null);
  const [Title, setTitle] =useState("");

  // const handleSelectThought = (thought) => {
  //   setSelectedThought(thought);
  //   setNote(thought.notes);
  // };

  // const handleAddThought = () => {
  //   const newThought = {
  //     id:uuid(),
  //     notes:[]
  //   };
  //   setThoughts([...Thoughts, newThought]);
  //   setSelectedThought(newThought);
  // };

  // const saveThoughts = (thoughts) => {
  //   handleAddThought();
  //   const updatedThoughts = thoughts.map((thought) => {
  //     if(thought.id === selectedThought?.id){
  //       return{...thought, notes:Note};
  //     }
  //     return thought;
  //   });
  //   setThoughts(updatedThoughts);
  //   setStatus("Now Saved.");
  //   console.log(updatedThoughts);
  //   setTimeout(() => setStatus(""), 2000); // 2秒後にメッセージを消す
  // };

  const saveNote = (notes) => {
    const updatedNotes = notes.map((note) => {
      if(note.id === selectedNote?.id) {
        return {...note, text: editedNote, settitle: true};
      }
      return note;
    });
    setNote(updatedNotes);
    setStatus("Now Saved.");
    console.log(`saved: ${selectedNote?.id}`);
    setTimeout(() => setStatus(""), 2000); // 2秒後にメッセージを消す
  };

  useEffect(() => {
    if(!editedNote || editedNote === selectedNote?.text){
      if(!Title || Title === selectedNote?.title )return;
    }

    setStatus("Now Saving...")
    console.log(`saving: ${selectedNote?.id}`);

    const timer = setTimeout(() => {
      saveNote(Note);
    }, 1000);

    return () => clearTimeout(timer); 

  },[editedNote, Title]);

  // Access your API key as an environment variable (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

  async function run(prom) {
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    const prompt = `${prom}`

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    return(text);
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
      settitle: true,
      title: "No name",
      text: "",
      level:0
    };
    setNote([...Note, newNote]);
    setEditedNote(newNote.text);
    setTitle(newNote.title);
    setSelectedNote(newNote);
  }

  const handleAddBranch = () => {
    if (!selectedNote) return;
    
    const index = Note.findIndex(note => note.id === selectedNote.id);
    if (index === -1) return;

    const newNote = {
      id: uuid(),
      settitle:true,
      title: "no title",
      text: "",
      level:selectedNote?.level + 1
    };
  
    const updatedNotes = [
      ...Note.slice(0, index + 1),
      newNote,
      ...Note.slice(index + 1)
    ];

    setNote(updatedNotes);
    setSelectedNote(newNote);
    setEditedNote(newNote.text);
    setTitle(newNote.title);
    console.log(updatedNotes);
  };

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
        <AppHeader 
        status={Status} 
        // handleSelectThought={handleSelectThought}
        // handleAddThought={handleAddThought}
        // saveThoughts={saveThoughts}
        // Thoughts={Thoughts}
        run={run}/>
      </Box>

      {/* サイドバー */}
      <Box>
        <AppDrawer
        setNote={setNote}
        run={run}
        notes={Note} 
        onAddNote={handleNoteAdd} 
        onselectNote={handleSelect} 
        selectedNote={selectedNote} 
        onDeleteNote={handleDelete}
        />
      </Box>

      {/* メインコンテンツ */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: "64px" }}>
        <AppText 
        handleAddBranch={handleAddBranch} 
        setNote={setNote} Note={Note} 
        editedNote={editedNote} 
        setEditedNote={setEditedNote} 
        selectedNote={selectedNote} 
        title={Title} 
        setTitle={setTitle} 
        handleAddNote={handleNoteAdd}/>
      </Box>
    </Box>
  );
}
