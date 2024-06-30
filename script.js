
import setConfettiListener from "./modules/special.js"
import { currentMenuContext } from "./modules/data.js";
import { addMenuButtonClasses, addMenuListeners } from "./modules/menu-btns.js";
import { createModal } from "./modules/createModals.js";
import { iconDetails } from "./modules/data.js"
import uuidv4 from "./modules/uuid.js";



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

const createIcons = (order, image, app) => {
    const storeDiv = document.getElementById(`div${calculateNumberOfSquares(80, 80)[0] * order - 1}`)
    const iconDiv = document.createElement('div')
    iconDiv.className = 'icon'
    const imageElem = document.createElement('img')
    imageElem.src = image
    imageElem.setAttribute('height', 60)
    imageElem.setAttribute('width', 60)
    iconDiv.appendChild(imageElem)
    const diskText = document.createTextNode(app)
    iconDiv.appendChild(diskText)
    iconDiv.id = app
    storeDiv.appendChild(iconDiv)
    storeDiv.addEventListener('click', () => {
        currentMenuContext[0] = {
            type: 'icon',
            data: null,
            id: null,
            status: 'temp',
            app: app,
            title: null,
        }
        addMenuButtonClasses()
    })
}

//build desktop icons
const buildIcons = () => {
    iconDetails.forEach(
        (item, index) => {
            createIcons(index + 1, item.image, item.app)
        }
    )
}

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
    buildIcons()
}
resizeScreen()// run once to calculate actual number of divs required based upon generated div size

let doit;
window.addEventListener("resize", (event) => {
    clearTimeout(doit);
    //wait till resize by user finishes before trying to regenerate divs
    doit = setTimeout(resizeScreen, 20);
});



//special button
setConfettiListener()

addMenuListeners()



