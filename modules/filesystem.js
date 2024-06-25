import { data } from "./data.js"
/*
just shows the array and renders icons or buttons for each element in array
adds click events for each element to open a modal with the data
*/
export const filesystem = (elem) => {
    //dont need to use the params
    const div = document.createElement('div')
    const divArea = document.createElement('div')
    div.className = 'modal__textArea'
    divArea.className = 'filesystemDiv'


    data.forEach(item => {

        const button = document.createElement('button')
        button.innerText = item.type
        button.addEventListener('click', () => {
            console.log(item.id)
            // let noteText = document.getElementById(id).value
            // if (index === -1) {
            //     //not in data push to data
            //     data.push({
            //         type: 'note',
            //         data: noteText,
            //         id: id,
            //         deleted: false
            //     })
            // }
            // else {
            //     //in data, update that index with new data
            //     data[index].data = noteText
            // }
            // console.log(data)

        })
        divArea.appendChild(button)

    }

    )
    div.appendChild(divArea)
    elem.appendChild(div)



}