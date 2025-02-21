import Auth from "../pages/auth";
import Dashboard from "../pages/dashboard";
import Order from "../pages/order";
import Post from "../pages/post";
import Product from "../pages/product";
import Account from "../pages/account"; 
import Warehouse from "../pages/warehouse";


const publicRoutes:any = [
    {path:"/auth",component:Auth}

];
const privateRoutes: any = [
    {path:"/",component:Dashboard},
    {path:"/product",component:Product},
    {path:"/account",component:Account},
    {path:"/order",component:Order},
    {path:"/warehouse",component:Warehouse},
    {path:"/post",component:Post},
    
]
export { publicRoutes, privateRoutes };