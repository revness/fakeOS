import { data } from "./data.js"
import { iconDetails } from "./data.js"
import { currentMenuContext } from "./data.js"
import { addMenuButtonClasses } from "./menu-btns.js"
/*
just shows the array and renders icons or buttons for each element in array if deleted = true
adds click events for each element to open a modal with the data
*/
export const trash = (elem) => {
    //dont need to use the params
    const div = document.createElement('div')
    const divArea = document.createElement('div')
    div.className = 'modal__textArea'
    divArea.className = 'filesystemDiv'


    data.filter(el => el.status == 'deleted').forEach(item => {


        const divEl = document.createElement('div')
        if (item.type === 'note') {
            const imgEl = document.createElement('img')
            imgEl.src = iconDetails.filter(el => el.app == "MacNotes")[0].image
            divEl.appendChild(imgEl)

        }
        if (item.type === 'canvas') {
            const imgEl = document.createElement('img')
            imgEl.src = iconDetails.filter(el => el.app == "MacPaint")[0].image
            divEl.appendChild(imgEl)

        }
        const textNode = document.createTextNode(item.type)
        divEl.appendChild(textNode)


        divEl.addEventListener('click', () => {
            //add context to currentmenu context
            currentMenuContext[0] = {
                type: item.type,
                data: item.data,
                id: item.id,
                status: item.status,
                app: item.app,
                title: null
            }
            console.log(currentMenuContext[0])
            addMenuButtonClasses()




        })
        divArea.appendChild(divEl)

    }

    )
    div.appendChild(divArea)
    elem.appendChild(div)



}