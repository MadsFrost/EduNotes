import React, { VoidFunctionComponent } from "react";
import { Hint } from 'react-autocomplete-hint';
import { Note } from "../../utils/Storage";
import { useNavigate } from "react-router-dom";

interface CommandInputProps {
    openNote: (note: Note) => void;
    updateNotes: (notes: Note[]) => void;
    notes: Note[];
    close: () => void;
}
const CommandInput: React.FC<CommandInputProps> = (props) => {
    const { openNote, updateNotes, notes, close } = props; 
    const navigate = useNavigate();
    const [hintData, setHintData] = React.useState(['Open:']);
    const [text, setText] = React.useState('');
    const openData: string[] = notes.map((note: Note) => {
        return 'Open:'+note.filename
    })
    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const command = text.split(':');
            switch (command[0].toLowerCase()) {
                case 'open':
                    const note = notes.find((note) => note.filename === command[1]);
                    if (note) {
                        openNote(notes.find((note) => note.filename === command[1]))
                        navigate('/edit')
                        close();
                    }
            }
        }
    }

    React.useEffect(() => {
        if (text.toLowerCase().includes('open')) {
            setHintData(openData)
        } else {
            setHintData(['Open:'])
        }
    }, [text])

    return (
        <div className='w-2/4 flex flex-col items-end shadow-sm dark:bg-gray-900 bg-white rounded-sm'>
            <div className='w-full'>
                <Hint options={hintData} allowEnterFill>
                    <input 
                        onKeyDown={handleEnter}
                        spellCheck={false}
                        value={text}
                        onChange={e => setText(e.currentTarget.value)}
                        autoFocus 
                        placeholder='Search Commands...'
                        className='text-lg placeholder-gray-500 bg-transparent text-gray-600 dark:text-white dark:placeholder-white w-full shadow-md border-none outline-none p-4 transition focus:transition-[width] duration-200' 
                    />
                </Hint>
                <div className='bg-transparent dark:text-white'>
                    {hintData.map((hint, index) => {
                        return <p key={`${hint}-${index}`}>{hint}</p>
                    })}
                </div>
            </div>
        </div>
    )
}

export default CommandInput;