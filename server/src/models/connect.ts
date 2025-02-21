import mysql2 from "mysql2";
import type{ Database } from "./types";
import { Kysely, MysqlDialect } from "kysely";

let pool = mysql2.createPool({
    connectionLimit : 15,
    host :process.env.HOST_SQL,
    user:process.env.USER_SQL,
    password:process.env.PASSWORD_SQL,
    database:process.env.DB_SQL,
    port:Number(process.env.PORT_SQL)
});
export const db = new Kysely<Database>({dialect: new MysqlDialect({pool})})