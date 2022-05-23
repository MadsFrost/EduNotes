import { getNotes, Note, updateNotes } from "../../utils/Storage";
import React from "react";
import Editor from "../../components/Editor";
import { Link } from "react-router-dom";
const ExtendedEditor = () => {
  const initialNotes = getNotes();
  console.log(initialNotes);
  const [notes, setNotes] = React.useState<Note[]>(initialNotes);
  const [currentNote, setCurrentNote] = React.useState<Note>(notes && notes[0]);

  const updateCurrentNote = (markdown: string) => {
    setCurrentNote({ ...currentNote, markdown: markdown })
  }

  const updateAllNotes = () => {
    if (notes.length > 0 && currentNote) {
      const filteredNotes = notes.filter((note) => {
        return note.filename !== currentNote.filename
      });
      console.log('update all notes', filteredNotes);
      setNotes([...filteredNotes, currentNote])
    }
  }

  React.useEffect(() => {
    const storageNotes = getNotes();
    const restNotes = storageNotes.length > 0 ? storageNotes.filter((note: Note) => {
      return notes.some((f: Note) => {
        return f.filename !== note.filename;
      });
    }) : [];
    console.log([...restNotes, ...notes]);
    updateNotes([...restNotes, ...notes])
  }, [notes]);

  React.useEffect(() => {
    updateAllNotes()
  }, [currentNote]);
  return (
      <>
        <Link to={'/'}>Go to overview</Link>
        <Editor
            onChange={updateCurrentNote}
            value={currentNote ? currentNote.markdown : ''}
            filename={currentNote ? currentNote.filename : ''}
        />
      </>
  )
}

export default ExtendedEditor;