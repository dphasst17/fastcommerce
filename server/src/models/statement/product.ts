import { sql } from "kysely";
import { jsonArrayFrom, jsonObjectFrom } from "kysely/helpers/mysql";
import { db } from "models/connect";
export default class ProductStatement {
  public getColumnByType = async (typeName: string) => {
    return await db
      .selectFrom("typedetail")
      .selectAll()
      .where("type", "=", typeName)
      .orderBy("displayorder asc")
      .execute();
  };

  public findAllType = async () => {
    return await db
      .selectFrom("type")
      .select<any>((eb: any) => [
        "type.idType",
        "type.nameType",
        jsonArrayFrom(
          eb
            .selectFrom("typedetail as td")
            .select(["id", "type", "name", "datatypes", "displayname", "displayorder"])
            .whereRef("td.type", "=", "type.nameType")
            .orderBy("td.displayorder asc")
        ).as("detail"),
      ])
      .execute();
  };

  public findAll = async () => {
    return await db
      .selectFrom("products as p")
      .select<string | any>((eb: any) => [
        "p.idProduct",
        "nameProduct",
        "price",
        "imgProduct",
        "p.idType",
        "brand",
        "t.nameType",
        "p.status as action",
        sql`IF(sale.end_date >= CURDATE() AND sale.start_date <= CURDATE(), IFNULL(sd.discount, 0), 0) AS discount,SUM(CASE WHEN w.statusWare = 'import' THEN countProduct ELSE 0 END) - SUM(CASE WHEN w.statusWare = 'export' THEN countProduct ELSE 0 END) AS quantity
        `,
      ])
      .leftJoin("type as t", "p.idType", "t.idType")
      .leftJoin("warehouse as w", "p.idProduct", "w.idProduct")
      .leftJoin("saleDetail as sd", "p.idProduct", "sd.idProduct")
      .leftJoin("sale", "sd.idSale", "sale.idSale")
      .where("p.status", "=", "show")
      .groupBy("p.idProduct")
      .execute();
  };

  public findByType = async (table: string, shortKey: string, colDetail: string[]) => {
    return await db
      .selectFrom("products as p")
      .select<string | any>((eb: any) => [
        "p.idProduct",
        "nameProduct",
        "price",
        "imgProduct",
        "p.idType",
        "view",
        "brand",
        "t.nameType",
        sql`IF(sale.end_date >= CURDATE() AND sale.start_date <= CURDATE(), IFNULL(sd.discount, 0), 0) AS discount,
        SUM(CASE WHEN w.statusWare = 'import' THEN countProduct ELSE 0 END) - SUM(CASE WHEN w.statusWare = 'export' THEN countProduct ELSE 0 END) AS quantity
        `,
        jsonArrayFrom(
          eb.selectFrom(table).select(colDetail).whereRef(`${table}.idProduct`, "=", "p.idProduct").limit(1)
        ).as("detail"),
      ])
      .leftJoin("type as t", "p.idType", "t.idType")
      .leftJoin("warehouse as w", "p.idProduct", "w.idProduct")
      .leftJoin("saleDetail as sd", "p.idProduct", "sd.idProduct")
      .leftJoin("sale", "sd.idSale", "sale.idSale")
      .leftJoin(`${table} as ${shortKey}`, "p.idProduct", `${shortKey}.idProduct`)
      .where("t.nameType", "=", table)
      .where("p.status", "=", "show")
      .groupBy("p.idProduct")
      .execute();
  };

  public findDetail = async (idProduct: number, type: string, colDetail: string[]) => {
    return await db
      .selectFrom("products as p")
      .select<any>((eb: any) => [
        "p.idProduct",
        "nameProduct",
        "price",
        "imgProduct",
        "p.des",
        "p.idType",
        "brand",
        "t.nameType",
        "p.status as action",
        sql`IF(sale.end_date >= CURDATE() AND sale.start_date <= CURDATE(), IFNULL(sd.discount, 0), 0) AS discount,
        SUM(CASE WHEN w.statusWare = 'import' THEN countProduct ELSE 0 END) - SUM(CASE WHEN w.statusWare = 'export' THEN countProduct ELSE 0 END) AS quantity
        `,
        jsonArrayFrom(
          eb.selectFrom("imageProduct as i").select(["type", "img"]).whereRef(`i.idProduct`, "=", "p.idProduct")
        ).as("img"),
        jsonArrayFrom(eb.selectFrom(type).select(["id",...colDetail]).whereRef(`${type}.idProduct`, "=", "p.idProduct")).as(
          "detail"
        ),
      ])
      .leftJoin("type as t", "p.idType", "t.idType")
      .leftJoin("warehouse as w", "p.idProduct", "w.idProduct")
      .leftJoin("saleDetail as sd", "p.idProduct", "sd.idProduct")
      .leftJoin("sale", "sd.idSale", "sale.idSale")
      .where("p.idProduct", "=", idProduct)
      .execute();
  };

  public findByCondition = async (condition: "view" | "new") => {
    let orderHandle = "";
    if (condition === "view") {
      orderHandle = "view desc";
    }
    if (condition === "new") {
      orderHandle = "dateAdded desc";
    }
    return await db
      .selectFrom("products as p")
      .select<string | any>([
        "p.idProduct",
        "nameProduct",
        "price",
        "imgProduct",
        "p.idType",
        "brand",
        "t.nameType",
        sql`IF(sale.end_date >= CURDATE() AND sale.start_date <= CURDATE(), IFNULL(sd.discount, 0), 0) AS discount,
      SUM(CASE WHEN w.statusWare = 'import' THEN countProduct ELSE 0 END) - SUM(CASE WHEN w.statusWare = 'export' THEN countProduct ELSE 0 END) AS quantity
      `,
      ])
      .leftJoin("type as t", "p.idType", "t.idType")
      .leftJoin("warehouse as w", "p.idProduct", "w.idProduct")
      .leftJoin("saleDetail as sd", "p.idProduct", "sd.idProduct")
      .leftJoin("sale", "sd.idSale", "sale.idSale")
      .groupBy("p.idProduct")
      .orderBy(orderHandle)
      .limit(10)
      .execute();
  };

  public findByKey = async (keyword: string) => {
    return await db
      .selectFrom("products as p")
      .select<string | any>([
        "p.idProduct",
        "nameProduct",
        "price",
        "imgProduct",
        "p.idType",
        "brand",
        "t.nameType",
        sql`IF(sale.end_date >= CURDATE() AND sale.start_date <= CURDATE(), IFNULL(sd.discount, 0), 0) AS discount,
    SUM(CASE WHEN w.statusWare = 'import' THEN countProduct ELSE 0 END) - SUM(CASE WHEN w.statusWare = 'export' THEN countProduct ELSE 0 END) AS quantity
    `,
      ])
      .leftJoin("type as t", "p.idType", "t.idType")
      .leftJoin("warehouse as w", "p.idProduct", "w.idProduct")
      .leftJoin("saleDetail as sd", "p.idProduct", "sd.idProduct")
      .leftJoin("sale", "sd.idSale", "sale.idSale")
      .where((eb: any) =>
        eb("nameProduct", "like", `%${keyword}%`)
          .or("brand", "like", `%${keyword}%`)
          .or("t.nameType", "like", `%${keyword}%`)
      )
      .groupBy("p.idProduct")
      .execute();
  };

  public findAllSaleEvent = async () => {
    return await db.selectFrom("sale").selectAll("sale").execute();
  };
  public findSale = async (date: string) => {
    return db
    .selectFrom("sale")
    .select<string | any>((eb: any) => [
      "sale.idSale",
      "sale.start_date",
      "sale.end_date",
      "sale.title",
      jsonArrayFrom(
        eb
          .selectFrom("saleDetail as sd")
          .select((s: any) => [
            "sd.id",
            "sd.idProduct",
            "sd.discount",
            "p.nameProduct",
            "p.price",
            "p.imgProduct",
            "type.nameType",
            "p.brand"
          ])
          .leftJoin("products as p", "p.idProduct", "sd.idProduct")
          .leftJoin("type", "p.idType", "type.idType")
          .whereRef("sd.idSale", "=", "sale.idSale")
      ).as("detail"),
    ])
    .where((eb: any) => eb("sale.start_date", "<=", date).or("sale.end_date", ">=", date))
      .execute();
  };

  public findSaleDetail = async (idSale: number) => {
    return await db
      .selectFrom("sale")
      .select<string | any>((eb: any) => [
        "sale.idSale",
        "sale.start_date",
        "sale.end_date",
        "sale.title",
        jsonArrayFrom(
          eb
            .selectFrom("saleDetail as sd")
            .select(["sd.id", "sd.idSale", "sd.idProduct", "sd.discount"])
            .whereRef("sd.idSale", "=", "sale.idSale")
        ).as("detail"),
      ])
      .where("sale.idSale", "=", idSale)
      .execute();
  };
}
