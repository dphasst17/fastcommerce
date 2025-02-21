import { useContext, useEffect, useState } from "react"
import { useFetchDataByKey } from "../../../hooks/useFetchData"
import { Button, Code, Input, ModalBody, ModalContent, ModalFooter, Textarea } from "@nextui-org/react"
import { StateContext } from "../../../context/state"
import { RxUpdate } from "react-icons/rx";
import { useForm } from "react-hook-form";
import { productUpdate } from "../../../api/product";
interface ObjectKeys {
  [key: string]: string | number | undefined;
}

interface ProductEditType extends ObjectKeys {
  nameProduct: string,
  price: number,
  des: string,
  brand: string
}
const ModalEdit = ({ id, nameType, setModalName }: { id: number | string, nameType: number | string, setModalName: React.Dispatch<React.SetStateAction<string>> }) => {
  const { data } = useFetchDataByKey('product', 'productGetDetail', { nameType: nameType, idProduct: id })
  const { data: col } = useFetchDataByKey('product', 'getColByType', nameType)
  const { register: regisInfo, handleSubmit: submitInfo } = useForm()
  const { register: regisDetail, handleSubmit: submitDetail } = useForm()
  const { isDark,setProduct,product } = useContext(StateContext)
  const [detailData, setDetailData] = useState<any[] | null>(null)
  const [column, setColumn] = useState<any[] | null>(null);
  useEffect(() => {
    data && setDetailData(data.data)
    col && setColumn(col.data)
  }, [data, col])
  const onSubmitInfo = (data: ObjectKeys) => {
    const formatData: ObjectKeys = { ...data, price: Number(data.price) }
    const currentData = detailData?.map((e: ProductEditType) => ({
      nameProduct: e.nameProduct,
      price: e.price,
      brand: e.brand,
      des: e.des
    }))
    const keys = ["nameProduct", "price", "brand", "des"] as const;
    const changedKeys = currentData && keys.filter((key) => {
      return currentData[0][key] !== formatData[key];
    });
    const dataUpdate = currentData && changedKeys?.reduce((k:any,key:string) => {
      return {...k,[key]:formatData[key]}
    },{})
    const table = "products"
    const condition = {
      name: "idProduct",
      value: Number(id)
    }
    changedKeys && changedKeys.length!==0 && productUpdate({ tableName: table, condition: condition, data_update: [dataUpdate] })
      .then(res => {
        if(res.status !== 200 ){
          return console.log(res.message)
        }
        alert(res.message)
        setProduct(product.map((prevP:any) => {
          return prevP.idProduct === id ? {...prevP,...dataUpdate} : {...prevP}
        }))
      })
  }
  const onSubmitDetail = (data: ObjectKeys) => {
    const { id, ...d } = data
    const table = detailData && detailData[0].nameType
    const currentData = detailData && detailData[0].detail.filter((d: any) => d.id === Number(data.id))

    const changedKeys = (Object.keys(d)).filter((key: string) => {
      return (typeof (currentData[0][key]) === "number" ? Number(currentData[0][key].toFixed(1)) : currentData[0][key])
        !== (typeof (currentData[0][key]) === "number" ? Number(d[key]) : d[key]);
    });
    const dataUpdate = changedKeys.reduce((k: any, key: string) => {
      return { ...k, [key]: (typeof (currentData[0][key]) === "number" ? Number(d[key]) : d[key]) }
    }, {})
    const condition = {
      name: "id",
      value: Number(id)
    }
    changedKeys.length !== 0 && productUpdate({ tableName: table, condition: condition, data_update: [dataUpdate] })
      .then(res => res.status === 200 ? alert(res.message) : console.log(res.message))
  }
  return <ModalContent>
    {(onClose) => (
      <>
        <ModalBody key="Modal-edit"
          className={`w-full h-screen overflow-y-auto ${isDark ? "text-zinc-50" : "text-zinc-950"}`}>
          <div className="container mx-auto px-4">
            {detailData && detailData.map((d: any) => <div className="w-full flex flex-wrap justify-around items-center" key={`detail-${d.idProduct}`}>
              <div className="w-full h-1/4 xl:h-full flex flex-wrap justify-around">
                {/* Product Name */}
                <div className="w-full flex flex-row items-start justify-evenly">
                  {d.imgProduct.map((i: { img: string, type: string }) =>
                    <button
                      key={i.img}
                      className={`flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 hover:border-blue-500 transition-all text-center`}>
                      <img className="h-full w-full object-contain" src={i.img} alt="" />
                    </button>
                  )}
                </div>
                <Input {...regisInfo('nameProduct', { required: true })} defaultValue={d.nameProduct} className={`w-2/4 text-2xl font-bold sm:text-3xl ${isDark ? "text-zinc-50" : "text-zinc-950"} my-1`} />
                <Input {...regisInfo('price', { required: true })} type="text" defaultValue={d.price} className="w-[24%] my-1" />
                <Input {...regisInfo('brand', { required: true })} type="text" defaultValue={d.brand} className="w-[24%] my-1" />
                <Textarea
                  {...regisInfo('des')}
                  labelPlacement="outside"
                  placeholder="Enter your description"
                  defaultValue={d.des}
                  className="w-[99%] my-1"
                />
                <Button color="danger" onClick={() => submitInfo(onSubmitInfo)()}>Update</Button>
              </div>
              <div className="detail-product w-full h-auto flex flex-wrap justify-start items-center">
                {d.detail.map((d: any, i: number) => <div
                  className="xl:w-[49%] h-auto rounded-md p-2 cursor-pointer"
                  key={`detail-info-${d.id}`}>
                  <Code className="bg-zinc-950 text-zinc-50">Option {i + 1}</Code>
                  <Button color="danger" isIconOnly size="sm" className="mx-1" onClick={() => submitDetail(onSubmitDetail)()}>
                    <RxUpdate />
                  </Button>
                  <Input {...regisDetail('id')} type="number" value={d.id} />
                  {column?.map((k: any) =>
                    <Input {...regisDetail(`${k.name}`)} radius="sm" className="my-1" type={typeof (d[k.name]) === "number" ? "number" : "text"}
                      defaultValue={typeof (d[k.name]) === "number" ? (d[k.name]).toFixed(1) : d[k.name]} key={`${d.id}-${k.name}`} />
                  )}

                </div>)}
              </div>
            </div>)}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={() => { setModalName && setModalName(""); onClose() }}>
            Close
          </Button>
        </ModalFooter>
      </>
    )}
  </ModalContent>
}

export default ModalEdit