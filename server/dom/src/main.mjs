import dom from './dom.mjs'
{
    let
        m={},
        $=dom.sugar
    m.div=$('div',{id:'a'},
        m.p=$('p','hello',['br']),
    )
    m.div.dataset.mount=dom.unmount(m.div,m)
    console.log(
        m.div.outerHTML
    )
}
