import placeholder from     './ui/placeholder.mjs'
import style from           './ui/style.mjs'
import adom from            './adom.static.mjs'
let $=adom.sugar
export default{
    back(){
        this.mount={}
        this.node=$('div',
            this.mount.textarea=$('textarea',{placeholder}),
            this.mount.button=$('button',{disabled:''},'Submit'),
        )
    },
    front(){
        let{button,textarea}=this.mount
        $(button,1,{
            disabled:false,
            async onclick(e){
                e.stopPropagation()
                this.disabled=true
                location=`t/${await this.newText(textarea.value)}`
            }
        })
        textarea.focus()
    },
    style,
}
