import { Chip, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react"
import { userStore } from "../../store/user"
import { UserType } from "../../types/types"
import { useContext, useState } from "react"
import { pagination } from "../../utils/utils"
import { BiDetail } from "react-icons/bi"
import { StateContext } from "../../context/state"
import { MdBlock } from "react-icons/md";

const User = () => {
    const { isDark } = useContext( StateContext )
    const { user } = userStore()
    const [userPage, setUserPage] = useState(1)
    return <div className="staff w-[95%] md:w-4/5 xl:w-[48%] min-h-[300px] xl:min-h-[400px] flex flex-col pt-1 ">
        <Table aria-label="Table Staff" classNames={{wrapper:"min-h-[200px]"}}>
            <TableHeader>
                <TableColumn>ID</TableColumn>
                <TableColumn>AVATAR</TableColumn>
                <TableColumn>NAME</TableColumn>
                <TableColumn>CREATED AT</TableColumn>
                <TableColumn>UPDATED AT</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>ACTION</TableColumn>
            </TableHeader>
            <TableBody>
                {(user ?? []).slice((userPage * 5) - 5, userPage * 5).map((s:UserType) => <TableRow className="cursor-pointer" key={`user-${s.idUser}`}>
                    <TableCell>#{s.idUser}</TableCell>
                    <TableCell>{s.img}</TableCell>
                    <TableCell>{s.nameUser}</TableCell>
                    <TableCell>{s.created_at!.split("T")[0].split("-").reverse().join("/")}</TableCell>
                    <TableCell>{s.updated_at!.split("T")[0].split("-").reverse().join("/")}</TableCell>
                    <TableCell>
                        <Chip radius="sm" variant="bordered" color={s.action === "active" ? "success" : "danger"}>{s.action}</Chip>
                    </TableCell>
                    <TableCell>
                    <div className="relative flex items-center justify-around gap-2">
                                    <Tooltip className={`${isDark ? "text-zinc-50" : "text-zinc-950"}`} content="Details">
                                        <span  className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                            <BiDetail />
                                        </span>
                                    </Tooltip>
                                    
                                    <Tooltip color="danger" content="Block user">
                                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                            <MdBlock />
                                        </span>
                                    </Tooltip>
                                </div>
                    </TableCell>
                </TableRow>)}
            </TableBody>
        </Table>
        {user && user.length  > 5 && <Pagination className="my-1" isCompact size="lg" showControls page={userPage} total={pagination(5, user.length)}
            onChange={(e: any) => { setUserPage(e) }}  />}
    </div>
}

export default User