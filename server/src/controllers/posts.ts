import type { Request, Response } from "express";
import PostStatement from "models/statement/posts";
import Statements, { type ConditionType } from "models/statement/statement";
import { responseData, responseMessageData } from "utils/response";
import { convertData, handleChangeData, handleFindData } from "utils/utils";
import type { RequestCustom } from "types/types";
import CommentStatement from "models/statement/comment";


const statement = new Statements();
const postStatement = new PostStatement();
const commentStatement = new CommentStatement();
export default class PostsController {
  public getAll = async (req: Request, res: Response) => {
    try {
      const result = await postStatement.getAll();
      responseData(res, 200, result);
    } catch {
      (errors: any) => {
        responseMessageData(res, 500, "Server errors", errors);
      };
    }
  };
  public getCategory = async (req: Request, res: Response) => {
    handleFindData(res, postStatement.getCategory());
  };
  public getDetail = async (req: Request, res: Response) => {
    const idPosts = req.params["id"];
    handleFindData(res, postStatement.getDetail(Number(idPosts)));
  };
  public insertPost = async (req: Request, res: Response) => {
    const data = req.body;
    const changeData = convertData(data);
    try {
      const result = await statement.insertData("posts", changeData);
      if(!result){
        return responseMessageData(res, 401, `Post created is failed`);
      }
      responseMessageData(res, 201, `Post created is success`,{id:Number(result.insertId)});
    } catch {
      (errors: any) => {
        responseMessageData(res, 500, "Server errors", errors);
        throw errors
      };
    }
  }
  public insertCommentPost = async (request: Request, res: Response) => {
    const req = request as RequestCustom;
    const idUser = req.idUser;
    const data = req.body;
    const addData = data.map((p: any) => {
      return {
        ...p,
        idUser: idUser,
      };
    });
    const changeData = convertData(addData);
    try {
      const result = await statement.insertData("commentPost", changeData);
      if(!result){
        return responseMessageData(res, 401, `Comment for post is failed`);
      }
      responseMessageData(res, 201, `Comment for post is success`,{id:Number(result.insertId)});
    } catch {
      (errors: any) => {
        responseMessageData(res, 500, "Server errors", errors);
        throw errors
      };
    }
  };
  public updatePost = async (req: Request, res: Response) => {
    const data = req.body;
    const changeData = convertData(data.detail);
    const condition: ConditionType = {
      conditionName: "idPosts",
      conditionMethod: "=",
      value: data.id,
    };
    handleChangeData(res, statement.updateDataByCondition("posts", changeData, condition), "update");
  };
  public getCommentPost = async (req:Request,res:Response) => {
    const idPost = req.params['id']
    const current_page = req.params["page"] ? Number(req.params["page"]) : 1
    try {
      const getCount = await commentStatement.getCountComment(Number(idPost),"commentPost");
      const getData = await commentStatement.getByPost(Number(idPost),Number(current_page))
      const total_p = Math.ceil((getCount.flatMap((t:any) => t.total)[0]/4))
      
      const resultData = {
          total:getCount.flatMap((t:any) => t.total)[0],
          total_page:total_p === 0 ? 1 : total_p,
          page:current_page,
          detail:getData
      }
      responseData(res, 200, resultData);
    } catch {
      (errors: any) => {
        responseMessageData(res, 500, "Server errors", errors);
      };
    }
  }
}
