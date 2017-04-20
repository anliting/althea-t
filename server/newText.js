module.exports=(db,opt,env)=>{
    if(!(
        typeof opt.content=='string'
    ))
        return
    return db.newText(opt.content)
}
