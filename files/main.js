import style from './style.js'
import placeholder from './placeholder.js'
import{
    Site,
    dom,
    general,
}from'/lib/core.static.js'
let
    site=new Site,
    textarea
general()
dom.head(dom.style(style))
dom.body(dom.div(
    textarea=dom.textarea({placeholder}),
    dom.button('Submit',{async onclick(e){
        e.stopPropagation()
        this.disabled=true
        let id=await site.send({
            function:'newText',
            content:textarea.value,
        })
        location=`t/${id}`
    }})
))
textarea.focus()
