/*
    to-do:
        escape <, >, =, and ? in innerHTML
        tighten front-back distinguishing
*/
import BackText from            './adom/Text.mjs'
import BackDocument from        './adom/Document.mjs'
import BackElement from         './adom/Element.mjs'
let isBack=typeof window=='undefined'
let{
    Document,
    Element,
    Text,
    document,
}=isBack?{
    Document:   BackDocument,
    Element:    BackElement,
    Text:       BackText,
    document:   new BackDocument,
}:window
function generateMountData(e,doc){
    let m=new Map
    let p=[]
    function register(e){
        m.set(e,[...p])
        for(let i=0;i<e.children.length;i++){
            p.push(i)
            register(e.children[i])
            p.pop()
        }
    }
    register(e)
    let res={}
    for(let i in doc)
        res[i]=m.get(doc[i])
    return JSON.stringify(res)
}
function mount(e,doc){
    if(!doc){
        doc=e.dataset.mount
        delete e.dataset.mount
    }
    doc=JSON.parse(doc)
    for(let i in doc){
        let f=e
        for(let j of doc[i])
            f=f.children[j]
        doc[i]=f
    }
    return doc
}
function sugar(a){
    if(typeof a=='string')
        a=document.createElement(a)
    ;[...arguments].slice(1).map(b=>{
        if(typeof b=='function'){
            b(a)
        }else if(typeof b=='object'){
            if(b instanceof Array)
                a.appendChild(sugar(...b))
            else if(b instanceof Element)
                a.appendChild(b)
            else
                for(let c of Object.entries(b))
                    a.setAttribute(...c)
        }else if(typeof b=='string'){
            a.appendChild(document.createTextNode(b))
        }
    })
    return a
}
if(!isBack){
    sugar.body=function(){
        return sugar(document.body,...arguments)
    }
    sugar.head=function(){
        return sugar(document.head,...arguments)
    }
    sugar.html=function(){
        return sugar(document.html,...arguments)
    }
}
function unmount(e,doc){
    e.dataset.mount=generateMountData(e,doc)
    return e.outerHTML
}
export{
    Document,
    Element,
    Text,
    document,
    generateMountData,
    mount,
    sugar,
    unmount,
}
export default{
    Document,
    Element,
    Text,
    document,
    generateMountData,
    mount,
    sugar,
    unmount,
}
