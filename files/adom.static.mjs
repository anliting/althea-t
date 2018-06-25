function Text(){
    /*
        _text
    */
}

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
];
function Element(){
    /*
        _attribute
        _child
        _tagName
        dataset
    */
    this._attribute={};
    this._child=[];
    this.dataset={};
}
Element.prototype.appendChild=function(e){
    this._child.push(e);
};
Object.defineProperty(Element.prototype,'children',{get(){
    return this._child.filter(a=>a instanceof Element)
}});
Element.prototype.getAttribute=function(name){
    return this._attribute[name]
};
Object.defineProperty(Element.prototype,'innerHTML',{get(){
    return this._child.map(
        a=>a instanceof Element?
            a.outerHTML
        :
            a._text
    ).join('')
}});
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
}});
Element.prototype.removeAttribute=function(name){
    delete this._attribute[name];
};
Element.prototype.setAttribute=function(name,value){
    this._attribute[name]=value;
};

function Document(){
}
Document.prototype.createElement=function(tagName){
    let res=new Element;
    res._tagName=tagName;
    return res
};
Document.prototype.createTextNode=function(text){
    return Object.assign(new Text,{
        _text:text
    })
};

/*
    to-do:
        escape <, >, =, and ? in innerHTML
        tighten front-back distinguishing
*/
let isBack=typeof window=='undefined';
let{
    Document: Document$1,
    Element: Element$1,
    Text: Text$1,
    document,
}=isBack?{
    Document:   Document,
    Element:    Element,
    Text:       Text,
    document:   new Document,
}:window;
function generateMountData(e,doc){
    let m=new Map;
    let p=[];
    function register(e){
        m.set(e,[...p]);
        for(let i=0;i<e.children.length;i++){
            p.push(i);
            register(e.children[i]);
            p.pop();
        }
    }
    register(e);
    let res={};
    for(let i in doc)
        res[i]=m.get(doc[i]);
    return JSON.stringify(res)
}
function mount(e,doc){
    if(!doc){
        doc=e.dataset.mount;
        delete e.dataset.mount;
    }
    doc=JSON.parse(doc);
    for(let i in doc){
        let f=e;
        for(let j of doc[i])
            f=f.children[j];
        doc[i]=f;
    }
    return doc
}
function sugar(a){
    if(typeof a=='string')
        a=document.createElement(a);
    let mode=0
    ;[...arguments].slice(1).map(b=>{
        if(typeof b=='function'){
            b(a);
        }else if(typeof b=='number'){
            mode=b;
        }else if(typeof b=='object'){
            if(b instanceof Element$1)
                a.appendChild(b);
            else{
                if(mode==0)
                    for(let c of Object.entries(b))
                        a.setAttribute(...c);
                else if(mode==1)
                    Object.assign(a,b);
            }
        }else if(typeof b=='string'){
            a.appendChild(document.createTextNode(b));
        }
    });
    return a
}
if(!isBack){
    sugar.body=function(){
        return sugar(document.body,...arguments)
    };
    sugar.head=function(){
        return sugar(document.head,...arguments)
    };
    sugar.html=function(){
        return sugar(document.html,...arguments)
    };
}
function unmount(e,doc){
    e.dataset.mount=generateMountData(e,doc);
    return e.outerHTML
}
var adom = {
    Document: Document$1,
    Element: Element$1,
    Text: Text$1,
    document,
    generateMountData,
    mount,
    sugar,
    unmount,
}

export default adom;
export { Document$1 as Document, Element$1 as Element, Text$1 as Text, document, generateMountData, mount, sugar, unmount };
