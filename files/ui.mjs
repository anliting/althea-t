import placeholder from     './ui/placeholder.mjs'
import style from           './ui/style.mjs'
import adom from            './adom.static.mjs'
let $=adom.sugar
export default{
    init(){
        let ui=this,textarea
        $.head(['style',style])
        $.body(['div',
            textarea=$('textarea',{placeholder}),
            ['button',{disabled:''},'Submit',1,{
                disabled:false,
                async onclick(e){
                    e.stopPropagation()
                    this.disabled=true
                    location=`t/${await ui.newText(textarea.value)}`
                }
            }],
        ])
        textarea.focus()
    },
}
