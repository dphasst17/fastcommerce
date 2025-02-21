import { Fade } from 'react-awesome-reveal';
import Product_Layout_01 from '../product/layout/product_layout_01';
import { StateContext } from '../../context/stateContext';
import { useContext, useEffect, useState } from 'react'

const Laptop = () => {
    const { product } = useContext(StateContext);
    const [data, setData] = useState<any[] | null>(null);
    useEffect(() => {
        product && setData(product.filter((f: any) => f.type === "laptop")[0].data.filter((f: any) => f.view > 10))
    }, [product]);
    return <div className='h-laptop w-[90%] h-auto min-w-[400px] flex flex-wrap justify-around items-around'>
        <Fade triggerOnce direction="up" delay={0} className='w-full text-center text-[35px] font-bold text-zinc-700'>LAPTOP</Fade>
        {data?.slice(0, 12).map((d: any) => <Product_Layout_01 data={d} key={`h-laptop-${d.idProduct}`} name="laptop"/>)}
    </div>
}

export default Laptop