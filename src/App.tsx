import React from "react";
import { Note, getNotes, updateNotes, getColor, setColor as setStorageColor } from "./utils/Storage";
import { HashRouter, Routes, Route } from "react-router-dom";
import ExtendedEditor from "./views/ExtendedEditor/ExtendedEditor";
import Overview from "./views/Overview";
import useGlobalDOMEvents from "./hooks/useGlobalDOMEvents";
import CommandInput from "./components/CommandInput";
export default function App() {
  const initialNotes = getNotes();
  const defaultColor = getColor();
  if (!defaultColor) {
    setStorageColor('light')
  }
  const [notes, setNotes] = React.useState<Note[]>(initialNotes);
  const [color, setColor] = React.useState<'dark'|'light'>(defaultColor);
  const [command, setCommand] = React.useState(true);
  React.useEffect(() => {
    color === 'dark' ? document.getElementById("root").classList.add('dark')
        :
        document.getElementById("root").classList.remove("dark");
  }, [color])
  const [currentNote, setCurrentNote] = React.useState<Note>(notes && notes[0]);
  const updateInternalNotes = (notes: Note[]) => {
    updateNotes(notes);
    setNotes(notes);
  }

  const updateColor = (color: 'dark'|'light') => {
    setColor(color);
    setStorageColor(color);
  }

  const openNote = (note: Note) => {
    setCurrentNote(note);
  }

  const closeCommand = () => {
    setCommand(false);
  }

  useGlobalDOMEvents({ keydown(e: KeyboardEvent) {
    if (e.key === 'p' && e.ctrlKey || e.metaKey) {
      setCommand(true);
    }
  }})

  useGlobalDOMEvents({ keydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      setCommand(false);
    }
  }})

  return (
        <div className={color === 'dark' ? 'dark app' : 'app'} data-color-mode={color}>
          <span className={'fixed z-10 bottom-0 right-0 p-2 text-black dark:text-white'} onClick={() => updateColor(color === 'dark' ? 'light' : 'dark')}>{color}</span>
          <HashRouter>
            {command && <div className='overlay flex flex-col items-center justify-center'>
              <CommandInput
                openNote={openNote} 
                updateNotes={updateInternalNotes}
                notes={notes}
                close={closeCommand}
              />
            </div>}
            <Routes>
              <Route path={"/"} element={<Overview notes={notes} updateNotes={updateInternalNotes} openNote={openNote} />} />
              <Route path={"/edit"} element={<ExtendedEditor currentNote={currentNote} notes={notes} updateNotes={updateInternalNotes} />} />
            </Routes>
          </HashRouter>
        </div>
    )
}