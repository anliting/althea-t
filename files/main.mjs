import{
    Site,
    general,
}from'/lib/core.static.js'
import dom from'https://cdn.rawgit.com/anliting/dom/fc98e65ef90d9eeaf724da2339f3dff37a88d14c/src/dom.mjs'
let
    {button,div,textarea}=dom.mount(
        document.getElementById('main'),
        decodeURIComponent(document.getElementById('mountData').innerHTML),
    ),
    site=new Site
general()
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
