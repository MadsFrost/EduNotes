import { reactLocalStorage } from 'reactjs-localstorage';
export function initStorage() {
    if (localStorage.length === 0) {
        reactLocalStorage.set('notebooks', JSON.stringify({
            "University": {
                "Starter": ""
            },
            "Work": {
                "Starter": ""
            }
        }));
    }
}
export function getNotebooks() {
    return reactLocalStorage.getObject('notebooks');
}