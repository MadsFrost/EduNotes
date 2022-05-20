import React from 'react';
import { Notebooks as NotebookProps } from "../../utils/Storage";
import { getNotebooks } from "../../utils/Storage";
import Notebook from './Notebook';
const NotebookVIew: React.FC<NotebookProps> = () => {
    const notebooks = Object.entries(getNotebooks());
    return (
        <div className='p-12 shadow-md w-full flex flex-col'>
            <div className='flex flex-col'>
                {notebooks.map((notebook, index) => {
                    return <Notebook notebookTitle={notebook[0]} notebook={notebook[1]} key={`${notebook[0]}-${index}`}/>
                })}
            </div>
        </div>
    )
}

export default NotebookVIew;