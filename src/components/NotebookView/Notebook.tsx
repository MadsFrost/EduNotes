import React from 'react';
import { Note } from "../../utils/Storage";
import folder from "../../assets/icons/folder.png";
import Notes from './Notes';
export interface Notebook {
    notebookTitle: string;
    notebook: Note[];
}
const Notebook: React.FC<Notebook> = (props) => {
    const { notebookTitle, notebook } = props;
    console.log('NotebookItemTitle: ', notebookTitle, 'Notebook: ', notebook);
    return (
        <div className='flex flex-col rounded-lg cursor-pointer pb-8'>
            <h1 className='text-xl flex items-center'>
                <img width={'30px'} className='m-2' src={folder} /> {notebookTitle}
            </h1>
            <Notes notes={notebook}/>
        </div>
    )
}

export default Notebook;