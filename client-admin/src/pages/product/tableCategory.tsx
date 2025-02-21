import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { productStore } from "../../store/product";
import { useContext, useEffect, useState } from "react";
import { CategoryDetailType, CategoryProductType } from "../../types/types";
import { StateContext } from "../../context/state";
import { pagination } from "../../utils/utils";

const TableCategory = () => {
    const { isDark } = useContext(StateContext)
    const { category } = productStore()
    const [cateData, setCateData] = useState<CategoryDetailType[] | []>([])
    const [activePageCate, setActivePageCate] = useState(1)
    useEffect(() => {
        category && setCateData(category.flatMap((c: CategoryProductType) => c.detail.map((d: any) => ({ ...d, idType: c.idType }))))
    }, [category])
    return <div className="table_product w-[90%] h-auto flex flex-wrap justify-center items-center my-4">
        <Table aria-label="Product table" className="relative  mb-2">
            <TableHeader>
                <TableColumn>ID-CATEGORY</TableColumn>
                <TableColumn>ID-CATEGORY-DETAIL</TableColumn>
                <TableColumn>NAME-CATEGORY</TableColumn>
                <TableColumn>NAME</TableColumn>
                <TableColumn>DISPLAYNAME</TableColumn>
                <TableColumn>DATATYPES</TableColumn>
                <TableColumn>DISPLAYORDER</TableColumn>
            </TableHeader>
            <TableBody className="!z-0">
                {cateData.slice((activePageCate * 20) - 20, activePageCate * 20).map((c: CategoryDetailType) =>
                    <TableRow className={`${isDark ? "text-zinc-50" : "text-zinc-950"}`} key={`${c.idType}-${c.id}`}>
                        <TableCell>{c.idType}</TableCell>
                        <TableCell>#{c.id}</TableCell>
                        <TableCell>{c.type}</TableCell>
                        <TableCell>{c.name}</TableCell>
                        <TableCell>{c.displayname}</TableCell>
                        <TableCell>{c.datatypes}</TableCell>
                        <TableCell>{c.displayorder}</TableCell>
                    </TableRow>
                )
                }
            </TableBody>
        </Table>
        {cateData.length !== 0 && <Pagination isCompact size="lg" showControls page={activePageCate} total={pagination(20, cateData.length)}
            onChange={(e: any) => { setActivePageCate(e) }} />}
    </div>
}

export default TableCategory