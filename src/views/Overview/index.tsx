import React from "react";
import document from "../../assets/icons/document.png";
import { Note } from "../../utils/Storage";
import { CalculateDate } from "../../utils/CalculateDate";
import { useNavigate } from "react-router-dom";
type Template = 'math' | 'section wtih variants';
interface OverviewProps {
  notes: Note[];
  updateNotes: (notes: Note[]) => void;
  openNote: (note: Note) => void;
}

const Overview: React.FC<OverviewProps> = (props) => {
  const { notes, updateNotes, openNote } = props;
  const Templates: {[key: string]: string} = {
    'math': '# Math Editor Template',
    'table': '# Table\n| a | b | c |\n|---|---|---|\n|1|2|3|\n|1|2|3|\n|1|2|3|\n|1|2|3|\n|1|2|3|\n|1|2'
  }
  const navigate = useNavigate()
  const [showAddNote, setAddNote] = React.useState(false);
  const [showAddTemplate, setAddTemplate] = React.useState(false);
  const [templateType, setTemplateType] = React.useState<Template>()
  const [newNote, setNewNote] = React.useState<Note>({
    title: `untitled_${notes.length + 1}`,
    markdown: '',
    filename: '',
    category: 'none',
    lastEdit: new Date(Date.now()).getTime()
  }) 

  const toggleAddNote = () => {
    setAddNote(!showAddNote);
  }

  const toggleAddTemplate = (template?: Template) => {
    if (template) {
      setTemplateType(template);
    }
    setAddTemplate(!showAddTemplate);
  }

  const enterAddNote = (key: string) => {
    if (key === 'Enter') {
      addNote(newNote);
    }
  }

  const navigateEditor = (note: Note) => {
    openNote(note);
    navigate('/edit');
  }

  const addNote = (newNote: Note) => {
    if (showAddNote) {
      toggleAddNote()
    }

    if (showAddTemplate) {
      toggleAddTemplate()
    }
    const checkSameFileExists = notes.filter(note => note.filename === `${newNote.title}.md`)
    if (checkSameFileExists.length >= 1) {
      const noteToAdd = templateType ? {...newNote, markdown: Templates[templateType], title:`${newNote.title.replace(' ', '-')}_${notes.length + 1}`,  filename: `${newNote.title.replace(' ', '-')}_${notes.length + 1}.md`, category: 'test'}
      : {...newNote, title:`${newNote.title.replace(' ', '-')}_${notes.length + 1}`,  filename: `${newNote.title.replace(' ', '-')}_${notes.length + 1}.md`, category: 'test'};
      updateNotes([...notes, noteToAdd]);
      navigateEditor(noteToAdd);
    } else {
      const noteToAdd = templateType ? {...newNote, markdown: Templates[templateType], filename: `${newNote.title.replace(' ', '-')}.md`, category: 'test'}
      : {...newNote, filename: `${newNote.title.replace(' ', '-')}.md`, category: 'test'};
      updateNotes([...notes, noteToAdd]);
      navigateEditor(noteToAdd);
    }
    setTemplateType(undefined);
  }

  const deleteNote = (filename: string) => {
    updateNotes(notes.filter((note: Note) => {
      return note.filename !== filename
    }));
  }
  return (
      <div className={'w-full h-full text-black dark:text-white flex flex-col items-center'}>
        <div className={'w-full flex flex-row justify-start items-center px-12 py-8'}>
          <img draggable={false} src={document} className={'w-full max-w-[50px]'}  alt={'document'}/>
          <h1 className={'pl-4 text-xl font-bold'}>Markdown</h1><h1 className={'italic text-xl'}>Notes</h1>
        </div>

        <div className={'w-full flex flex-row items-start justify-start px-12'}>
          <div className={'flex flex-col p-2'}>
            <h1 className={'text-lg font-bold'}>Add Notes</h1>
            <div className={'w-full flex flex-col items-start'}>
              {!showAddNote && (
                  <>
                  <button
                    className={'align-center transition fade-in-out transition-all hover:font-bold'}
                    onClick={toggleAddNote}>
                    Add 📃
                  </button>
                  </>
                )}
              {showAddNote && (
                  <div className='rounded-lg mt-4'>
                    <div className='flex flex-row'>
                      <input
                          autoFocus
                          className='rounded-md text-black dark:text-white text-lg px-2 bg-transparent border-none focus:border-none focus:outline-none'
                          placeholder={'e.g: Todo List'}
                          onChange={(e) =>
                              setNewNote({...newNote, title: e.currentTarget.value })}
                          onKeyPress={(event) =>  enterAddNote(event.key)}
                          required
                      />
                      <span className='px-2 cursor-pointer' onClick={() => addNote(newNote)}>✅</span>
                      <span className='px-2 cursor-pointer' onClick={toggleAddNote}>❌</span>
                    </div>
                  </div>
              )}
            </div>
            <h1 className={'text-lg font-bold pt-4'}>Add Templates</h1>
            <div className={'w-full flex flex-col items-start'}>
              {!showAddTemplate && (
                  <>
                    <button
                        className={'align-center transition fade-in-out transition-all hover:font-bold'}
                        onClick={() => toggleAddTemplate('math')}>
                      Math Example
                    </button>
                  </>
              )}
              {showAddTemplate && (
                  <div className='rounded-lg mt-4'>
                    <div className='flex flex-row'>
                      <input
                          autoFocus
                          className='rounded-md text-black dark:text-white text-lg px-2 bg-transparent border-none focus:border-none focus:outline-none'
                          placeholder={'e.g: Todo List'}
                          onChange={(e) =>
                              setNewNote({...newNote, title: e.currentTarget.value })}
                          onKeyPress={(event) =>  enterAddNote(event.key)}
                          required
                      />
                      <span className='px-2 cursor-pointer' onClick={() => addNote(newNote)}>✅</span>
                      <span className='px-2 cursor-pointer' onClick={() => toggleAddTemplate}>❌</span>
                    </div>
                  </div>
              )}
            </div>
          </div>
        </div>

        <div className={'flex-row flex w-full p-12'}>
          <div className={'flex-col flex w-full'}>
            <h1 className={'text-lg font-bold'}>Recents</h1>
            {!notes ? (
                <span>You have no notes. <span onClick={toggleAddNote} className={'text-gray-400 cursor-pointer'}>Add one</span>.</span>
            ) : (
              <ul>
                {notes && notes.sort((a,b) => {
                  return (b.lastEdit - a.lastEdit)
                }).map((note: Note, idx: number) => {
                  const time = CalculateDate(new Date(Date.now()).getTime(), note?.lastEdit)
                  const handle = () => deleteNote(note.filename);
                  const stringTime = `${time.hour !== 0 ? time.hour + ' hours ago.' : ''} ${time.minute !== 0 && time.hour === 0 ? time.minute + ' minutes ago' : '0 minutes ago'}`
                  return <li className={'cursor-pointer hover:font-bold list-none'} key={`${note?.title}-${idx}`}><span className={'px-2 cursor-pointer'} aria-label={'Delete..'} onClick={handle}>🗑️</span><span onClick={() => navigateEditor(note)}>{`${note?.title}`}</span><span className={'pl-2 text-gray-400 text-sm'}>{stringTime}</span></li>
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
  )
}

export default Overview;