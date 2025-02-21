import { Button, Input, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useForm } from "react-hook-form";
/* import { GetToken } from "../../../utils/token"; */
import { Modals } from "../../../types/type";
import { GetToken } from "../../../utils/token";
import { authUpdatePassword } from "../../../api/auth";


interface FormValue {
  current: string,
  new: string,
  confirm:string
}
const ModalPassword = ({setModalName}: Modals) => {
  const { register, handleSubmit} = useForm<FormValue>()
  const onSubmit = async(data: FormValue) => {
    console.log(data)
    if(data.confirm !== data.new){
      alert("Confirm password does not match with password!")
    }
    const dataUpdate = {
      current:data.current,
      password:data.new
    }
    const token = await GetToken()
    token && authUpdatePassword(token,dataUpdate)
    .then(res => {
      alert(res.message)
    })    
  }
  return <ModalContent>
  {(onClose) => (
    <>
      <ModalHeader className="flex flex-col gap-1">Edit</ModalHeader>
      <ModalBody>
        <form className="w-full">
          <Input {...register('current', { required: true })} type="text" label="Current password" className="w-full my-2" radius="sm" />
          <Input {...register('new', { required: true })} type="text" label="New password" className="w-full my-2" radius="sm" />
          <Input {...register('confirm', { required: true })} type="text" label="Confirm password" className="w-full my-2" radius="sm" />
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="light" onPress={() => {setModalName("");onClose()}}>
          Close
        </Button>
        <Button onClick={() => { handleSubmit(onSubmit)() }} color="success" className="text-white font-bold">Update</Button>
      </ModalFooter>
    </>
  )}
</ModalContent>

}

export default ModalPassword