import { useContext } from "react"
import { StateContext } from "../../context/state"
import { Code } from "@nextui-org/react"

const UI = ({ title,value }: { title: string,value:string}) => {

  return <div className="w-full md:w-[49%] xl:w-[15%] h-[200px] bg-zinc-900 rounded-md flex flex-col contents-start justify-evenly my-1 p-2">
    <h1 className="text-[30px] font-bold font-mono">{title}</h1>
    <h2 className="text-[25px] font-bold font-mono">{value}</h2>
  </div>
}
const Statistical = () => {
  const { statistical } = useContext(StateContext)
  return <div className="dashboard-statistical w-full h-auto min-h-[100px] flex flex-wrap justify-around items-center pt-2 px-2 mb-2">
    <div className="w-full md:w-[49%] xl:w-[35%] h-[200px] bg-zinc-900 rounded-md flex items-center my-1 p-2">
      {statistical.product && <>
        <div className="img w-[30%] h-full flex items-center justify-center">
          <img src={statistical.product[0].sold[0].imgProduct} className="w-full h-4/5 object-contain" />
        </div>
        <div className="info w-[70%] h-full flex flex-wrap items-center justify-evenly cursor-pointer">
          <h1 className="w-full text-[30px] font-bold font-mono">{statistical.product[0].sold[0].nameProduct}</h1>
          <Code size="md" radius="sm" className="w-[100px] flex items-center justify-center bg-zinc-700 text-zinc-50">${ statistical.product[0].sold[0].price }</Code>
          <Code size="md" radius="sm" className="w-[100px] flex items-center justify-center bg-zinc-700 text-zinc-50">Sold: { statistical.product[0].sold[0].total_count }</Code>
        </div>
      </>}
    </div>
    {statistical.product && <UI title="Product Sold" value={statistical.product[0].total}/>}
    {statistical.user && <>
      <UI title="Total User" value={statistical.user[0].current_month.count}/>
      <UI title="New User" value="1"/>
    </>}
    {statistical.revenue && <UI title="Revenue" value={`$ ${statistical.revenue.map((r:any) => r.total).reduce((a:number,b:number) => a + b)}`}/>}
    <div className="w-[98%] xl:w-[32.8%] h-auto min-h-[250px] bg-zinc-900 rounded-md flex items-center my-1 p-2">
      <h1 className="text-[30px] font-bold font-mono">Top sold product</h1>
    </div>
    <div className="w-[98%] xl:w-[32.8%] h-auto min-h-[250px] bg-zinc-900 rounded-md flex items-center my-1 p-2">
      <h1 className="text-[30px] font-bold font-mono">Top view product</h1>
    </div>
    <div className="w-[98%] xl:w-[32.8%] h-auto min-h-[250px] bg-zinc-900 rounded-md flex items-center my-1 p-2">
      <h1 className="text-[30px] font-bold font-mono">??</h1>
    </div>
    <div className="w-[98%] xl:w-[49.5%] h-auto min-h-[400px] bg-zinc-900 rounded-md flex items-center my-1 p-2">
      <h1 className="text-[30px] font-bold font-mono">Chart Revenue</h1>
    </div>
    <div className="w-[98%] xl:w-[49.5%] h-auto min-h-[400px] bg-zinc-900 rounded-md flex items-center my-1 p-2">
      <h1 className="text-[30px] font-bold font-mono">Chart Order success and order fail</h1>
    </div>

  </div>
}

export default Statistical