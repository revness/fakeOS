import { data } from "./data"

const addSingleClickListener = (elem, name) => {
    elem.addEventListener('click', () => {
        data.singleClickQueue[0] = {
            type: 'icon',
            name: name,
        }
        console.log(singleClickQueue)
        //handle single click information--> mutate button in navbar logic
        addMenuButtonClasses('icon')
        //add class to icon to show selected
    })
}
