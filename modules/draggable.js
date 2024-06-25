
export default function createDraggableStuff(divElem) {

    let startX = 0;
    let startY = 0;
    let offsetX = 0;
    let offsetY = 0;
    const firstChildEl = divElem.firstChild
    //selects modal_bar, as clicking on the actual div will need to be not bound, as we need to add to canvas or select form for notes.
    firstChildEl.addEventListener('mousedown', mouseDown)

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
