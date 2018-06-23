import style from './style.js'
import placeholder from './placeholder.js'
import{
    Site,
    general,
}from'/lib/core.static.js'
import dom from'https://cdn.rawgit.com/anliting/dom/de2a72a375ad7ac7bd9584f553dae770c0cf12d4/src/dom.mjs'
let
    site=new Site,
    $=dom.sugar,
    textarea
general()
$.head(['style',style])
$.body(['div',
    textarea=$('textarea',{placeholder}),
    ['button','Submit',n=>{n.onclick=async e=>{
        e.stopPropagation()
        n.disabled=true
        let id=await site.send({
            function:'newText',
            content:textarea.value,
        })
        location=`t/${id}`
    }}],
])
textarea.focus()
