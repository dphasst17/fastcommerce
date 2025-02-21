import type { Request, Response } from "express"
import Statements from "models/statement/statement"
import WarehouseStatement from "models/statement/warehouse"
import type { RequestCustom } from "types/types"
import { convertData, handleChangeData, handleFindData } from "utils/utils"
const wareStatement = new WarehouseStatement()
const statement = new Statements()
export default class WarehouseController{
    public getAllWare = async(req:Request,res:Response) => {
        handleFindData(res,wareStatement.getAll())
    }
    public insertWare = async(request:Request,res:Response) => {
        const req = request as RequestCustom
        const idUser = req.idUser
        const data = req.body
        const result = data.ware.map((c:any) => {
            return {
                ...c,
                idpersonIOX:idUser
            }
        })
        const formatData = convertData(result)
        handleChangeData(res,statement.insertData("warehouse",formatData),"add")
    }
}