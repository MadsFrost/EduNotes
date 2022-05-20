import React from 'react';
import { Note } from '../../utils/Storage';
import document from '../../assets/icons/document.png';
export interface NotesProps {
    notes: Note[];
}
const Notes: React.FC<NotesProps> = (props) => {
    const { notes } = props;
    return (
        <div className='pl-4'>
            {notes.map((note) => {
                return ( 
                    <h1 className='text-xl flex items-center'>
                    <img width={'30px'} className='m-2' src={document} /> {note.filename}</h1>
                )
            })}
        </div>
    )
}

export default Notes;