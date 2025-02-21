import { sql } from "kysely"
import { jsonArrayFrom, jsonObjectFrom } from "kysely/helpers/mysql"
import { db } from "models/connect"

export default class StatisticalStatement {
    public product = async () => {
        return await db.selectFrom("products")
        .select((eb:any) => [
            eb.fn.count("idProduct").as("total"),
            jsonArrayFrom(
                eb.selectFrom("products as p")
                .select([
                    "p.nameProduct","p.price","p.imgProduct","p.view"
                ])
                .orderBy("p.view","desc")
                .limit(6)
            ).as("view"),
            jsonArrayFrom(
                eb.selectFrom("order_Detail as od")
                .select([
                    "od.idOrdDetail","od.idProduct","p.nameProduct","p.price","p.imgProduct",
                    eb.fn.sum("od.countProduct").as("total_count")
                ])
                .innerJoin("products as p","p.idProduct","od.idProduct")
                .groupBy("od.idProduct")
                .orderBy("total_count","desc")
                .limit(6)
            ).as("sold")
        ])
        .execute()
    }
    public user = async () => {
        return await db.selectFrom("users")
            .select((eb: any) => [
                eb.fn.count("idUser").as("total_user"),
                jsonObjectFrom(eb.selectFrom("users")
                    .select((ud: any) => [ud.fn.count("idUser").as("count"), sql<string>`DATE_FORMAT(CURDATE(), '%Y-%m')`.as("month")])
                    .where(sql<string>`DATE_FORMAT(created_at, '%Y-%m')`, "like", sql<string>`DATE_FORMAT(CURDATE(), '%Y-%m')`)
                ).as("current_month"),
                jsonObjectFrom(
                    eb.selectFrom("users")
                    .select((ud: any) => [ud.fn.count("idUser").as("count"), sql<string>`DATE_FORMAT(DATE_SUB(CURDATE(),INTERVAL 1 MONTH), '%Y-%m')`.as("month")])
                    .where(sql<string>`DATE_FORMAT(created_at, '%Y-%m')`, "like", sql<string>`DATE_FORMAT(DATE_SUB(CURDATE(),INTERVAL 1 MONTH), '%Y-%m')`)
                ).as("last_month")
            ])
            .execute()
    }
    public order = async () => { 
        
    }
    public revenue = async () => {
        return await db.selectFrom("order_Detail as od")
            .select<any>([
                sql<number>`SUM(od.countProduct * p.price) AS total`,
                sql<string>`DATE_FORMAT(o.edd, '%Y-%m') AS month`
            ])
            .innerJoin("order as o", "o.idOrder", "od.idOrder")
            .innerJoin("products as p", "p.idProduct", "od.idProduct")
            .groupBy("month")
            .orderBy("month", "desc")
            .execute()
    }
}