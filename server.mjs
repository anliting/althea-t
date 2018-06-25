import newText from         './server/newText'
import updateDatabase from  './server/updateDatabase'
import extendDatabase from  './server/extendDatabase'
import adom from            './server/adom/src/adom'
import placeholder from     './server/placeholder'
import style from           './server/style'
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
        env.headers['content-type']='text/html;charset=utf-8'
        let html
        {
            let
                $=adom.sugar,
                m={},
                div
            div=$('div',
                m.textarea=$('textarea',{placeholder}),
                m.button=$('button',{disabled:''},'Submit'),
            )
            html=adom.unmount(div,m)
        }
        return{
            status:200,
            headers:env.headers,
            content:`
<!doctype html>
<title>Text Hosting Service</title>
<meta name=viewport content='width=device-width,initial-scale=1'>
<style>${style}</style>
<body>
${html}
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
export default async function(althea){
    let db=extendDatabase(althea.database)
    althea.addQueryFunction('newText',(opt,env)=>
        newText(db,opt,env)
    )
    await updateDatabase(althea)
    althea.addPagemodule(env=>
        /^\/t($|\/)/.test(env.analyze.request.parsedUrl.pathname)
    ,pagemodule)
}
