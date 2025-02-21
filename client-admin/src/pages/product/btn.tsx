import { Button } from "@nextui-org/react"
import { LiaLaptopMedicalSolid } from "react-icons/lia";
import { TbCategoryPlus } from "react-icons/tb";
import { FaRegImages } from "react-icons/fa";
const BtnList = () => {
    return <div className="w-full flex flex-wrap items-center pl-4 my-1">
        <Button isIconOnly color="primary" size="sm" className="mx-1">
            <LiaLaptopMedicalSolid className="text-[20px] text-zinc-50" />
        </Button>
        <Button isIconOnly color="primary" size="sm" className="mx-1">
            <TbCategoryPlus className="text-[20px] text-zinc-50" />
        </Button>
        <Button isIconOnly color="primary" size="sm" className="mx-1">
            <FaRegImages className="text-[20px] text-zinc-50" />
        </Button>
    </div>
}

export default BtnList