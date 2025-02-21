import { Fade } from 'react-awesome-reveal';
import Product_Layout_01 from '../product/layout/product_layout_01';
import { StateContext } from '../../context/stateContext';
import { useContext, useEffect, useState } from 'react'

const NewProduct = () => {
    const { newProduct } = useContext(StateContext);
    const [data, setData] = useState<any[] | null>(null);
    useEffect(() => {
        newProduct && setData(newProduct)
    }, [newProduct]);
    return <div className='h-laptop w-[90%] h-auto flex flex-wrap justify-around items-around my-2'>
        <Fade triggerOnce direction="up" delay={0} className='w-full text-center text-[35px] font-bold text-zinc-700'>NEW PRODUCT</Fade>
        {data?.slice(0, 8).map((d: any) => <Product_Layout_01 data={d} key={`h-laptop-${d.idProduct}`} name="new"/>)}
    </div>
}

export default NewProduct