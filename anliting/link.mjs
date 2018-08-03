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
                moduleDirectory:'module'
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
link(`src/main.mjs`,`files/main.mjs`)
