import type { Request, Response } from "express";
import StatisticalStatement from "models/statement/statistical";
import { handleFindData } from "utils/utils";

const statisticalStatement = new StatisticalStatement()
export default class StatisticalController{
    public product = (req:Request, res:Response) => {
        handleFindData(res,statisticalStatement.product())
    }
    public user = (req:Request, res:Response) => {
        handleFindData(res,statisticalStatement.user())
    }
    public order = (req:Request, res:Response) => {}
    public revenue = (req:Request, res:Response) => {
        handleFindData(res,statisticalStatement.revenue())
    }
}