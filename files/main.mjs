import{
    Site,
    general,
}from'/lib/core.static.js'
import ui from'./ui.mjs'
general()
let site=new Site
ui.newText=content=>site.send({
    function:'newText',
    content,
})
ui.init()
