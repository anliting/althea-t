import{
    Site,
    general,
}from'/lib/core.static.js'
import adom from'./adom.static.mjs'
import ui from'./ui.mjs'
general()
let site=new Site
ui.newText=content=>site.send({
    function:'newText',
    content,
})
ui.mount=adom.mount(document.body.firstElementChild)
ui.front()
