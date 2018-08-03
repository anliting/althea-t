import placeholder from     './ui/placeholder.mjs'
import style from           './ui/style.mjs'
import doe from             'doe'
export default{
    init(){
        let ui=this,textarea
        doe.head(doe.style(style))
        doe.body(doe.div(
            textarea=doe.textarea({placeholder}),
            doe.button('Submit',{
                async onclick(e){
                    e.stopPropagation()
                    this.disabled=true
                    location=`t/${await ui.newText(textarea.value)}`
                }
            }),
        ))
        textarea.focus()
    },
}
