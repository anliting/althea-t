module.styleByPath('plugins/althea-t/main.css')
module.importByPath('lib/general.js',{mode:1}).then(repository=>{
    module.repository=repository
    let view=createView()
    document.body.appendChild(view.div)
    view.textarea.focus()
})
function createView(){
    let res={}
    let
        div=document.createElement('div')
        textarea=createTextarea(),
        button=createSubmit()
    button.addEventListener('click',e=>{
        e.stopPropagation()
        button.disabled=true
        module.repository.althea.site.then(site=>
            site.send({
                function:'newText',
                content:textarea.value,
            })
        ).then(id=>{
            location=`t/${id}`
        })
    })
    div.appendChild(textarea)
    div.appendChild(button)
    return{
        div,
        textarea
    }
}
function createTextarea(){
    let textarea=document.createElement('textarea')
    textarea.placeholder=`
     This is a text hosting service.

     Note that the uploaded text is not guaranteed to be kept forever, and it is possible to be deleted at any time, without any notification.

     Share the unused resources of my web server.

     Keep it simple, stupid.

     An-Li Ting 2016-10-07
`
    return textarea
}
function createSubmit(){
    let button=document.createElement('button')
    button.textContent='Submit'
    return button
}
