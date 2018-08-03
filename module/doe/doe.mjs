function doe(n){
    let p={
        function:f=>f(n),
        object,
        string,
    }
    for(let a of[...arguments].slice(1))
        p[typeof a](a)
    return n
    function object(o){
        if(o instanceof Node)
            n.appendChild(o)
        else
            Object.assign(n,o)
    }
    function string(s){
        n.appendChild(document.createTextNode(s))
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
}
export default new Proxy(doe,{
    get:(t,p)=>methods[p]||function(){
        return doe(document.createElement(p),...arguments)
    }
})
