import { db } from "models/connect"

export default class WarehouseStatement {
    public getAll = async() => {
        console.log(db.selectFrom("warehouse")
        .selectAll()
        .orderBy("dateIOX desc")
        .orderBy("id asc").compile())
        return await db.selectFrom("warehouse")
        .selectAll()
        .orderBy("dateIOX desc")
        .orderBy("id desc")
        .execute()
    }
}