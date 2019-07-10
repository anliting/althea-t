import newText from './extendDatabase/newText.mjs'
export default db=>{
    db=Object.create(db)
    db.newText=newText
    return db
}
