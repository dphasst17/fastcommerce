import Product_Layout_01 from "../../pages/product/layout/product_layout_01"
import { StateContext } from "../../context/stateContext"
import { useContext } from "react"
import { formatDate } from "../../utils/utils"
import { Fade } from "react-awesome-reveal"

const SaleEvent = () => {
    const { sale } = useContext(StateContext)
    return sale && sale.length && <div className="w-full h-auto min-h-[600px] flex flex-col justify-around items-center">
        {sale?.map((s: any) =>
            <div key={`sale`} className="w-full h-auto min-h-[600px] flex flex-col justify-around items-center">
                <Fade triggerOnce direction="up" delay={0} className='w-full text-center text-[35px] font-bold text-zinc-700'>
                    <span>{s.title}</span>
                    <span className="font-semibold text-[30px] text-center font-mono text-zinc-700">{formatDate(s.start_date)} - {formatDate(s.end_date)}</span>
                </Fade>                
                <div className="saleDetail relative w-full lg:w-[95%] h-auto flex flex-wrap justify-around items-center px-8">
                    {
                        s.detail.map((d: any) => <Product_Layout_01 data={d} name="sale" key={`sale-${d.idProduct}`} />)
                    }
                </div>
            </div>
        )}
    </div>
}

export default SaleEvent