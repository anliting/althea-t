import adom from './adom.mjs'
{
    let
        m={},
        $=adom.sugar
    m.div=$('div',{id:'a'},
        m.p=$('p','hello',['br']),
    )
    console.log(
        adom.unmount(m.div,m)
    )
}
