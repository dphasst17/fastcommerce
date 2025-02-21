import { sql } from "kysely";
import { jsonArrayFrom, jsonObjectFrom } from "kysely/helpers/mysql";
import { db } from "models/connect";

export default class UserStatement {
  public getUser = async (idUser: string) => {
    return await db
      .selectFrom("users")
      .select<any>((eb: any) => [
        "idUser",
        "nameUser",
        "phone",
        "email",
        jsonArrayFrom(
          eb.selectFrom("carts")
            .select((c: any) => [
              "idCart",
              "idProduct",
              "countProduct",
              jsonArrayFrom(
                c
                  .selectFrom("products as p")
                  .select([
                    "nameProduct",
                    "imgProduct",
                    "price",
                    sql`IF(sale.end_date >= CURDATE() AND sale.start_date <= CURDATE(), IFNULL(sd.discount, 0), 0)`.as(
                      "discount"
                    ),
                  ])
                  .leftJoin("saleDetail as sd", "p.idProduct", "sd.idProduct")
                  .leftJoin("sale", "sd.idSale", "sale.idSale")
                  .whereRef("carts.idProduct", "=", "p.idProduct")
              ).as("detail"),
            ])
            .where("carts.idUser", "=", idUser)
        ).as("cart"),
        jsonArrayFrom(
          eb
            .selectFrom("userAddress as ua")
            .select(["ua.idAddress", "ua.typeAddress as type", "ua.detail"])
            .whereRef("ua.idUser", "=", "users.idUser")
        ).as("address"),
      ])
      .where("users.idUser", "=", `${idUser}`)
      .execute();
  };

  public adminGetInfo = async (idStaff: string) => {
    return await db
      .selectFrom("staff")
      .select(["staff.idStaff", "name", "phone", "email", "birthday", "address", "avatar", "created_at", "updated_at"])
      .where("staff.idStaff", "=", idStaff)
      .execute();
  }
  //#create public function get all user
  public getAllUser = async () => {
    return await db
      .selectFrom("users")
      .select<any>(["users.idUser", "nameUser", "phone", "email", "created_at", "updated_at","auth.action"])
      .leftJoin("auth", "users.idUser", "auth.idUser")
      .where("auth.role", "=", 2)
      .execute();
  }
  public getAllStaff = async () => {
    return await db
      .selectFrom("staff")
      .select<any>([
        "staff.idStaff",
        "name",
        "phone",
        "email",
        "birthday",
        "address",
        "avatar",
        "created_at",
        "updated_at",
        "position.position_name",
        "position.position_id",
        "auth.action"
      ])
      .leftJoin("auth", "staff.idStaff", "auth.idUser")
      .leftJoin("position", "staff.idStaff", "position.idStaff")
      .where("auth.role", "=", 1)
      .execute();
  }
  public getAllAddress = async () => {
    return await db
      .selectFrom("userAddress")
      .select<any>([
        "userAddress.idAddress", "userAddress.idUser", "userAddress.typeAddress", "userAddress.detail","users.nameUser"
      ])
      .leftJoin("users", "userAddress.idUser", "users.idUser")
      .execute();
  }
}
