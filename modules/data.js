import { filesystem } from "./filesystem.js"
import { paintApp } from "./paint.js"
import { notesApp } from "./notes.js"
import { trash } from "./trash.js"


export const data = []


//idea is, single click = 'select' we can use nav bar to know what context we have for the save view open delete actions etc.
//need to add single click event listeners to all elements, maybe a border? to highlight
//when an element is selected
// export const singleClickQueue = []
export const currentMenuContext = []


export const iconDetails = [
    {
        app: "MacOS_1.1",
        func: filesystem,
        image: 'https://img.icons8.com/ios/100/save-as.png'
    },
    {
        app: 'MacPaint',
        func: paintApp,
        image: 'https://img.icons8.com/wired/64/microsoft-paint.png'
    },
    {
        app: "MacNotes",
        func: notesApp,
        image: 'https://img.icons8.com/ios/50/notepad.png'
    },
    {
        app: "Trash",
        func: trash,
        image: 'https://img.icons8.com/ios/50/trash--v1.png'
    },

]