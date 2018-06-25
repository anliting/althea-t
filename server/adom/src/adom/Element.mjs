let voidElements=[
    // https://www.w3.org/TR/html5/syntax.html#void-elements
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr',
]
function Element(){
    /*
        _attribute
        _child
        _tagName
        dataset
    */
    this._attribute={}
    this._child=[]
    this.dataset={}
}
Element.prototype.appendChild=function(e){
    this._child.push(e)
}
Object.defineProperty(Element.prototype,'children',{get(){
    return this._child.filter(a=>a instanceof Element)
}})
Element.prototype.getAttribute=function(name){
    return this._attribute[name]
}
Object.defineProperty(Element.prototype,'innerHTML',{get(){
    return this._child.map(
        a=>a instanceof Element?
            a.outerHTML
        :
            a._text
    ).join('')
}})
Object.defineProperty(Element.prototype,'outerHTML',{get(){
    return voidElements.includes(this._tagName)?
        `<${this._tagName}>`
    :
        `<${this._tagName}${
            [
                ...Object.entries(this._attribute),
                ...Object.entries(this.dataset).map(([k,v])=>
                    [`data-${k}`,v]
                ),
            ].map(([k,v])=>
                ` ${k}="${v.replace(/"/g,'&quot;')}"`
            ).join('')
        }>${
            this.innerHTML
        }</${this._tagName}>`
}})
Element.prototype.removeAttribute=function(name){
    delete this._attribute[name]
}
Element.prototype.setAttribute=function(name,value){
    this._attribute[name]=value
}
export default Element
