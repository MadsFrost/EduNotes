import React from "react";
import document from "../../assets/icons/document.png";
import { Note } from "../../utils/Storage";
import { CalculateDate } from "../../utils/CalculateDate";

interface OverviewProps {
  notes: Note[];
  onChange: (notes: Note[]) => void;
}

const Overview: React.FC<OverviewProps> = (props) => {
  const { notes, onChange } = props;
  const addNote = () => {
    const note: Note = {
      title: `untitled_${notes.length + 1}`,
      markdown: '',
      filename: `untitled_${notes.length + 1}.md`,
      category: 'none',
      lastEdit: new Date(Date.now()).getTime()
    }
    onChange([...notes, note]);
  }
  const deleteNote = (filename: string) => {
    onChange(notes.filter((note: Note) => {
      return note.filename !== filename
    }));
  }
  return (
      <div className={'w-full h-full text-white flex flex-col items-center'}>
        <div className={'w-full flex flex-row justify-start items-center px-12 py-8'}>
          <img src={document} className={'w-full max-w-[50px]'} />
          <h1 className={'pl-4 text-xl font-bold'}>Markdown</h1><h1 className={'italic text-xl'}>Notes</h1>
        </div>

        <div className={'w-full flex flex-row items-center px-12'}>
          <button className={'align-center transition fade-in-out transition-all hover:italic'} onClick={addNote}>+ Add Note</button>
        </div>

        <div className={'flex-row flex w-full p-12'}>
          <div className={'flex-col flex w-full'}>
            <h1 className={'text-lg font-bold'}>Recents</h1>
            <ul>
            {notes.map((note: Note, idx: number) => {
              const time = CalculateDate(new Date(Date.now()).getTime(), note.lastEdit)
              const handle = () => deleteNote(note.filename);
              const stringTime = `${time.hour !== 0 ? time.hour + ' hours ago.' : ''} ${time.minute !== 0 && time.hour === 0 ? time.minute + ' minutes ago' : '0 minutes ago'}`
              return <li key={`${note.title}-${idx}`}><span className={'px-2 cursor-pointer'} aria-label={'Delete..'} onClick={handle}>🗑️</span>{`${note.title}`}<span className={'pl-2 text-gray-400 text-sm'}>{stringTime}</span></li>
            })}
            </ul>
          </div>
        </div>
      </div>
  )
}

export default Overview;