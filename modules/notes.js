
/*
 function that passes in the div element from the createmodal, 
attaches a text box and save button.
save button saves the data to a data array.
*/
const notesApp = (elem, id) => {
    const textArea = document.createElement('textarea')
    textArea.className = 'textArea'
    textArea.id = id
    elem.appendChild(textArea)
}