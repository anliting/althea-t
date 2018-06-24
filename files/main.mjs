import{
    Site,
    general,
}from'/lib/core.static.js'
import dom from'https://cdn.rawgit.com/anliting/dom/de2a72a375ad7ac7bd9584f553dae770c0cf12d4/src/dom.mjs'
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
