import React from "react"
import {BsFillPlusSquareFill, BsTrashFill} from "react-icons/bs";

export default function Sidebar(props){
    
    const noteElements = props.notes.map(note => {
        return (
            <div key={note.id}>
                <div
                 onClick={() => props.setCurrentNoteId(note.id)}
                 className={`noteElementTitle ${note.id === props.currentNote.id? "selected-note":""}`} 
                >
                    <h6>{note.body.split("\n")[0]}</h6>
                    {note.id===props.currentNote.id &&
                    
                    <BsTrashFill 
                    className="trashIcon"
                    onClick={(event)=>props.deleteNote(event,note.id)}
                    /> 
                    
                    }
                </div>
            </div>
        )
    })

    return(
        <div className="sidebarContainer">
            <div className="sidebarTitleDiv">
                <h3>Notes</h3>
                <BsFillPlusSquareFill 
                className="plusIcon"
                onClick={props.newNote}
                />
            </div>
            {noteElements}
        </div>
    )
}