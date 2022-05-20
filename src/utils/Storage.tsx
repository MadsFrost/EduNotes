import { reactLocalStorage } from 'reactjs-localstorage';
export function initStorage() {
    if (localStorage.length === 0) {
        reactLocalStorage.set('notebooks', JSON.stringify({
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
        }));
    }
}
export function getNotebooks() {
    return reactLocalStorage.getObject('notebooks');
}