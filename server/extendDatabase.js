let newText=require('./extendDatabase/newText')
module.exports=db=>{
    db=Object.create(db)
    db.newText=newText
    return db
}
