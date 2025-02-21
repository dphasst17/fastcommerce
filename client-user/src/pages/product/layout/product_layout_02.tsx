import { useContext } from "react"
import { CartType } from "../../../types/type"
import { CartContext } from "../../../context/cartContext"
import { percentDiscount } from "../../../utils/utils"

const Product_layout_02 = ({ data,isButton }: { data: CartType,isButton:boolean }) => {
  const { updateCount } = useContext(CartContext)
  return <div
    className="flex items-center gap-3 w-full h-[80px] justify-center rounded-md">
    <div className="img-box w-1/5 h-full">
      <img src={data.detail[0].imgProduct} alt="perfume bottle image" className="object-contain w-full h-full" />
    </div>
    <div className="pro-data w-2/4">
      <h5 className="font-semibold text-sm truncate">
        {data.detail[0].nameProduct}
      </h5>
      <h6 className="font-medium text-lg leading-8 text-blue-600  max-[550px]:text-center">
        $ {data.detail[0].discount !== 0
          ? <><span className="text-red-600 font-semibold line-through">{data.detail[0].price}</span> {percentDiscount(data.detail[0].discount!, Number(data.detail[0].price))}</>
          : data.detail[0].price}
      </h6>
    </div>
    <div className='w-1/4 flex justify-around '>
      {isButton && <button className='border border-solid border-zinc-600 rounded-md w-[30%] h-full' 
      onClick={() => data.countProduct > 1 && updateCount(data.idCart, data.countProduct - 1)}>
        -
      </button>}
      <button className='border border-solid border-zinc-600 rounded-md w-[30%] h-full'>{data.countProduct}</button>
      {isButton && <button className='border border-solid border-zinc-600 rounded-md w-[30%] h-full' 
      onClick={() => updateCount(data.idCart, data.countProduct + 1)}>
        +
      </button>}
    </div>
  </div>
}

export default Product_layout_02