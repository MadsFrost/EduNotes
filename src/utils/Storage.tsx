import { reactLocalStorage } from 'reactjs-localstorage';

export interface Notebooks {
    [key:string]: Note[]
}

export interface Note {
    markdown: string;
    filename: string;
}
export function initStorage() {
    const template: Notebooks = {
            "University": [
                { 
                    "markdown": "#Starter Template",
                    "filename": "starter.md"
                }
            ],
            "Test": [
                { 
                    "markdown": "#Test Template",
                    "filename": "test.md"
                }
            ]
    }
    if (localStorage.length === 0) {
        reactLocalStorage.set('notebooks', JSON.stringify(template));
    }
}
export function getNotebooks() {
    return reactLocalStorage.getObject('notebooks');
}