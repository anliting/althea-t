import { Site, general } from '/lib/core.static.js';

var placeholder = `This is a text hosting service.

Note that the uploaded text is not guaranteed to be kept forever, and it is possible to be deleted at any time, without any notification.

Share the unused resources of my web server.

Keep it simple, stupid.

An-Li Ting 2016-10-07
`

var style = `textarea{
    width:calc(100% - 6px);
    height:320px;
}
`

function doe(n){
    let p={
        function:f=>f(n),
        object,
        string,
    };
    for(let a of[...arguments].slice(1))
        p[typeof a](a);
    return n
    function object(o){
        if(o instanceof Node)
            n.appendChild(o);
        else
            Object.assign(n,o);
    }
    function string(s){
        n.appendChild(document.createTextNode(s));
    }
}
let methods={
    html(){
        return doe(document.documentElement,...arguments)
    },
    head(){
        return doe(document.head,...arguments)
    },
    body(){
        return doe(document.body,...arguments)
    },
};
var doe$1 = new Proxy(doe,{
    get:(t,p)=>methods[p]||function(){
        return doe(document.createElement(p),...arguments)
    }
})

var ui = {
    init(){
        let ui=this,textarea;
        doe$1.head(doe$1.style(style));
        doe$1.body(doe$1.div(
            textarea=doe$1.textarea({placeholder}),
            doe$1.button('Submit',{
                async onclick(e){
                    e.stopPropagation();
                    this.disabled=true;
                    location=`t/${await ui.newText(textarea.value)}`;
                }
            }),
        ));
        textarea.focus();
    },
}

general();
let site=new Site;
ui.newText=content=>site.send({
    function:'newText',
    content,
});
ui.init();
