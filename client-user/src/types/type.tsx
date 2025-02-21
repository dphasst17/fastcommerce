export interface CartType{
    idCart:number,
    idProduct:number,
    countProduct:number
    detail:{
        discount:number,
        nameProduct:string,
        imgProduct:string,
        price:number
    }[]
}
export interface UserAddressType{
    type:"default" | "extra", 
    idAddress:number,
    detail:string
}
export interface UserType{
    idUser:string,
    nameUser:string,
    phone:string,
    email:string,
    address:UserAddressType[],
    cart:CartType[]
}
export interface UserUpdateType {
    table: "users" | "userAddress" | "carts"
    col: "idUser" | "idAddress" | "idCart",
    cValue?: string | number,
    detail: any[]
}
export interface UserAddressAddType{
    type:string,
    dataOperation:{
        detail?:string,
        typeAddress?:string
    }
}
export interface PostType {
    idPost: number,
    title: string,
    thumbnails: string,
    dateAdded: string,
    poster: string,
    nameType: string,
    idType?: number
}
export interface ProductType {
    idProduct: number,
    nameProduct: string,
    price: number | string,
    discount?: number,
    imgProduct: string | any[]
    des?: string,
    idType: number,
    nameType: string,
    view: number,
    brand: string,
    detail?: any[]
    action?:"show" | "hide"
}
export interface ProductFilterType {
    brand: string[];
    price: string;
    detail?: any[];
}
export interface Auth {
    username:string,
    password?:string,
    confirm?:string,
    email?:string
}
export interface Modals {
    setModalName?: React.Dispatch<React.SetStateAction<string>>,
}
export interface OrderDataType{
    fullName:string,
    phone:string,
    address:string,
    method:string,
    costs:number,
    edd:string,
    paymentStatus:"paid" | "unpaid"
}
export interface OrderInsertType{
    order:OrderDataType[],
    listId:number[]
}
export interface OrderType{
    idOrder:string,
    idShipper:string | null,
    idUser:string,
    fullName:string,
    phone:string,
    address:string,
    method:string,
    cost: 0.85 | 0.5,
    edd:string,
    paymentStatus:"paid" | "unpaid",
    orderStatus:string,
    detail:OrderDetailType[]
}
export interface OrderDetailType{
    id?:string,
    idOrderDetail?:string,
    idOrder:string,
    idProduct:number,
    imgProduct?:string,
    nameProduct?:string,
    price:number,
    discount:number,
    countProduct:number
}
export interface CommentType{
    id?:number
    idComment?:number,
    idProduct?:number,
    idPost?:number,
    nameUser:string,
    img:string,
    commentValue:string,
    dateComment?:string,
    created_date?:string
}
export interface CommentResType {
    total: number,
    total_page: number,
    page: number
  }