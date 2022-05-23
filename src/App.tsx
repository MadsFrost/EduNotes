import React from "react";
import { Note, getNotes, updateNotes } from "./utils/Storage";
import { HashRouter, Routes, Route } from "react-router-dom";
import ExtendedEditor from "./views/ExtendedEditor/ExtendedEditor";
import Overview from "./views/Overview";
export default function App() {
  const initialNotes = getNotes();
  const [notes, setNotes] = React.useState<Note[]>(initialNotes);
  const updateInternalNotes = (notes: Note[]) => {
    setNotes(notes);
    updateNotes(notes);
  }
  return (
        <div className='app'>
          <HashRouter>
            <Routes>
              <Route path={"/"} element={<Overview notes={notes} onChange={updateInternalNotes} />} />
              <Route path={"/edit"} element={<ExtendedEditor />} />
            </Routes>
          </HashRouter>
        </div>
    )
}