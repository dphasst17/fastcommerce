import { OrderDetailType, OrderType } from "types/type"
import { StateContext } from "../../context/stateContext"
import { useContext, useState } from "react"
import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { formatDate, pagination } from "../../utils/utils"

const Order = () => {
    const { order } = useContext(StateContext)
    const [activePage, setActivePage] = useState<number>(1)
    return <div className="user-purchase w-full sm:w-4/5 lg:w-2/4 h-auto flex flex-wrap justify-center items-center p-1">
        <div className="product w-full h-auto flex flex-wrap justify-around content-start">
            <div className="w-full text-zinc-900 flex items-center justify-center font-han text-[40px] font-bold">Order</div>
            {order?.slice(0, 2).map((p: OrderType) => <div
                className="detail-purchase w-full lg:w-[90%] min-h-[100px] flex flex-wrap rounded-md text-zinc-100 my-1 p-1 bg-zinc-700 cursor-pointer"
                key={p.idOrder}>
                <h1 className="w-full flex items-center justify-center">#{p.idOrder}</h1>
                <p className="w-full">Full name: {p.fullName}</p>
                <p className="w-full">Phone: {p.phone}</p>
                <p className="w-full">Address: {p.address}</p>
                <div className="info mx-auto w-full sm:w-[95%] xl:w-4/5 flex flex-wrap justify-center items-center px-1 my-1 text-zinc-100">
                    <Table aria-label="Table product in order" classNames={{wrapper:['bg-transparent !shadow-none'],th:['bg-zinc-900 text-zinc-100']}}>
                        <TableHeader>
                            <TableColumn>NAME</TableColumn>
                            <TableColumn>PRICE</TableColumn>
                            <TableColumn>DISCOUNT</TableColumn>
                            <TableColumn>COUNT</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {p.detail.map((d:OrderDetailType) => <TableRow key={d.idOrderDetail}>
                                <TableCell>{d.nameProduct}</TableCell>
                                <TableCell>${d.price}</TableCell>
                                <TableCell>-{d.discount}%</TableCell>
                                <TableCell>{d.countProduct}</TableCell>
                            </TableRow>)}
                        </TableBody>
                    </Table>
                </div>
                <p className="w-full">Expected delivery date: {formatDate(p.edd)}</p>
                <p className="w-full">Payment method: {p.method}</p>
                <p className="w-full">Payment status: {p.paymentStatus}</p>
                <p className="w-full">Order status: {p.orderStatus}</p>
                
            </div>)}
            {order && order.length !== 0 && <Pagination isCompact size="lg" showControls page={activePage}
                total={pagination(2, order.length)} initialPage={1} onChange={(e) => { setActivePage(e) }} />}
        </div>
    </div>
}

export default Order