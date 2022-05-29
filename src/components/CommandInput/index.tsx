import React from "react";
import { Hint } from 'react-autocomplete-hint';
import { Note } from "../../utils/Storage";
import { useNavigate, useLocation } from "react-router-dom";

interface CommandInputProps {
    openNote: (note: Note) => void;
    updateNotes: (notes: Note[]) => void;
    notes: Note[];
    close: () => void;
    currentNote: Note;
}
const CommandInput: React.FC<CommandInputProps> = (props) => {
    const { openNote, updateNotes, notes: availableNotes, close, currentNote } = props;
    const [notes, setNotes] = React.useState(availableNotes);
    React.useEffect(() => {
        notes.length !== 0 && setNotes(availableNotes)
    }, [availableNotes]);
    console.log(notes);
    const navigate = useNavigate();
    const location = useLocation();
    const availableHints = location.pathname !== '/' ? ['cat:', 'overview', 'rm:', 'touch:', 'move:', 'md:'] : ['cat:', 'overview', 'rm:', 'touch:', 'move:']
    const [hintData, setHintData] = React.useState(availableHints);
    const [text, setText] = React.useState('');
    const openHints: string[] = notes ? notes.map((note?: Note) => {
        return 'cat:'+note?.filename
    }) : [];
    const deleteHints: string[] = notes ? notes.map((note?: Note) => {
        return 'rm:'+note?.filename
    }) : []
    const editHints: string[] = notes.length > 0 ? notes.map((note?: Note) => {
        return 'move:'+note?.filename+':newFileName';
    }) : []
    const mdHints: string [] = ['md:m:', 'md:t:', 'md:el:']
    const mathHints: string[] = [
        'block',
        'in',
    ]
    const textHints: string[] = [
        'it',
        'b',
        'code',
        'link',
        'strike'
    ]
    const elementHints: string [] = [
        ':quote',
        ':img',
        ':ol',
        ':ul',
        ':table'
    ]

    const addCurrentMarkdown = (markdown: string) => {
        openNote({...currentNote, markdown: currentNote.markdown + markdown});
    };
    const testCommand = (sub: string) => {
        return text.toLowerCase().includes(sub);
    }
    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const command = text.split(':');
            switch (command[0].toLowerCase()) {
                case 'overview':
                    navigate('/');
                    close();
                    break;
                case 'bold':
                    break;
                case 'img':
                    break;
                case 'md':
                    console.log(command);
                    if (command[2] !== undefined && currentNote) {
                        switch (command[1].toLowerCase()) {
                            case 'm':
                                switch (command[2].toLowerCase()) {
                                    case 'block':
                                        addCurrentMarkdown("\n```KaTeX\n123 + \\frac{123}{123}\n```")
                                        break;
                                    case 'in':
                                        addCurrentMarkdown("`$$123 + \\frac{123}{123}$$`")
                                        break;
                                }
                                break;
                            case 'el':
                                switch (command[2].toLowerCase()) {
                                    case 'table':
                                        addCurrentMarkdown("\n  Syntax | Description |\n| ----------- | ----------- |\n| Header | Title |\n| Paragraph | Text |")
                                        close();
                                        break;
                                    case 'quote':
                                        addCurrentMarkdown("\n > blockquote")
                                        close();
                                        break;
                                    case 'img':
                                        addCurrentMarkdown(" ![alt text](image.jpg)")
                                        close();
                                        break;
                                    case 'Ol':
                                        addCurrentMarkdown("\n 1. First item \n 2. Second item \n 3. Third item")
                                        close();
                                        break;
                                    case 'Ul':
                                        addCurrentMarkdown("\n - First item \n - Second item \n - Third item")
                                        close();
                                        break;
                                }
                                break;
                            case 't':
                                switch (command[2].toLowerCase()) {
                                    case 'bold':
                                        addCurrentMarkdown(" **Text Here**")
                                        close();
                                        break;
                                    case 'italic':
                                        addCurrentMarkdown(" *italicized text*")
                                        close();
                                        break;
                                    case 'code':
                                        addCurrentMarkdown(" `code`")
                                        close();
                                        break;
                                    case 'link':
                                        addCurrentMarkdown(" [title](https://www.example.com)")
                                        close();
                                        break;
                                    case 'strike':
                                        addCurrentMarkdown(" ~~The world is flat.~~")
                                        close();
                                        break;
                                }
                        }
                        close();
                    }
                    break;
                case 'cat':
                    const searchedNote = notes.find((note) => note.filename === command[1]);
                    if (searchedNote) {
                        openNote(notes.find((note) => note.filename === searchedNote.filename));
                        navigate('edit');
                        close();
                    }
                    break;
                case 'rm':
                    const noteToDelete = notes.find((note) => note.filename === command[1]);
                    if (noteToDelete.filename === currentNote.filename) {
                        navigate('/');
                        updateNotes(notes.filter((note) => note.filename !== noteToDelete.filename));
                        close();
                    }
                    else {
                        updateNotes(notes.filter((note) => note.filename !== noteToDelete.filename));
                        close();
                    }
                    break;
                case 'touch':
                    if (command[1]) {
                            const newNote = {
                                title: `${command[1].toLowerCase()}`,
                                markdown: '',
                                filename: `${command[1]}.md`,
                                category: 'none',
                                lastEdit: new Date(Date.now()).getTime()
                            }
                            const checkSameFileExists = notes.filter(note => note.filename === newNote.filename);
                            if (checkSameFileExists.length >= 1) {
                                const noteToAdd = {...newNote, title:`${newNote.title.replace(' ', '-')}_${notes.length + 1}.md`,  filename: `${newNote.title.replace(' ', '-')}_${notes.length + 1}`, category: 'test'};
                                updateNotes([...notes, noteToAdd]);
                                openNote(noteToAdd);
                                navigate('edit');
                                close();
                            } else {
                                const noteToAdd = {...newNote, filename: `${newNote.title.replace(' ', '-')}.md`, category: 'test'};
                                updateNotes([...notes, noteToAdd]);
                                openNote(noteToAdd);
                                navigate('edit');
                                close();
                            }
                    }
                    break;
                case 'move':
                    if (command[1] !== undefined && command[2] !== undefined) {
                        const noteToEdit = notes.find((note) => note.filename === command[1]);
                        const checkSameFileExists = notes.filter(note => note.filename === command[1]);
                        if (checkSameFileExists.length >= 1) {
                            updateNotes([...notes.filter(note => note.filename !== noteToEdit.filename), {...noteToEdit, title: command[2], filename: command[2]+'.md'}])
                            close();
                        }
                    }
                    break;
                default:
                    break;
            }
        }
    }

    React.useEffect(() => {
        if (testCommand('cat')) {
            setHintData(openHints);
        } else if (testCommand('rm')) {
            setHintData(deleteHints);
        } else if (testCommand('touch')) {
            setHintData(['New:titleOfNote']);
        } else if (testCommand('move')) {
            setHintData(editHints);
        } else if (testCommand('md')) {
            if (testCommand('md:m')) {
                setHintData(mathHints);
            } else if (testCommand('md:t')) {
                setHintData(textHints)
            } else if (testCommand('md:el')) {
                setHintData(elementHints)
            } else {
                setHintData(mdHints);
            }
        } else {
            setHintData(availableHints)
        }
    }, [text])

    return (
        <>
            <div className='w-2/4 flex flex-col items-end shadow-sm dark:bg-gray-900 bg-white rounded-md rounded-bl-md rounded-br-md'>
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
                        <span className='text-lg'>Commands</span>
                        {hintData.map((hint, index) => {
                            return <code key={`${hint}-${index}`}>{hint}</code>
                        })}
                    </div>
                </div>
                <div className={'w-full rounded-bl-md rounded-br-md h-[10px] bg-gray-300'} />
            </div>
        </>
    )
}

export default CommandInput;