import { Button, Code, Input, Modal, useDisclosure } from "@nextui-org/react"
import {  useState } from "react"
import { FaRegTrashAlt } from "react-icons/fa";
import ModalEdit from "./modal/edit";
import ModalPassword from "./modal/password";
import ModalAddress from "./modal/address";
import { Modals } from "../../types/type";
import { GetToken } from "../../utils/token";
import { userAddress } from "../../api/user";
import Purchase from "./purchase";
import Order from "./order";
import { userStore } from "../../store/user";
interface ListModalType {
  displayName: string,
  name: string,
  modalDetail: ({ setModalName }: Modals) => JSX.Element
}
const User = () => {
  const { user,remove_address,updated_type_address } = userStore()
  const [modalName, setModalName] = useState<string>("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const listModal: ListModalType[] = [
    {
      displayName: "Add address",
      name: 'address',
      modalDetail: ModalAddress
    },
    {
      displayName: "Update password",
      name: 'password',
      modalDetail: ModalPassword
    },
    {
      displayName: "Edit",
      name: 'edit',
      modalDetail: ModalEdit
    }
  ]
  const handleChangeAddress = async (type: "update" | "remove", data: { listId?: number[], typeAddress?: string }) => {
    const token = await GetToken()
    const dataChange = {
      type: type,
      dataOperation: data
    }
    token && userAddress(token, dataChange)
      .then(res => {
        if (res.status === 200) {
          type === "remove" ? remove_address(data.listId!) : updated_type_address(data)
        }
      })
  }
  return user && <div className="user w-full h-auto min-h-screen p-2">
    <div className="userInfo w-full h-auto min-h-[400px] flex flex-wrap justify-center items-center">
      <div className="info w-full md:w-3/4 xl:w-2/4 h-auto xl:h-[150px] flex flex-wrap justify-center items-center">
        <div className="info-detail w-[35%]">
          <Input type="text" labelPlacement="outside-left" variant="underlined" radius="sm" label="Name" value={user[0]?.nameUser} isReadOnly />
          <Input type="text" labelPlacement="outside-left" variant="underlined" radius="sm" label="Phone" value={user[0]?.phone} isReadOnly />
          <Input type="text" labelPlacement="outside-left" variant="underlined" radius="sm" label="Email" value={user[0]?.email} isReadOnly />
        </div>
        <div className="info-btn flex flex-col m-1">
          {listModal.map((m: ListModalType) => <Button
            key={`Button-${m.name}`}
            size="sm" className="m-1" color="primary"
            onPress={onOpen} onClick={() => { setModalName(m.name) }}>
            {m.displayName}
          </Button>)}
        </div>
      </div>
      {/* Address list */}
      <div className="address w-full md:w-3/4 xl:w-2/4 h-full text-zinc-900">
        {user && user[0]?.address.map((a: any) => <div className="address-detail my-2 !text-zic-100" key={a.idAddress}>
          <Code radius='sm'
            style={{ color: "white" }}
            className={`text-wrap ${a.type === "default" ? 'bg-blue-500' : 'bg-zinc-700'} cursor-pointer`}>
            {a.detail}
          </Code>
          <Button size="sm" radius="sm"
            className={`w-[80px] text-center ${a.type === "extra" ? "bg-zinc-700" : "bg-blue-500"} text-zinc-100 mx-1 cursor-pointer`}
            onClick={() => { handleChangeAddress("update", { listId: [a.idAddress], typeAddress: a.type === "default" ? "extra" : "default" }) }}
          >
            {a.type}
          </Button>
          <Button isIconOnly size="sm" radius="sm" color="danger"
            onClick={() => handleChangeAddress("remove", { listId: [a.idAddress] })}>
            <FaRegTrashAlt />
          </Button>
        </div>)}
      </div>
    </div>
    <div className="order w-full h-auto flex flex-wrap justify-center content-start">
      <Purchase />
      <Order />
    </div>
    <Modal
      isOpen={isOpen}
      onOpenChange={() => { onOpenChange(); setModalName("") }}
      size="lg"
      backdrop="opaque"
      placement="center"
    >
      {listModal.filter((f: ListModalType) => f.name === modalName).map((m: ListModalType) =>
        <m.modalDetail setModalName={setModalName} key={`Modal-${m.name}`} />
      )}
    </Modal>
  </div>
}

export default User