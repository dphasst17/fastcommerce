import { ProductFilterType, ProductType } from 'types/type';
import { StateContext } from '../../context/stateContext'
import { useContext, useEffect, useState } from 'react'
import Product_Layout_01 from './layout/product_layout_01';
import { Button, Pagination } from '@nextui-org/react';
import { pagination } from '../../utils/utils';
import FilterType from './layout/filterType';
import FilterBrand from './layout/filterBrand';
import FilterPrice from './layout/filterPrice';
import { SortedData } from '../../utils/handle';

const Product = () => {
    const { product } = useContext(StateContext)
    const [currentType, setCurrentType] = useState<string>("laptop");
    const [currentData, setCurrentData] = useState<ProductType[] | null>(null);
    const [activePage, setActivePage] = useState<number>(1)
    const [filter,setFilter] = useState<ProductFilterType>({brand:[],price:"",detail:[]})
    const listBrand = product && Array.from(new Set(product.filter((f: { type: string, data: any[] }) => f.type === currentType)[0].data.map((d:any) => d.brand)))
    useEffect(() => {
        setActivePage(1)
        product && setCurrentData(product.filter((f: { type: string, data: any[] }) => f.type === currentType)[0].data)
    }, [product, currentType])
    useEffect(() => {
        const FilterData = async () => {
            setActivePage(1)
            const productData = product?.filter((f: { type: string, data: any[] }) => f.type === currentType)[0].data
            const resultBrand = filter.brand.length !== 0 ? productData.filter((f:any) => filter.brand.includes(f.brand)) : productData
            setCurrentData(resultBrand) 
        }
        FilterData()
    },[filter,product,currentType])
    SortedData(currentData,filter.price,setCurrentData,setActivePage)
    return <div className='product w-full h-auto flex flex-col items-center justify-center'>
        <div className='filter w-[90%] flex flex-wrap my-4 text-zinc-900'>
            {product && <FilterType type={product.sort((a:any,b:any) => a.idType - b.idType).map((f: any) => f.type)} currentType={currentType} setCurrentType={setCurrentType} />}
            {product && <FilterBrand listBrand={listBrand} setFilter={setFilter} filterData={filter}/>}
            <FilterPrice setFilter={setFilter} filterData={filter}/>
            <Button size='sm' radius='sm' color='danger' className='mx-1' onClick={() => {setFilter({brand:[],price:"",detail:[]})}}>CLEAR</Button>
        </div>
        <div className='product-layout w-[90%] h-auto min-h-[760px] flex flex-wrap justify-around content-around'>
            {currentData && currentData.slice((8 * activePage) - 8, 8 * activePage).map((d: ProductType) => 
            <Product_Layout_01 data={d} name="product" key={`product-${d.idProduct}`}/>)}
        </div>
        {currentData && <Pagination isCompact size="lg" showControls page={activePage} total={pagination(8, currentData.length)} 
        initialPage={1} onChange={(e) => { setActivePage(e) }} />}
    </div>
}

export default Product