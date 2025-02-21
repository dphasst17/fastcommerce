import BtnList from "./btn"
import TableCategory from "./tableCategory"
import TableProduct from "./tableProduct"

const Product = () => {
  return <div className=" w-full h-auto min-h-screen flex flex-wrap justify-around items-center thumbnails-color z-0 pt-2 pb-40 sm:pb-20">
    <BtnList />
    <TableCategory/>
    <TableProduct />
  </div>
}

export default Product