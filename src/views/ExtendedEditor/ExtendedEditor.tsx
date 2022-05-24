import { Note } from "../../utils/Storage";
import React from "react";
import Editor from "../../components/Editor";
import { Link } from "react-router-dom";
import Download from "../../utils/Download";
interface ExtendedEditorProps {
  notes: Note[]
  updateNotes: (notes: Note[]) => void;
  currentNote: Note;
}
const ExtendedEditor: React.FC<ExtendedEditorProps> = (props) => {
  const { notes, updateNotes, currentNote } = props;
  const [internalNote, setInternalNote] = React.useState<Note>(currentNote);
  const NewDownload = Download(internalNote.markdown);
  React.useEffect(() => {
    document.title = internalNote.filename;
  },[internalNote])
  React.useEffect(() => {
    setInternalNote(currentNote);
  }, [currentNote])

  const updateCurrentNote = (markdown: string) => {
    setInternalNote({ ...internalNote, markdown: markdown })
  }

  const updateAllNotes = () => {
    if (notes.length > 0 && currentNote) {
      const newNotes = notes.map((note) => {
        if (note.filename === internalNote.filename) {
          return { ...internalNote }
        } else {
          return note
        }
      })
      updateNotes(newNotes);
    }
  }

  React.useEffect(() => {
    updateAllNotes()
  }, [internalNote]);

  React.useEffect(() => {
    setInternalNote(currentNote);
  }, [currentNote])
  return (
      <div className='flex flex-col w-full h-full'>
        {document.title === '3453' && (
            <div className='flex flex-row text-black dark:text-white p-1 bg-white dark:bg-black text-sm items-center'>
              <span className={'text-lg px-2 font-bold'}>{internalNote.title}</span>
              <span className='px-2 text-gray-400 hover:animate-pulse cursor-pointer' onClick={() => alert('Open files')}>Open File</span>
              <Link to='/'><span className='px-2 hover:text-white text-gray-400 hover:animate-pulse cursor-pointer'>Overview</span></Link>
              <span className='px-2 text-gray-400 hover:animate-pulse cursor-pointer'><a download={internalNote.filename} href={NewDownload}>Download</a></span>
              <span className='px-2 text-gray-400 hover:animate-pulse cursor-pointer'>Help</span>
            </div>
        )}
        <div className='flex flex-col h-full w-full dark:text-white text-black'>
          <Editor
            onChange={updateCurrentNote}
            value={internalNote ? internalNote.markdown : ''}
            />
        </div>
      </div>
  )
}

export default ExtendedEditor;