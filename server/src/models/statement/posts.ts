import { db } from "models/connect"

export default class PostStatement{
    public getAll = async() => {
        return await db.selectFrom("posts as p")
        .select(["idPost","p.idType","t.nameType","dateAdded","p.title","p.thumbnails","poster"])
        .innerJoin("typePost as t","p.idType","t.idType")
        .orderBy("dateAdded desc")
        .execute()
    }
    public getCategory = async() => {
        return await db.selectFrom("typePost")
        .selectAll()
        .execute()
    }
    public getDetail = async(id:number) => {
        return await db.selectFrom("posts as p")
        .innerJoin("typePost as t","p.idType","t.idType")
        .select(["idPost","p.idType","t.nameType","dateAdded","p.title","p.thumbnails","valuesPosts","poster"])
        .where("idPost","=",id)
        .execute()
    }
}