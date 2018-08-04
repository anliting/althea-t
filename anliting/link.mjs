import rollup from      'rollup'
import resolve from     'rollup-plugin-node-resolve'
let
    skip=[
        '/lib/core.static.js'
    ]
async function link(input,file){
    let bundle=await rollup.rollup({
        input,
        plugins:[resolve({
            customResolveOptions:{
                moduleDirectory:'node_modules'
            },
        })],
        external:s=>skip.includes(s),
    })
    await bundle.write({
        file,
        format:'es',
        paths:s=>skip.includes(s)&&s,
    })
}
link(`althea-t/src/main.mjs`,`althea-t/files/main.mjs`)
