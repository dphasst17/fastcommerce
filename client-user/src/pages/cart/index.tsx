import { useContext } from "react"
import { CartContext } from "../../context/cartContext"
import { CartType } from "../../types/type"
import Product_layout_02 from "../../pages/product/layout/product_layout_02"
import { StateContext } from "../../context/stateContext"
import { RiDeleteBinFill } from "react-icons/ri";
import { Button } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"
const Cart = () => {
    const navigate = useNavigate()
    const { cart,removeItemCart } = useContext(CartContext)
    const { listCheckOut, setListCheckOut } = useContext(StateContext)
    const addToList = (id: number) => {
        setListCheckOut(listCheckOut.includes(id) ? listCheckOut.filter((f: number) => f !== id) : [...listCheckOut, id])
    }
    return <div className="w-full h-screen min-h-[90vh] flex flex-wrap flex-row-reverse lg:flex-row justify-around">
        <div className="w-full h-[10%] text-zinc-900 font-bold font-ps-2 text-[35px] flex justify-center items-center">CART</div>
        <div className="cart_layout_first w-full sm:w-4/5 lg:w-3/5 h-4/5 flex flex-wrap justify-center lg:justify-between content-start">
            {cart && cart.map((c: CartType) => <div
                className={`relative w-4/5 lg:w-[48%]  rounded-md  text-zinc-700 my-1 cursor-pointer`}
                key={`cart-detail-${c.idCart}`}>
                <Product_layout_02 data={c} isButton={true}/>
                <Button size="sm" color="danger" isIconOnly onClick={() => {removeItemCart([c.idCart])}}>
                    <RiDeleteBinFill />
                </Button>
                <Button size="sm" onClick={() => addToList(c.idCart)}
                    className={`m-1 ${listCheckOut.includes(c.idCart) ? "bg-red-600" : "bg-blue-500"} text-zinc-100 p-1 rounded-md transition-all`}>
                    {listCheckOut.includes(c.idCart) ? "Selected" : "Select"}
                </Button>

            </div>)}
        </div>
        <div className="check_out_demo w-full sm:w-4/5 lg:w-1/5 h-[200px] lg:h-4/5 flex flex-col items-center justify-start pt-2">
            <div className="w-4/5 flex flex-col justify-around min-w-[250px] h-[80px] text-zinc-900 rounded-md">
                <div className="count w-full flex justify-between bg-zinc-900 text-white rounded-md p-2">
                    Total count:
                    <span>
                        {
                            listCheckOut.length !== 0  && cart ? 
                            cart.filter((f: CartType) => listCheckOut.includes(f.idCart))
                            ?.map((c: CartType) => c.countProduct)
                            ?.reduce((a: number, b: number) => a + b)
                            :0
                        }
                    </span>
                </div>
                <div className="count w-full flex justify-between bg-zinc-900 text-white rounded-md p-2">
                    Total price:
                    <span>
                        ${
                            listCheckOut.length !== 0 ? 
                            cart?.filter((f: CartType) => listCheckOut.includes(f.idCart))
                            .map((c: CartType) => c.countProduct * c.detail[0].price)
                            ?.reduce((a: number, b: number) => a + b)
                            :0
                        }
                    </span>
                </div>
            </div>
            <Button radius="sm" color="primary" className="w-4/5 my-2" onClick={() => {listCheckOut.length !== 0 && navigate('/checkout')}}>Check out</Button>
        </div>
    </div>

}

export default Cart