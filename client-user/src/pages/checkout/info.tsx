import { Button, Input, Modal, useDisclosure } from "@nextui-org/react"
import { StateContext } from "../../context/stateContext"
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { CartType, OrderInsertType, UserAddressType, UserType } from "../../types/type"
import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import ModalEditAddress from "./modalEditAddress"
import { CartContext } from "../../context/cartContext"
import PaymentPaypal from "./paypal"
import ModalAddress from "../../pages/user/modal/address"
import { GetToken } from "../../utils/token"
import { insertPayment, orderInsert } from "../../api/order"
interface FormInfo {
  nameUser: string,
  phone: string,
  address: string
}
interface Method {
  id: string,
  content: string,
  costs?: number,
  date?: string
}

const arrClassNameInput = ['border-zinc-900 hover:border-blue-500 transition-all']

const getNextDay = (currentDate:Date, daysToAdd:number) => {
  const nextDate = new Date(currentDate);
    
  // Tăng ngày lên số ngày muốn thêm
  nextDate.setDate(nextDate.getDate() + daysToAdd);
  
  return nextDate;
}

const InfoCheckout = () => {
  const { cart } = useContext(CartContext)
  const { user, listCheckOut } = useContext(StateContext)
  const { register, handleSubmit } = useForm<FormInfo>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [data, setData] = useState<any[] | []>([])
  const [currentAddress, setCurrentAddress] = useState("");
  const [cost, setCost] = useState<number>(0)
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDetail, setPaymentDetail] = useState<any[] | null>(null)
  const [isPayment, setIsPayment] = useState<boolean>(false)
  useEffect(() => {
    user && user[0].address.length !== 0 ? setCurrentAddress(user.flatMap(
      (u: UserType) =>
        u.address.filter((a: UserAddressType) => a.type === "default")[0]
    )[0].detail) : setCurrentAddress("")
  }, [user])

  useEffect(() => {
    cart && setData(cart.filter((c: CartType) => listCheckOut.includes(c.idCart)))
  }, [cart, listCheckOut])
  const arrShippingMethod: Method[] = [
    {
      id: 'shipping-1',
      content: 'Express shipping',
      costs: 0.85,
      date: '2-4'
    },
    {
      id: 'shipping-2',
      content: 'Economical shipping',
      costs: 0.5,
      date: '5-10'
    }
  ]
  const arrPaymentMethod: Method[] = [
    {
      id: 'payment-1',
      content: 'Payment on delivery'
    },
    {
      id: 'payment-2',
      content: 'Payment with Paypal'
    }
  ]
  const onSubmit = async(data: FormInfo) => {
    const currentDate = new Date()
    const eddDate = getNextDay(currentDate,12)
    const token = await GetToken()
    const dataOrder:OrderInsertType = {
      order:[
        {
          fullName:data.nameUser,
          phone:data.phone,
          address:data.address,
          costs:cost,
          method:paymentMethod,
          edd:eddDate.toISOString().split("T")[0],
          paymentStatus:paymentDetail? "paid" : "unpaid"
        }
      ],
      listId:listCheckOut
    }
    token && (
      orderInsert(token,dataOrder)
      .then(res => {
        alert(res.message)
        if(res.status === 201){
          //delete items
        }
      }),
      insertPayment(token,paymentDetail)
    )
  }
  return <div className="info-checkout w-[95%] sm:w-4/5 md:w-2/5 lg:w-[30%] h-full flex flex-col items-center">
    {user && user.map((u: UserType) => <form key={`form-checkout-${u.idUser}`} className="w-full flex flex-wrap justify-between items-center">
      <Input
        {...register('nameUser', { required: true })}
        type="text" label="Name" size="sm" radius="sm" variant="underlined"
        classNames={{ inputWrapper: arrClassNameInput }}
        defaultValue={u.nameUser}
      />
      <Input
        {...register('phone', { required: true })}
        type="text" label="Phone" size="sm" radius="sm" variant="underlined"
        classNames={{ inputWrapper: arrClassNameInput }}
        defaultValue={u.phone}
      />
      <Input
        {...register('address', { required: true })}
        type="text" label="Address" size="sm" radius="sm" variant="underlined"
        classNames={{ inputWrapper: arrClassNameInput }}
        className="w-[90%] truncate pr-2"
        value={currentAddress}
      />
      <Button isIconOnly size="sm" radius="sm" color="primary" className="flex items-center justify-center" onPress={onOpen}>
        {user && user[0].address.length !== 0 ? <FaEdit /> : <IoMdAdd />}
      </Button>
    </form>)}
    <div className="method-checkout w-full my-1 rounded-md bg-zinc-600 p-1">
      <div className="w-[95%] flex justify-between">
        Total product: <span>{data.length}</span>
      </div>
      <div className="w-[95%] flex justify-between">
        Count product: <span>{data.length !== 0 ? data.map((d: CartType) => d.countProduct).reduce((a: number, b: number) => a + b) : 0}</span>
      </div>
      <div className="w-[95%] flex justify-between">
        Total price: <span>{data.length !== 0 ? data.map((d: any) => (d.countProduct * d.detail[0].price) - ((d.detail[0].price * d.countProduct * d.detail[0].discount) / 100)).reduce((a: number, b: number) => a + b).toFixed(2) : 0}</span>
      </div>
      {/* Shipping method */}
      <h2>Shipping method</h2>
      <div className="w-full flex justify-around">
        {arrShippingMethod.map((s: Method) => <div
          key={s.id}
          onClick={() => { setCost(s.costs!) }}
          className={`shipping-box ${cost === s.costs ? 'bg-zinc-100 text-zinc-900' : 'bg-transparent'} flex flex-col justify-center items-center w-[45%] h-auto min-h-[80px] rounded-md hover:bg-zinc-100 hover:text-zinc-900 border border-solid border-zinc-200 cursor-pointer transition-all`}>
          <span>{s.content}</span>
          <span>Cost: {s.costs}$</span>
          <span>Delivery time: {s.date} day</span>
        </div>)}

      </div>
      <h2>Payment method</h2>
      <div className="w-full flex justify-around">
        {arrPaymentMethod.map((m: Method) => <div key={m.id}
          onClick={() => { setIsPayment(m.id === "payment-1" ? true : false); cost !== 0 ? setPaymentMethod(m.content) : alert('Select shipping method!') }}
          className={`payment-box flex justify-center items-center w-[45%] ${paymentMethod === m.content ? 'bg-zinc-100 text-zinc-900' : 'bg-transparent'} border border-solid border-zinc-100 rounded-md cursor-pointer`}>
          {m.content}
        </div>)}
      </div>
      {/* Payment method */}
      {paymentMethod === "Payment with Paypal" && <PaymentPaypal dataItem={data} cost={cost} setIsPayment={setIsPayment} setPaymentDetail={setPaymentDetail} />}
    </div>
    {isPayment && <Button
      onClick={() => { handleSubmit(onSubmit)() }}
      color="success"
      size="sm"
      radius="sm"
      className="w-2/5 text-white font-semibold text-[20px]"
    >
      Order
    </Button>}
    <Modal isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="lg"
      backdrop="opaque"
      placement="center">
      {user && user[0].address.length !== 0
        ? <ModalEditAddress currentAddress={currentAddress} setCurrentAddress={setCurrentAddress} />
        : <ModalAddress />}
    </Modal>
  </div>
}

export default InfoCheckout