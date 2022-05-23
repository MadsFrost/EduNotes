import { reactLocalStorage } from 'reactjs-localstorage';

export interface Note {
    title: string;
    markdown: string;
    filename: string;
    category: string;
    lastEdit: number;
}

export function getNotes() {
    if (localStorage.length !== 0) {
      return JSON.parse(reactLocalStorage.get('notes'));
    }
    return [];
}

export function updateNotes(notes: Note[]) {
  reactLocalStorage.set('notes', JSON.stringify(notes))
}