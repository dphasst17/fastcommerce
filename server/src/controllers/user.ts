import type { Request, Response } from "express";
import type { RequestCustom } from "types/types";
import UserStatement from "models/statement/user";
import Statements, { type ConditionType } from "models/statement/statement";
import { responseData, responseMessage, responseMessageData } from "utils/response";
import { convertData, handleFindData } from "utils/utils";
import { db } from "models/connect";

const userStatement = new UserStatement();
const statement = new Statements();
export default class UserController {
  public getUser = async (request: Request, res: Response) => {
    const req = request as RequestCustom;
    const idUser = req.idUser;
    handleFindData(res, userStatement.getUser(idUser))
  };
  public adminGetInfo = async (request: Request, res: Response) => {
    const req = request as RequestCustom;
    const idUser = req.idUser;
    handleFindData(res, userStatement.adminGetInfo(idUser))
  }
  public userUpdate = async (request: Request, res: Response) => {
    const req = request as RequestCustom;
    const idUser = req.idUser;
    const data = req.body;
    const table = data.table;
    const detail = convertData(data.detail);
    const condition: ConditionType = {
      conditionName: "idUser",
      conditionMethod: '=',
      value: idUser
    }
    try {
      const result = await statement.updateDataByCondition(table, detail, condition)
      if (!result) {
        return responseMessage(res, 401, 'Update is failed')
      }
      const date = new Date().toISOString().split("T")[0]
      const dataUpdate = convertData([{
        'updated_at':date
      }])
      await statement.updateDataByCondition(table,dataUpdate,condition)
      responseMessage(res, 200, 'Update is success')
    } catch {
      (errors: any) => {
        responseMessageData(res, 500, "Server errors", errors);
      };
    }
  };
  /* 
    insertData:dataOperation:{detail?:'address detail',type?:'extra' | 'default'} 
    updateData/removeData: method:'update'| 'remove', id (this is idAddress):idAddress
    if the method is update, you must add dataOperation. 
    and this is all key from body data:
    {
      type:"add"|"update"|"remove"
      dataOperation("add" | "update"):{detail?:'address detail',type?:'extra' | 'default'} 
      data.listId("update"|"remove"):[1,2,3,4] |[1]
    }
    */
  public userAddress = async (request: Request, res: Response) => {
    const req = request as RequestCustom
    const idUser = req.idUser
    const data = req.body
    if (data.type === "add") {
      const formatData = convertData([{ idUser: idUser, ...data.dataOperation }])
      const result = await statement.insertData("userAddress", formatData)
      return responseData(res, 201, { idAddress: Number(result.insertId) })
    }
    if (data.type === "update" || data.type === "remove") {
      const formatData = convertData([{ typeAddress: data.dataOperation.typeAddress }])
      const condition: ConditionType = {
        conditionName: "idAddress",
        conditionMethod: "in",
        value: data.dataOperation.listId
      }
      if (data.type === "update" && data.dataOperation.typeAddress === "default") {
        await
          db.updateTable("userAddress")
            .set({
              "typeAddress": 'extra'
            })
            .where('idUser', '=', idUser)
            .where('typeAddress', '=', 'default')
            .executeTakeFirst()
      }
      data.type === "update"
        ? statement.updateDataByCondition("userAddress", formatData, condition)
        : statement.removeData("userAddress", condition)
      return responseMessage(res, 200, 'Address change is success')

    }
  }

  public getAllUser = async (request: Request, res: Response) => {
    handleFindData(res, userStatement.getAllUser())
  }
  public getAllStaff = async (request: Request, res: Response) => {
    handleFindData(res, userStatement.getAllStaff())
  }
  public getAllAddress = async (request: Request, res: Response) => {
    handleFindData(res, userStatement.getAllAddress())
  }
}
