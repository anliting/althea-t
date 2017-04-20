module.exports=function(content){
    return this.query0(`
        insert into text
        set ?
    `,{content}).then(a=>a.insertId)
}
