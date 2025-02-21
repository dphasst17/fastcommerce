import { db } from "models/connect";
export default class AuthStatement{
    public getAuth = async(username:string) => {
        return await db.selectFrom('auth')
        .select(["idUser","username","password_hash","role"])
        .where('username','=',`${username}`)
        .execute()
    }
    public getAuthAdmin = async(username:string) => {
        return await db.selectFrom('auth')
        .select(["idUser","username","password_hash","role"])
        .where('username','=',`${username}`)
        .where('role','!=',2)
        .execute()
    }
    public getMail = async(email:string) => {
        return await db.selectFrom('users')
        .select(["idUser","email"])
        .where('email','=',email)
        .execute()
    }
    public getPassword = async(idUser:string) => {
        return await db.selectFrom('auth')
        .select(["idUser","password_hash"])
        .where("idUser","=",`${idUser}`)
        .execute()
    }
}