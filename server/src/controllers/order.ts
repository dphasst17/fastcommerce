import type { Request, Response } from "express";
import Statements, { type ConditionType } from "models/statement/statement";
import OrderStatement from "models/statement/order";
import type { RequestCustom } from "types/types";
import { responseData, responseMessage, responseMessageData } from "utils/response";
import { convertData, handleFindData } from "utils/utils";
import crypto from "crypto";
import { sql } from "kysely";
import { db } from "models/connect";

const order = new OrderStatement();
const statement = new Statements();
let dateObj = new Date();
let month = dateObj.getUTCMonth() + 1;
let year = dateObj.getUTCFullYear();
const randomText = (length: number) => {
  return crypto.randomBytes(length).toString("hex");
};
export default class OrderController {
  public getAll = async () => { };
  public getByUser = async (request: Request, res: Response) => {
    const req = request as RequestCustom;
    const idUser = req.idUser;
    handleFindData(res, order.getOrderByUser(idUser));
  };
  public insertOrder = async (request: Request, res: Response) => {
    const req = request as RequestCustom;
    const idUser = req.idUser;
    const data = req.body;
    const idOrder = `${idUser}${month}${year}-${randomText(4)}`;
    const addData = data.order.map((c: any) => {
      return {
        ...c,
        idOrder: idOrder,
        idUser: idUser,
      };
    });
    const insertData = await db.transaction().execute(async (trx) => {
      const formatData = convertData(addData)
      const insert = await statement.insertData("ord", formatData)
      const setFk = sql`SET FOREIGN_KEY_CHECKS=0`.execute(trx);
      const tableInsert = "ordDetail";
      const colInsert = ["idOrder", "idProduct", "countProduct", "discount"]
      const tableSelect = "carts"
      const colSelect = [
        sql`${idOrder}`,
        "carts.idProduct",
        "carts.countProduct",
        sql`IF(sale.end_date >= CURDATE() AND sale.start_date <= CURDATE(), IFNULL(sd.discount, 0), 0)`.as("discount")
      ]
      const conditionDetail: ConditionType = {
        conditionName: "carts.idCart",
        conditionMethod: "in",
        value: data.listId
      }
      const join = [
        {
          table: "products as p",
          key1: "p.idProduct",
          key2: "carts.idProduct"
        },
        {
          table: "saleDetail as sd",
          key1: "p.idProduct",
          key2: "sd.idProduct"
        },
        {
          table: "sale",
          key1: "sd.idSale",
          key2: "sale.idSale"
        }
      ]
      const insertDetail = await statement.insertSubQuery(tableInsert, colInsert, tableSelect, colSelect, conditionDetail, join)
      const rmFk = sql`SET FOREIGN_KEY_CHECKS=1`.execute(trx);
      return { insert, setFk, insertDetail, rmFk };
    });
    if (!insertData.insertDetail[0].insertId) {
      return responseMessage(res, 401, "Order failed");
    }
    responseMessage(res, 201, "Order success");
  };
  public insertPayment = async (request: Request, res: Response) => {
    const req = request as RequestCustom
    const idUser = req.idUser
    const data = req.body
    const appendId = data.map((d: any) => {
      return {
        ...d,
        idUser: idUser
      }
    })
    const dataInsert = convertData(appendId)
    try {
      const insert = await statement.insertData("payment", dataInsert)
      if (!insert) {
        return responseMessage(res, 401, "Insert payment is unsuccessful")
      }
      responseMessage(res, 201, "Insert payment is success")
    }
    catch {
      (errors: any) => {
        responseMessageData(res, 500, "Server errors", errors);
      };
    }
  };
  public updateOrder = async (req: Request, res: Response) => {
    const data = req.body;
    const valueUpdate = {
      nameCol: "status",
      value: data.status,
    };
    const condition: ConditionType = {
      conditionName: "idTrans",
      conditionMethod: "=",
      value: data.id,
    };
    try {
      const updateStatus = await statement.updateDataByCondition("ord", [valueUpdate], condition);
      if (!updateStatus) {
        return responseMessage(res, 401, "Status update failed");
      }
      if (data.status === "Thành công" || data.status === "Thất bại") {
        const colInsertDetail = ["idOrder", "idProduct", "countProduct", "discount"];
        const tableSelect = "ord";
        const tableSelectDetail = "ordDetail";
        const colSelectDetail = ["idTrans", "idProduct", "countProduct", "discount"]
        const condition: ConditionType = {
          conditionName: "idTrans",
          conditionMethod: "=",
          value: data.id,
        };
        if (data.status === "Thành công") {
          const tableInsert = "ords";
          const tableInsertDetail = "ordsDetail";
          const colInsert = ["idBill", "idUser", "idShipper", "infoOrder", "costs", "dateBuy"]
          const colSelect = [
            "idTrans",
            "idUser",
            "idShipper",
            sql`CONCAT('name:',fullName,' - phone: ',phone,' - address: ',address)`.as("infoOrder"),
            "costs",
            sql`${new Date().toISOString().split("T")[0]}`.as("dateBuy"),
          ];
          await statement.insertSubQuery(tableInsert, colInsert, tableSelect, colSelect, condition);
          await statement.insertSubQuery(tableInsertDetail, colInsertDetail, tableSelectDetail, colSelectDetail, condition);
        }
        if (data.status === "Thất bại") {
          const tableInsert = "ordf";
          const tableInsertDetail = "ordfDetail";
          const colInsert = ["idFail", "idUser", "infoOrder", "note"]
          const colSelect = [
            "idTrans",
            "idUser",
            sql`CONCAT('name:',fullName,' - phone: ',phone,' - address: ',address)`.as("infoOrder"),
            sql`${data.note ? data.note : ""}`.as("note"),
          ];
          const insertOrderF = await statement.insertSubQuery(tableInsert, colInsert, tableSelect, colSelect, condition);
          const insertOrderFDetail = await statement.insertSubQuery(tableInsertDetail, colInsertDetail, tableSelectDetail, colSelectDetail, condition);
        }
        sql`SET FOREIGN_KEY_CHECKS=0`.execute(db);
        await statement.removeData("ordDetail", condition)
        await statement.removeData("ord", condition)
        sql`SET FOREIGN_KEY_CHECKS=1`.execute(db);
      }
      responseMessage(res, 200, "Update status success");
    } catch {
      (errors: any) => {
        responseMessageData(res, 500, "Server errors", errors);
      };
    }
  };
  public getPurchaseOrderByUser = async (request: Request, res: Response) => {
    const req = request as RequestCustom;
    const idUser = req.idUser
    handleFindData(res, order.getPurchaseOrderByUser(idUser))
  }
}
