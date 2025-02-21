import { OrderDetailType } from "types/type"
import { StateContext } from "../../context/stateContext"
import { useContext, useState } from "react"
import { Pagination } from "@nextui-org/react"
import { pagination } from "../../utils/utils"

const Purchase = () => {
  const { purchase } = useContext(StateContext)
  const [activePage, setActivePage] = useState<number>(1)
  return <div className="user-purchase w-full sm:w-4/5 lg:w-2/4 h-auto flex flex-wrap justify-center content-start p-1">
    <div className="product w-full h-auto flex flex-wrap justify-around content-start">
      <div className="w-full text-zinc-900 flex items-center justify-center font-han text-[40px] font-bold"> Purchase Order</div>
      <div className="w-full flex flex-wrap justify-between">
        {purchase?.slice(0,6).map((p:OrderDetailType) => <div 
        className="detail-purchase w-full md:w-[48%] max-h-[160px] min-h-[100px] flex rounded-md text-zinc-900 my-1 bg-zinc-700 hover:bg-zinc-500 transition-all cursor-pointer" 
        key={p.id}>
          <div className="imagesProduct w-2/5 sm:w-1/5 flex items-center justify-center">
            <img src={p.imgProduct} className="max-h-[160px] object-contain" />
          </div>
          <div className="info w-3/5 sm:w-4/5 flex flex-wrap items-center px-1 text-zinc-100">
            <div className="name w-full truncate flex items-center justify-center">#{p.idOrder}</div>
            <div className="name w-full truncate">{p.nameProduct}</div>
            <div className="name w-4/5 sm:w-2/4 truncate">Price: ${p.price}</div>
            <div className="name w-4/5 sm:w-2/4 truncate">Discount:-{p.discount}%</div>
            <div className="name w-4/5 sm:w-2/4 truncate">Count:{p.countProduct}</div>
            <div className="name w-4/5 sm:w-2/4 truncate">Total: ${p.countProduct * (p.price - (p.price * p.discount / 100))}</div>
          </div>
        </div>)}
      </div>
      {purchase && purchase.length !== 0 && <Pagination isCompact size="lg" showControls page={activePage} 
      total={pagination(6, purchase.length)} initialPage={1} onChange={(e) => { setActivePage(e) }} />}
    </div>
  </div>
}

export default Purchase