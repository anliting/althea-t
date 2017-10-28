(async()=>{
    let
        main=           module.style('main.css'),
        placeholder=    module.get('placeholder')
    ;(await module.moduleByPath('/lib/general.mjs'))()
    let
        {
            Site,
            dom,
        }=await module.moduleByPath('/lib/core.static.js'),
        site=new Site
    let textarea=dom('textarea',async textarea=>{
        textarea.placeholder=await placeholder
    })
    document.head.appendChild(await main)
    document.body.appendChild(dom('div',_=>{
        let button=dom('button','Submit')
        button.onclick=async e=>{
            e.stopPropagation()
            button.disabled=true
            site=await site
            let id=await site.send({
                function:'newText',
                content:textarea.value,
            })
            location=`t/${id}`
        }
        return[textarea,button]
    }))
    textarea.focus()
})()
