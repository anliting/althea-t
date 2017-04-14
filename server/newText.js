module.exports=function(args,env){
    if(!(
        typeof args.content=='string'
    ))
        return
    return env.althea.database.newText(args.content)
}
