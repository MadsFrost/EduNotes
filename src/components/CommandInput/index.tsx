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
    const availableHints = ['Open', 'Overview']; 
    const navigate = useNavigate();
    const [hintData, setHintData] = React.useState(availableHints);
    const [text, setText] = React.useState('');
    const openHints: string[] = notes.map((note: Note) => {
        return 'Open:'+note.filename
    })
    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const command = text.split(':');
            console.log(command[0].toLowerCase(), text);
            switch (command[0].toLowerCase()) {
                case 'overview':
                    navigate('/');
                    close();
                case 'open':
                    const note = notes.find((note) => note.filename === command[1]);
                    if (note) {
                        openNote(notes.find((note) => note.filename === command[1]))
                        navigate('edit');
                        close();
                    }
                default:
                    return
            }
        }
    }

    React.useEffect(() => {
        if (text.toLowerCase().includes('open')) {
            setHintData(openHints)
        } else {
            setHintData(availableHints)
        }
    }, [text])

    return (
        <div className='w-2/4 flex flex-col items-end shadow-sm dark:bg-gray-900 bg-white rounded-sm'>
            <div className='w-full'>
                <Hint options={hintData} allowEnterFill allowTabFill>
                    <input 
                        onKeyDown={handleEnter}
                        spellCheck={false}
                        value={text}
                        onChange={e => setText(e.target.value)}
                        autoFocus 
                        placeholder='Search Commands...'
                        className='text-lg placeholder-gray-500 bg-transparent text-gray-600 dark:text-white dark:placeholder-whitegi w-full shadow-md border-none outline-none p-4 transition focus:transition-[width] duration-200' 
                    />
                </Hint>
                <div className='bg-transparent dark:text-white p-4 flex flex-col'>
                    <span className='text-lg'>Suggestions</span>
                    {hintData.map((hint, index) => {
                        return <code key={`${hint}-${index}`}>{hint}</code>
                    })}
                </div>
            </div>
        </div>
    )
}

export default CommandInput;