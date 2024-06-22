function calculateNumberOfSquares() {
    const viewportWidth = window.innerWidth;
    console.log(viewportWidth, 'viewportWidth')
    const viewportHeight = window.innerHeight - 30;
    console.log(viewportHeight, 'viewportHeight')

    const minGridItemWidth = 80; // Assuming 1rem = 16px, so 5rem = 80px (converted to pixels)
    const minGridItemHeight = 80; // Assuming 1rem = 16px, so 5rem = 80px (converted to pixels)

    // Calculate number of columns that can fit
    const numColumns = Math.floor(viewportWidth / minGridItemWidth);
    const numRows = Math.floor(viewportHeight / minGridItemHeight)
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
    screenElem = document.getElementById('screen')
    for (let i = 0; i < total; i++) {
        const div = document.createElement('div');
        div.id = 'div' + i
        div.textContent = ""
        screenElem.appendChild(div);
    }
}
createDivs(calculateNumberOfSquares()[2])


function resizedw() {
    // Haven't resized in 100ms!

    //remove all childen of screen element
    const screenElement = document.getElementById("screen");
    while (screenElement.firstChild) {
        screenElement.removeChild(screenElement.lastChild);
    }
    createDivs(calculateNumberOfSquares()[2])
    createDisk()
    createMacPaint()
    createMacNotes()
    createTrash()
}
let doit;
window.addEventListener("resize", (event) => {
    //wait till resize finish
    clearTimeout(doit);
    doit = setTimeout(resizedw, 500);


});

const createDisk = () => {
    console.log('runs creatediskicon')
    const storeDiv = document.getElementById(`div${calculateNumberOfSquares()[0] - 1}`)
    console.log(storeDiv)
    const imageElem = document.createElement('img')
    imageElem.src = 'https://img.icons8.com/ios/100/save-as.png'
    imageElem.setAttribute('height', 60)
    imageElem.setAttribute('width', 60)
    storeDiv.appendChild(imageElem)
    const diskText = document.createTextNode('Mac OS 1.1')
    storeDiv.appendChild(diskText)
    storeDiv.addEventListener('dblclick', () => {
        console.log('doubleclicked!')
        createModal('disk')
    })
}
const createMacPaint = () => {
    console.log('runs creatediskicon')
    const storeDiv = document.getElementById(`div${calculateNumberOfSquares()[0] * 2 - 1}`)
    console.log(storeDiv)
    const imageElem = document.createElement('img')
    imageElem.src = 'https://img.icons8.com/wired/64/microsoft-paint.png'
    imageElem.setAttribute('height', 60)
    imageElem.setAttribute('width', 60)
    storeDiv.appendChild(imageElem)
    const diskText = document.createTextNode('MacPaint')
    storeDiv.appendChild(diskText)
    storeDiv.addEventListener('dblclick', () => {
        console.log('doubleclicked!')
        createModal('Mac Paint')
    })
}
const createMacNotes = () => {
    console.log('runs creatediskicon')
    const storeDiv = document.getElementById(`div${calculateNumberOfSquares()[0] * 3 - 1}`)
    console.log(storeDiv)
    const imageElem = document.createElement('img')
    imageElem.src = 'https://img.icons8.com/ios/50/notepad.png'
    imageElem.setAttribute('height', 60)
    imageElem.setAttribute('width', 60)
    storeDiv.appendChild(imageElem)
    const diskText = document.createTextNode('MacNotes')
    storeDiv.appendChild(diskText)
    storeDiv.addEventListener('dblclick', () => {
        console.log('doubleclicked!')
        createModal('Mac Notes')
    })
}
const createTrash = () => {
    console.log('runs creatediskicon')
    const storeDiv = document.getElementById(`div${calculateNumberOfSquares()[0] * 4 - 1}`)
    console.log(storeDiv)
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


//function to make modals
let leftPos = 0
let topPos = 0
const createModal = (text) => {
    const screenElem = document.getElementById('screen')
    const divElem = document.createElement('div')
    const modalBar = document.createElement('div')
    const textNode = document.createTextNode(text)
    modalBar.appendChild(textNode)
    divElem.className = 'modal'
    modalBar.className = 'modalBar'

    //create close button which is a small square.
    const closeButton = document.createElement('div')
    closeButton.className = 'close-btn'
    modalBar.appendChild(closeButton)
    closeButton.addEventListener('click', () => {
        screenElem.removeChild(divElem)
    })

    divElem.appendChild(modalBar)
    screenElem.appendChild(divElem)
    divElem.style.height = '200px'
    divElem.style.width = '300px'
    //increment left and top by 20px so divs are staggered
    leftPos += 20
    topPos += 20
    divElem.style.left = leftPos + 'px'
    divElem.style.top = topPos + 'px'
    //draggable stuff
    let startX = 0;
    let startY = 0;
    let offsetX = 0;
    let offsetY = 0;
    divElem.addEventListener('mousedown', mouseDown)

    function mouseDown(e) {
        startX = e.clientX;
        startY = e.clientY;
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
        const transform = getComputedStyle(divElem).transform;
        divElem.style.transition = ''
        const transformMatch = transform.match(/[-+]?[\d]*\.?[\d]+/g) || [0, 0, 0];
        offsetX = parseFloat(transformMatch[4]) || 0;
        offsetY = parseFloat(transformMatch[5]) || 0;
    }

    function mouseMove(e) {
        const newX = offsetX + e.clientX - startX;
        const newY = offsetY + e.clientY - startY;
        divElem.style.transform = `translate3d(${newX}px, ${newY}px, 0) `;
    }
    function mouseUp(e) {
        document.removeEventListener('mousemove', mouseMove)
        document.removeEventListener('mouseup', mouseUp);
    }
}
