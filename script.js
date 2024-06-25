import createDraggableStuff from "./modules/draggable.js";
import uuidv4 from "./modules/ uuid.js";
import { notesApp } from "./modules/notes.js";
import { paintApp } from "./modules/paint.js";
import { filesystem } from "./modules/filesystem.js";



function calculateNumberOfSquares(width, height) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight - 30;
    // Calculate number of columns that can fit
    const numColumns = Math.floor(viewportWidth / width);
    const numRows = Math.floor(viewportHeight / height)
    const total = numColumns * numRows

    return [numColumns, numRows, total]
}

const updateDateTime = () => {
    const now = new Date();
    const currentDateTime = now.toLocaleString();
    document.querySelector('#datetimeSpan').textContent = currentDateTime;
}
setInterval(updateDateTime, 1000);


const createDivs = (total) => {
    const screenElem = document.getElementById('screen')
    for (let i = 0; i < total; i++) {
        const div = document.createElement('div');
        div.id = 'div' + i
        div.textContent = ''
        screenElem.appendChild(div);
    }
}
createDivs(calculateNumberOfSquares(80, 80)[2])



const createDisk = () => {
    const storeDiv = document.getElementById(`div${calculateNumberOfSquares(80, 80)[0] - 1}`)
    const imageElem = document.createElement('img')
    imageElem.src = 'https://img.icons8.com/ios/100/save-as.png'
    imageElem.setAttribute('height', 60)
    imageElem.setAttribute('width', 60)
    storeDiv.appendChild(imageElem)
    const diskText = document.createTextNode('Mac OS 1.1')
    storeDiv.appendChild(diskText)
    storeDiv.addEventListener('dblclick', () => {
        console.log('doubleclicked!')
        createModal('disk', filesystem)
    })
}
const createMacPaint = () => {
    const storeDiv = document.getElementById(`div${calculateNumberOfSquares(80, 80)[0] * 2 - 1}`)
    const imageElem = document.createElement('img')
    imageElem.src = 'https://img.icons8.com/wired/64/microsoft-paint.png'
    imageElem.setAttribute('height', 60)
    imageElem.setAttribute('width', 60)
    storeDiv.appendChild(imageElem)
    const diskText = document.createTextNode('MacPaint')
    storeDiv.appendChild(diskText)
    storeDiv.addEventListener('dblclick', () => {
        console.log('doubleclicked!')
        createModal('Mac Paint', paintApp)
    })
}
const createMacNotes = () => {
    const storeDiv = document.getElementById(`div${calculateNumberOfSquares(80, 80)[0] * 3 - 1}`)
    const imageElem = document.createElement('img')
    imageElem.src = 'https://img.icons8.com/ios/50/notepad.png'
    imageElem.setAttribute('height', 60)
    imageElem.setAttribute('width', 60)
    storeDiv.appendChild(imageElem)
    const diskText = document.createTextNode('MacNotes')
    storeDiv.appendChild(diskText)
    storeDiv.addEventListener('dblclick', () => {
        console.log('doubleclicked!')
        createModal('Mac Notes', notesApp)

    })
}
const createTrash = () => {
    const storeDiv = document.getElementById(`div${calculateNumberOfSquares(80, 80)[0] * 4 - 1}`)
    const imageElem = document.createElement('img')
    imageElem.src = 'https://img.icons8.com/ios/50/trash--v1.png'
    imageElem.setAttribute('height', 60)
    imageElem.setAttribute('width', 60)
    storeDiv.appendChild(imageElem)
    const diskText = document.createTextNode('Trash')
    storeDiv.appendChild(diskText)
    storeDiv.addEventListener('dblclick', () => {
        console.log('doubleclicked!')
        createModal('Trash')
    })
}

//build desktop icons
createDisk()
createMacPaint()
createMacNotes()
createTrash()

//watch window and replace icons if resized
function resizeScreen() {
    const div = document.querySelector('#screen > div');
    const rect = div.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    //remove all childen of screen element
    const screenElement = document.getElementById("screen");
    while (screenElement.firstChild) {
        screenElement.removeChild(screenElement.lastChild);
    }
    createDivs(calculateNumberOfSquares(width, height)[2])
    createDisk()
    createMacPaint()
    createMacNotes()
    createTrash()
}
resizeScreen()// run once to calculate actual number of divs required based upon generated div size
let doit;
window.addEventListener("resize", (event) => {
    //wait till resize finish
    clearTimeout(doit);
    doit = setTimeout(resizeScreen, 20);


});


//function to make modals
let leftPos = 0
let topPos = 0
const createModal = (text, func) => {
    const screenElem = document.getElementById('screen')
    const divElem = document.createElement('div')
    const mainElem = document.createElement('div')
    mainElem.className = 'modal__mainElem'
    func(mainElem, uuidv4())
    const modalBar = document.createElement('div')
    const textNode = document.createTextNode(text)
    modalBar.appendChild(textNode)
    divElem.className = 'modal'
    modalBar.className = 'modal__bar'

    //create close button which is a small square.
    const closeButton = document.createElement('div')
    closeButton.className = 'modal__close-btn'
    modalBar.appendChild(closeButton)
    closeButton.addEventListener('click', () => {
        screenElem.removeChild(divElem)
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
    createDraggableStuff(divElem)

}



