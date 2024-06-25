import { data } from "./data.js"
/*
 function that passes in the div element from the createmodal, 
attaches a text box and save button.
save button saves the data to a data array.
*/
export const notesApp = (elem, id) => {

    const div = document.createElement('div')
    const textArea = document.createElement('textarea')
    div.className = 'modal__textArea'
    textArea.id = id
    div.appendChild(textArea)
    elem.appendChild(div)


    //create a button to save, which pushes it to data as a note, with type note, and uuid id value.
    const button = document.createElement('button')
    button.innerText = 'Save'
    button.addEventListener('click', () => {
        let index = data.findIndex(item => item.id == id)
        let noteText = document.getElementById(id).value
        if (index === -1) {
            //not in data push to data
            data.push({
                type: 'note',
                data: noteText,
                id: id,
                deleted: false
            })
        }
        else {
            //in data, update that index with new data
            data[index].data = noteText
        }
        console.log(data)

    })
    elem.appendChild(button)
}