import { jsonArrayFrom } from "kysely/helpers/mysql";
import { db } from "models/connect";

export default class OrderStatement {
  public getAllOrder = async () => {};
  public getOrderByUser = async (idUser: string) => {
    return await db
      .selectFrom("order as t")
      .select<any>((eb: any) => [
        "t.idOrder",
        "idShipper",
        "idUser",
        "fullName",
        "phone",
        "address",
        "method",
        "costs",
        "edd",
        "paymentStatus",
        "orderStatus",
        jsonArrayFrom(
          eb
            .selectFrom("order_Detail as td")
            .select((c:any) => [
                "idOrdDetail", "td.idProduct", "countProduct", "discount",
                "p.nameProduct","p.price","p.imgProduct"
            ])
            .innerJoin("products as p","p.idProduct","td.idProduct")
            .whereRef("td.idOrder", "=", "t.idOrder")
        ).as("detail")
      ])
      .where("idUser", "=", `${idUser}`)
      .execute();
  };
  public getPurchaseOrderByUser = async(idUser:string) => {
    return await db.selectFrom("order")
    .select(["order.idOrder","od.idProduct","p.nameProduct","p.imgProduct","p.price","od.countProduct","od.discount"])
    .innerJoin("order_Detail as od","order.idOrder","od.idOrder")
    .leftJoin("products as p","p.idProduct","od.idProduct")
    .where("order.idUser","=",idUser)
    .where("order.orderStatus","=","success")
    .execute()
  }
  public getOrderdetail = async (idOrder:string) => {

  };
}
