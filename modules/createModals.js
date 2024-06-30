import uuidv4 from "./uuid.js";
import createDraggableStuff from "./draggable.js";
import { data, currentMenuContext } from "./data.js";
import { addMenuButtonClasses } from "./menu-btns.js";
import { paintApp } from "./paint.js";
import { notesApp } from "./notes.js";




//function to make modals


let leftPos = 0
let topPos = 0
export const createModal = (text, func, id) => {

    const screenElem = document.getElementById('screen')
    const divElem = document.createElement('div')
    const mainElem = document.createElement('div')
    mainElem.className = 'modal__mainElem'
    func(mainElem, id)

    const modalBar = document.createElement('div')

    console.log(currentMenuContext[0], 'createModalContext')
    if (currentMenuContext[0].title) {
        const textNode = document.createTextNode(title)
        modalBar.appendChild(textNode)

    } else {
        const textNode = document.createTextNode(text)
        modalBar.appendChild(textNode)

    }
    divElem.className = 'modal'
    modalBar.className = 'modal__bar'

    //create close button which is a small square.
    const closeButton = document.createElement('div')
    closeButton.className = 'modal__close-btn'
    modalBar.appendChild(closeButton)
    closeButton.addEventListener('click', () => {
        screenElem.removeChild(divElem);
        currentMenuContext.splice(0, 1)
        addMenuButtonClasses()
    })

    divElem.appendChild(modalBar)
    divElem.appendChild(mainElem)
    screenElem.appendChild(divElem)
    divElem.style.height = '200px'
    divElem.style.width = '300px'
    //increment left and top by 20px so divs are staggered
    leftPos += 20
    topPos += 20
    divElem.style.left = leftPos + 'px'
    divElem.style.top = topPos + 'px'
    //add mousedown, up listeners to divElem, well- the child of it as we dont want the full div to be listened
    createDraggableStuff(divElem)
}
export const openModal = (contextItem) => {

    const screenElem = document.getElementById('screen')
    const divElem = document.createElement('div')
    const mainElem = document.createElement('div')
    mainElem.className = 'modal__mainElem'
    if (contextItem.type == 'canvas') {
        paintApp(mainElem, contextItem.id, contextItem)
    }
    if (contextItem.type == 'note') {
        notesApp(mainElem, contextItem.id, contextItem)
    }


    const modalBar = document.createElement('div')
    const textNode = document.createTextNode(contextItem.type)
    modalBar.appendChild(textNode)
    divElem.className = 'modal'
    modalBar.className = 'modal__bar'

    //create close button which is a small square.
    const closeButton = document.createElement('div')
    closeButton.className = 'modal__close-btn'
    modalBar.appendChild(closeButton)
    closeButton.addEventListener('click', () => {
        screenElem.removeChild(divElem);
        currentMenuContext.splice(0, 1)
        addMenuButtonClasses()
    })

    divElem.appendChild(modalBar)
    divElem.appendChild(mainElem)
    screenElem.appendChild(divElem)
    divElem.style.height = '200px'
    divElem.style.width = '300px'
    //increment left and top by 20px so divs are staggered
    leftPos += 20
    topPos += 20
    divElem.style.left = leftPos + 'px'
    divElem.style.top = topPos + 'px'
    //add mousedown, up listeners to divElem, well- the child of it as we dont want the full div to be listened
    createDraggableStuff(divElem)
}