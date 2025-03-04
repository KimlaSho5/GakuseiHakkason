import React, { useState } from "react";
import './App.css';

function App() {

  const [notes,setNotes] = useState([]);
  const handleNoteAdd = () => {
    const newNote = {
      id: Date.now(),
      text: "新規ノート📝",
    };
    console.log(newNote);
    setNotes([...notes, newNote]);
  }

  return (
    <div className="app-container">
      {/* サイドバー */}
      <div className= "sidebar">
        <button id="create" onClick={handleNoteAdd}>
          ノート追加
          </button>
        <ul>
          <li>
            <button className="delete">削除</button>
            <span>新規ノート</span>
          </li>
        </ul>
      </div>
      {/* メインエリア */}
      <div className="main">
        <h2>内容</h2>
        <textarea value="選択されたノートの内容"/>
        <button className="save">保存</button>
      </div>
    </div>
  );
}

export default App;
