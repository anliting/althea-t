import{
    Site,
    general,
}from'/lib/core.static.js'
import adom from'https://cdn.rawgit.com/anliting/adom/eefb34574b6316a59987b25853f48d4bab8cabeb/src/adom.static.mjs'
let
    {button,textarea}=adom.mount(document.body.firstElementChild),
    site=new Site
general()
button.disabled=false
button.onclick=async e=>{
    e.stopPropagation()
    button.disabled=true
    let id=await site.send({
        function:'newText',
        content:textarea.value,
    })
    location=`t/${id}`
}
textarea.focus()
