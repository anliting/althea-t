import newText from './extendDatabase/newText'
export default db=>{
    db=Object.create(db)
    db.newText=newText
    return db
}
