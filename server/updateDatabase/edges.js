module.exports={
    0:async db=>{
        await db.query(`
            create table text (
                id int not null auto_increment,
                content text not null,
                primary key (id)
            )
        `)
        return 1
    },
}
