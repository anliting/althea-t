import Text from './Text.mjs'
import Element from './Element.mjs'
function Document(){
}
Document.prototype.createElement=function(tagName){
    let res=new Element
    res._tagName=tagName
    return res
}
Document.prototype.createTextNode=function(text){
    return Object.assign(new Text,{
        _text:text
    })
}
export default Document
