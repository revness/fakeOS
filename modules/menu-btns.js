import { createModal, openModal } from "./createModals.js"
import { iconDetails, currentMenuContext, data } from './data.js'
import uuidv4 from "./uuid.js"


const menuIds = ['save', 'delete', 'open', 'file']
//add listeners to each button that has logic for how it would
//handle different contexts
//get context.
//set class for context


export const addMenuListeners = () => {
    //add single click listeners to each button.
    menuIds.forEach(el => {
        //get the div for button
        let item = document.getElementById(el)
        //add listener
        switch (true) {
            case (el === 'save'):
                //only displays if context is a note or canvas being opened.
                item.addEventListener('click', () => {
                    if (currentMenuContext[0].app == 'MacPaint') {
                        let id = currentMenuContext[0].id
                        let title = currentMenuContext[0].title
                        let index = data.findIndex(item => item.id == id)
                        let canvasRef = document.getElementById(currentMenuContext[0].id)
                        let canvasData = canvasRef.toDataURL()
                        if (index === -1) {
                            //not in data push to data
                            data.push({
                                type: 'canvas',
                                data: canvasData,
                                id: id,
                                status: 'saved',
                                app: 'MacPaint',
                                title: title
                            })
                        }
                        else {
                            //in data, update that index with new data
                            data[index].data = canvasData
                            data[index].status = 'saved'
                        }
                    }
                    else if (currentMenuContext[0].app == 'MacNotes') {
                        let id = currentMenuContext[0].id
                        let title = currentMenuContext[0].title
                        let index = data.findIndex(item => item.id == id)
                        let notesData = document.getElementById(currentMenuContext[0].id).value
                        console.log(notesData)
                        if (index === -1) {
                            //not in data push to data
                            data.push({
                                type: 'note',
                                data: notesData,
                                id: id,
                                status: 'saved',
                                app: 'MacNotes',
                                title: title
                            })
                        }
                        else {
                            //in data, update that index with new data
                            data[index].data = notesData
                            data[index].status = 'saved'
                        }
                    }
                })
                break;
            case (el === 'delete'):
                //only displays if single click on note or canvas icon
                item.addEventListener('click', () => {
                    console.log('delete')
                    if (currentMenuContext[0].type == 'canvas' && currentMenuContext[0].status == 'saved') {
                        //mark as deleted
                        data.forEach(el => {
                            if (el.id == currentMenuContext[0].id) {
                                el.status = 'deleted'
                            }
                        })

                        console.log(data, 'data')
                        console.log(currentMenuContext[0], 'current context')
                    }
                    else if (currentMenuContext[0].type == 'note' && currentMenuContext[0].status == 'saved') {
                        data.forEach(el => {
                            if (el.id == currentMenuContext[0].id) {
                                el.status = 'deleted'
                            }
                        })
                    }
                })
                break;
            case (el === 'open'):
                //shows if icon is clicked
                item.addEventListener('click', () => {
                    const app = currentMenuContext[0].app
                    const type = currentMenuContext[0].type
                    console.log('open')
                    const uuid = uuidv4()
                    console.log(currentMenuContext[0])

                    if (app == 'MacPaint' && type == 'icon')  // macpaint app, new canvas
                    {
                        currentMenuContext[0] = {
                            id: uuid,
                            type: 'canvas',
                            data: null,
                            status: 'temp',
                            app: 'MacPaint',
                            title: null

                        }
                        createModal(app, iconDetails.filter(el => el.app === app)[0].func, uuid)
                        addMenuButtonClasses()
                    } else if (app == 'MacOS_1.1') {
                        createModal(app, iconDetails.filter(el => el.app === app)[0].func, uuid)
                    } else if (app == 'MacNotes' && type == 'icon') {
                        currentMenuContext[0] = {
                            id: uuid,
                            type: 'note',
                            data: null,
                            status: 'temp',
                            app: 'MacNotes',
                            title: null

                        }
                        createModal(app, iconDetails.filter(el => el.app === app)[0].func, uuid)
                        addMenuButtonClasses()
                    }
                    else if (app == 'Trash') {
                        createModal(app, iconDetails.filter(el => el.app === app)[0].func, uuid)
                    }
                    else if (type == 'canvas') {
                        openModal(currentMenuContext[0])
                    }
                    else if (type == 'note') {
                        openModal(currentMenuContext[0])
                    }
                })
                break;
            case (el === 'file'):
                //no listeners do nothing
                break;
        }

    })
}


//actually, we need to dynamically change which buttons are showing as soon as an item is 'selected'

export const addMenuButtonClasses = () => {
    // should just check the current context, and hide irrelevant
    // buttons
    switch (true) {
        case (currentMenuContext.length == 0): //no context remove all buttons
            menuIds.forEach(el => {
                let item = document.getElementById(el)
                item.style.display = 'none'
            })
            break;
        case (currentMenuContext[0].type == 'icon'):             // only open as we're creating a new canvas or note or displaying trash or filesystem
            {
                menuIds.forEach(el => {
                    let item = document.getElementById(el)
                    item.style.display = 'none'
                })
                const el = document.getElementById('open')
                el.style.display = 'inline-block'
                break
            }
        case (currentMenuContext[0].type == "canvas" && currentMenuContext[0].status == 'temp'):
            {

                menuIds.forEach(el => {
                    let item = document.getElementById(el)
                    item.style.display = 'none'
                })
                const el = document.getElementById(menuIds[0])
                const dropDown1 = document.getElementById('file')
                el.style.display = 'inline-block'
                dropDown1.style.display = 'inline-block'
                break
            }
        case (currentMenuContext[0].type == "note" && currentMenuContext[0].status == 'temp'):
            {

                menuIds.forEach(el => {
                    let item = document.getElementById(el)
                    item.style.display = 'none'
                })
                const el = document.getElementById(menuIds[0])
                const dropDown1 = document.getElementById('file')
                el.style.display = 'inline-block'
                dropDown1.style.display = 'inline-block'
                break
            }
        case (currentMenuContext[0].type == 'canvas' && currentMenuContext[0].status == 'saved'):
            {
                console.log(currentMenuContext, 'currentMenuContext[0]')

                menuIds.forEach(el => {
                    let item = document.getElementById(el)
                    item.style.display = 'none'
                })
                const el = document.getElementById('open')
                el.style.display = 'inline-block'
                const dropDown1 = document.getElementById('file')
                dropDown1.style.display = 'inline-block'
                const deleteEl = document.getElementById('delete')
                deleteEl.style.display = 'inline-block'
                break
            }
        case (currentMenuContext[0].type == 'note' && currentMenuContext[0].status == 'saved'):
            {
                console.log(currentMenuContext, 'currentMenuContext[0]')

                menuIds.forEach(el => {
                    let item = document.getElementById(el)
                    item.style.display = 'none'
                })
                const el = document.getElementById('open')
                el.style.display = 'inline-block'
                const dropDown1 = document.getElementById('file')
                dropDown1.style.display = 'inline-block'
                const deleteEl = document.getElementById('delete')
                deleteEl.style.display = 'inline-block'
                break
            }
        //no current context, all should be hidden
        //except for apple and special
        default:

    }
}