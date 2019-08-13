import newText from         './server/newText.mjs'
import updateDatabase from  './server/updateDatabase.mjs'
import extendDatabase from  './server/extendDatabase.mjs'
function pagemodule(env){
    if(!env.althea.allowOrigin(env.envVars,env.request.headers.origin))
        return 403
    if(env.request.method=='GET')
        return get(env)
    env.headers.allow='GET'
    return{
        status:405,
        headers:env.headers,
    }
}
async function get(env){
    let path=env.analyze.request.parsedUrl.pathname.split('/')
    if(path.length<3){
        let ua=env.library.userAgent
        if(!ua.leOr(
            ua.version.esModuleBase,
            ua.parse(env.request.headers['user-agent'])
        ))
            return ua.notSupport(ua.version.esModuleBase)
        env.headers['content-type']='text/html;charset=utf-8'
        return{
            status:200,
            headers:env.headers,
            content:`
<!doctype html>
<title>Text Hosting Service</title>
<meta name=viewport content='width=device-width,initial-scale=1'>
<body>
${env.althea.loadModule('plugins/t/main.mjs')}
`
        }
    }
    let id
    try{
        id=parseInt(path[2],10)
    }catch(e){
        return 400
    }
    if(!Number.isFinite(id))
        return 400
    let res=(await env.database.pool.query(`
        select
            content
        from text
        where ?
    `,{id}))[0][0]
    if(res==undefined)
        return 404
    env.headers['content-type']='text/plain;charset=utf-8'
    return{
        status:200,
        headers:env.headers,
        content:res.content,
    }
}
function Plugin(althea){
    ;(async()=>{
        let db=extendDatabase(althea.database)
        althea.addQueryFunction('newText',(opt,env)=>
            newText(db,opt,env)
        )
        await updateDatabase(althea)
        althea.addPagemodule(env=>
            /^\/t($|\/)/.test(env.analyze.request.parsedUrl.pathname)
        ,pagemodule)
    })()
}
Plugin.prototype.end=function(){
}
Plugin.prototype.shutdownEnd=function(){
}
export default Plugin
