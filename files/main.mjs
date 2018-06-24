import style from './style.mjs'
import placeholder from './placeholder.mjs'
import{
    Site,
    general,
}from'/lib/core.static.js'
//import dom from'https://cdn.rawgit.com/anliting/dom/de2a72a375ad7ac7bd9584f553dae770c0cf12d4/src/dom.mjs'
import dom from'/dom/src/dom.mjs'
let
    $=dom.sugar
let html,mountData
{
    let
        textarea,
        button,
        div
    div=$('div',{id:'main'},
        textarea=$('textarea',{placeholder}),
        button=$('button','Submit'),
    )
    html=div.outerHTML
    mountData=dom.unmount(div,{
        button,
        div,
        textarea
    })
}
$.body().innerHTML=html
let{button,div,textarea}=dom.mount(
    document.getElementById('main'),mountData
)
let
    site=new Site
general()
$.head(['style',style])
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
