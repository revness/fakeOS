import { currentMenuContext, data } from "./data.js"
import { addMenuButtonClasses } from "./menu-btns.js"
/*
 function that passes in the div element from the createmodal, 
attaches a canvas box and save button.
save button saves the data to a data array.
*/

export const paintApp = (elem, id, contextItem) => {
    console.log(data, 'data')
    console.log(currentMenuContext, 'currentMenuContext')


    const canvasArea = document.createElement('canvas')
    canvasArea.id = id
    console.log(canvasArea.id)
    canvasArea.className = "canvas1"
    const ctx = canvasArea.getContext('2d')
    canvasArea.height = 175
    canvasArea.width = 300

    if (contextItem) {
        let img = new Image();
        img.src = contextItem.data
        console.log(img.src)
        img.onload = function () {
            // Draw the image onto the canvas
            ctx.drawImage(img, 0, 0, canvasArea.width, canvasArea.height); // Adjust as needed

        };
        contextItem.status = "temp"
        currentMenuContext[0] = contextItem
        console.log(currentMenuContext[0])
        addMenuButtonClasses()
    }


    let isPainting = false;
    let lineWidth = 5;

    const mouse = {
        x: undefined,
        y: undefined
    }
    const draw = e => {
        if (!isPainting) {
            return
        }
        const rect = canvasArea.getBoundingClientRect()

        ctx.lineWidth = lineWidth
        ctx.linecap = 'round'
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
        ctx.stroke()
    }
    canvasArea.addEventListener('mousedown', (e) => {
        const rect = canvasArea.getBoundingClientRect()

        mouse.x = e.x - rect.left
        mouse.y = e.y - rect.top
        isPainting = true
    })

    canvasArea.addEventListener('mousemove', draw
    )
    canvasArea.addEventListener('mouseup', (e) => {
        isPainting = false;
        ctx.stroke()
        ctx.beginPath()
    })

    elem.appendChild(canvasArea)


}