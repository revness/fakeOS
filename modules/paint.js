import { data } from "./data.js"
/*
 function that passes in the div element from the createmodal, 
attaches a canvas box and save button.
save button saves the data to a data array.
*/
export const paintApp = (elem, id) => {

    const div = document.createElement('div')
    const canvasArea = document.createElement('canvas')
    canvasArea.height = 100
    canvasArea.width = 100
    canvasArea.style.backgroundColor = 'white'

    let context = canvasArea.getContext("2d");
    let stroke_color = 'black';
    let stroke_width = "2";
    let is_drawing = false;
    function start(event) {
        is_drawing = true;
        context.beginPath();
        context.moveTo(getX(event), getY(event));
        event.preventDefault();
    }

    function draw(event) {
        if (is_drawing) {
            context.lineTo(getX(event), getY(event));
            context.strokeStyle = stroke_color;
            context.lineWidth = stroke_width;
            context.lineCap = "round";
            context.lineJoin = "round";
            context.stroke();
        }
        event.preventDefault();
    }

    function stop(event) {
        if (is_drawing) {
            context.stroke();
            context.closePath();
            is_drawing = false;
        }
        event.preventDefault();

    }

    function getX(event) {
        console.log(event.pageX)
        console.log(canvasArea.offsetLeft)
        if (event.pageX == undefined) { return event.targetTouches[0].pageX - canvasArea.offsetLeft }
        else { return event.pageX - canvasArea.offsetLeft }
    }


    function getY(event) {
        if (event.pageY == undefined) { return event.targetTouches[0].pageY - canvasArea.offsetTop }
        else { return event.pageY - canvasArea.offsetTop }
    }

    canvasArea.addEventListener("mousedown", start, false);
    canvasArea.addEventListener("mousemove", draw, false);
    canvasArea.addEventListener("mouseup", stop, false);




    div.className = 'modal__canvasArea'
    canvasArea.id = id
    div.appendChild(canvasArea)
    elem.appendChild(div)

    //create a button to save, which pushes it to data as a note, with type note, and uuid id value.
    const button = document.createElement('button')
    button.innerText = 'Save'
    button.addEventListener('click', () => {

        let index = data.findIndex(item => item.id == id)
        let canvasRef = document.getElementById(id)
        let canvasData = canvasRef.toDataURL()
        console.log(canvasData)
        if (index === -1) {
            //not in data push to data
            data.push({
                type: 'canvas',
                data: canvasData,
                id: id,
                deleted: false
            })
        }
        else {
            //in data, update that index with new data
            data[index].data = canvasData
        }
        console.log(data)

    })
    elem.appendChild(button)
}