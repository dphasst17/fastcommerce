import { Chip, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { userStore } from "../../store/user"
import { StaffType } from "../../types/types"
import { useState } from "react"
import { pagination } from "../../utils/utils"

const Staff = () => {
    const { staff } = userStore()
    const [staffPage, setStaffPage] = useState(1)
    return <div className="staff w-[95%] md:w-4/5 xl:w-[70%] h-[250px] flex flex-col pt-1">
        <Table aria-label="Table Staff" classNames={{wrapper:"min-h-[200px]"}}>
            <TableHeader>
                <TableColumn>ID</TableColumn>
                <TableColumn>AVATAR</TableColumn>
                <TableColumn>NAME</TableColumn>
                <TableColumn>EMAIL</TableColumn>
                <TableColumn>POSITION</TableColumn>
                <TableColumn>CREATED AT</TableColumn>
                <TableColumn>UPDATED AT</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>ACTION</TableColumn>
            </TableHeader>
            <TableBody>
                {(staff ?? []).slice((staffPage * 5) - 5, staffPage * 5).map((s:StaffType) => <TableRow className="cursor-pointer" key={`staff-${s.idStaff}`}>
                    <TableCell>#{s.idStaff}</TableCell>
                    <TableCell>{s.avatar}</TableCell>
                    <TableCell>{s.name}</TableCell>
                    <TableCell>{s.email}</TableCell>
                    <TableCell>{s.position_name}</TableCell>
                    <TableCell>{s.created_at!.split("T")[0].split("-").reverse().join("/")}</TableCell>
                    <TableCell>{s.updated_at!.split("T")[0].split("-").reverse().join("/")}</TableCell>
                    <TableCell>
                        <Chip radius="sm" variant="bordered" color={s.action === "active" ? "success" : "danger"}>{s.action}</Chip>
                    </TableCell>
                    <TableCell>""</TableCell>
                </TableRow>)}
            </TableBody>
        </Table>
        {staff && staff.length  > 1 && <Pagination isCompact size="lg" showControls page={staffPage} total={pagination(5, staff.length)}
            onChange={(e: any) => { setStaffPage(e) }}  />}
    </div>
}

export default Staff