import { currentMenuContext, data } from "./data.js"
import { addMenuButtonClasses } from "./menu-btns.js"
/*
 function that passes in the div element from the createmodal, 
attaches a text box and save button.
save button saves the data to a data array.
*/
export const notesApp = (elem, id, contextItem) => {

    const div = document.createElement('div')
    const textArea = document.createElement('textarea')
    textArea.className = 'textArea'
    textArea.setAttribute('rows', 7)
    div.className = 'modal__textArea'
    textArea.id = id
    if (contextItem) {
        textArea.value = contextItem.data
        contextItem.status = "temp"
        currentMenuContext[0] = contextItem
        addMenuButtonClasses()
    }


    div.appendChild(textArea)
    elem.appendChild(div)
    console.log(data, 'data')
    console.log(currentMenuContext, 'currentMenuContext')
}