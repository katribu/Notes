import './App.css';
import React from "react"
import Editor from './components/Editor';
import Split from "react-split";
import Sidebar from './components/Sidebar';
import { nanoid } from 'nanoid';

function App() {
  const [notes,setNotes] = React.useState(
    () => JSON.parse(localStorage.getItem("notes"))||[]
    )
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
)

React.useEffect(() =>{
  localStorage.setItem("notes", JSON.stringify(notes))
}, [notes])

  function handleAddNewNote(){
    const createdNote = {
      id: nanoid(),
      body: '# Write your note here'
    }
    setNotes(prevNotes => [...prevNotes, createdNote])
    setCurrentNoteId(createdNote.id)

}

function updateNote(text) {
  setNotes(oldNotes => {
      const newNotesArray = []
      for(let i = 0; i < oldNotes.length; i++){
          const oldNote = oldNotes[i]
          if(oldNote.id === currentNoteId){
              newNotesArray.unshift({ ...oldNote, body: text });
          }
          else{
              newNotesArray.push(oldNote)
          } 
          
      }
      return newNotesArray
  })
}

function findCurrentNote(){
  return notes.find(note => note.id === currentNoteId) || notes[0]
}

function deleteNote(event, noteId) {
  event.stopPropagation()
  setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId))
}

  return (
    <div className="main">
      <header className="header">
        <h2>Kat's Notes</h2>
      </header>

      {notes.length>0 ?
      <div className="splitContainer">
        <Split 
          sizes={[30, 70]} 
          direction="horizontal" 
          className="split"
        >
        <Sidebar
        notes={notes}
        newNote={handleAddNewNote}
        setCurrentNoteId={setCurrentNoteId}
        currentNote={findCurrentNote()}
        deleteNote={deleteNote}
        />

        <Editor
        updateNote={updateNote}
        currentNote={findCurrentNote()}
        />

        </Split>
      </div> 
      :
      <div className="noNotes">
        <h2>You currently have no Notes!</h2>
        <button className="noNotesBtn" onClick={handleAddNewNote}>Create Note</button>
      </div>
      }
    </div>
  );
}

export default App;
