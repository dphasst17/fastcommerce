import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from "@nextui-org/react"
import { useLocation, useNavigate } from "react-router-dom"
import { BiSearchAlt2 } from "react-icons/bi";
import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import {GiLaptop} from "react-icons/gi";
import { FaRegNewspaper, FaRegUser } from "react-icons/fa";
import {IoIosNotifications} from "react-icons/io";
import {MdOutlineContactPhone} from "react-icons/md";
import { useContext, useState } from "react";
import { StateContext } from "../../context/stateContext";
import { CartContext } from "../../context/cartContext";
import { CartType } from "../../types/type";
import Product_layout_02 from "../../pages/product/layout/product_layout_02";
import { GetToken, RemoveToken } from "../../utils/token";
import { removeLocalStorage } from "../../utils/localStorage";
import { authLogout } from "../../api/auth";
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLogin, setIsLogin,setListCheckOut } = useContext(StateContext)
  const { cart } = useContext(CartContext)
  const [inputSearch, setInputSearch] = useState<string>("");
  const listNav = [
    {
      id: 1,
      name: 'HOME',
      url: '/',
      icon: AiOutlineHome
    },
    {
      id: 2,
      name: 'PRODUCT',
      url: '/product',
      icon: GiLaptop
    },
    {
      id: 3,
      name: 'POST',
      url: '/post',
      icon: FaRegNewspaper
    },
    {
      id: 4,
      name: 'CONTACT',
      url: '/contact',
      icon: MdOutlineContactPhone
    }
  ]
  const handleLogout = async () => {
    const token = await GetToken()
    token && authLogout(token)
      .then(res => {
        if (res.status === 200) {
          setListCheckOut([])
          RemoveToken('aTk')
          RemoveToken('rTk')
          removeLocalStorage('isLogs')
          setIsLogin(false)
          navigate('/auth')
        }
      })
  }
  const handleSearch = () => {
    inputSearch !== "" && navigate(`/search/${inputSearch}`)
  }
  return <header className={`sticky w-full bg-white bg-opacity-95 h-[11vh] flex flex-wrap justify-between sm:justify-around content-around transition-all top-0 z-50 rounded-md p-5`}>
    <div className="header-content bg-zinc-950 bg-opacity-85 rounded-lg w-[90%] h-full flex justify-around items-center">
      <nav className={`w-[98%] ssm:w-[85%] sm:w-[90%] md:w-[35%] lg:w-[45%] h-[30%] ssn:h-2/5 md:h-full flex justify-around items-center  bg-opacity-90 transition-all rounded-lg`}>
        {listNav.map((n: any) => <div
          key={`header-${n.id}`}
          onClick={() => { navigate(n.url) }}
          className={`w-1/5 h-4/5 flex items-center justify-evenly text-[17px] ${location.pathname === n.url ? "bg-zinc-950 bg-opacity-100 font-semibold" : "bg-transparent"} hover:bg-zinc-800 hover:font-semibold transition-all rounded-md cursor-pointer`}
        >
          <span>{<n.icon />}</span>
          <span className="hidden lg:block">{n.name}</span>
        </div>)}
      </nav>
      {/* Search */}
      <nav className={`w-[63%] ssm:w-[75%] sm:w-3/4 md:w-[35%] h-2/5 md:h-full flex justify-around items-center  bg-opacity-90 transition-all rounded-lg`}>
        <Input
          onChange={(e) => setInputSearch(e.target.value)}
          onKeyDown={(e: any) => { if (e.key === "Enter") { handleSearch() } }}
          type="search"
          radius="sm"
          className="w-4/5 placeholder-zinc-900"
          placeholder="Search..."
          startContent={
            <Button onClick={handleSearch} aria-label="button search" radius="sm" className="w-[10%] bg-transparent hover:bg-opacity-100" isIconOnly>
              <BiSearchAlt2 className="text-[20px] text-zinc-950" />
            </Button>
          }
          />
      </nav>
      <nav className={`w-[35%] ssm:w-1/5 sm:w-[20%] lg:w-[15%] xl:w-[10%] h-2/5 md:h-full flex justify-around items-center  bg-opacity-90 transition-all rounded-lg`}>
        {!isLogin && <Button radius="sm" onClick={() => { navigate('/auth') }} className="bg-red-600 text-zinc-50 font-semibold text-[20px]">Login</Button>}
        {isLogin && <Dropdown placement="top-end" offset={20} className="relative bg-zinc-700">
          <DropdownTrigger className="fixed">
            <Button radius="sm" isIconOnly className="relative !hidden sm:!flex justify-center items-center bg-transparent" aria-label="button-cart">
              <AiOutlineShoppingCart className="w-4/5 h-3/5 text-white" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu closeOnSelect={true} className="w-[500px] h-[450px]">
            {cart && cart.slice(0, 4).map((c: CartType) => <DropdownItem key={c.idCart}>
              <Product_layout_02 data={c} isButton={true} />
            </DropdownItem>)}
            <DropdownItem className="flex justify-center items-center" variant="light">
              <Button className="mx-auto" onClick={() => { navigate('/cart') }}>Detail</Button>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        }
        {isLogin && <Button radius="sm" isIconOnly aria-label="button-notification" className="bg-transparent">
          <IoIosNotifications className="w-4/5 h-3/5 text-white" />
        </Button>}
        {isLogin && <Dropdown placement="top-end" offset={20} className="bg-zinc-700">
          <DropdownTrigger>
            <Button radius="sm" isIconOnly aria-label="button-user" className="bg-transparent">
              <FaRegUser className="w-4/5 h-3/5 text-white" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu closeOnSelect={true}>
            <DropdownItem onClick={() => { navigate('/user'); }}>User</DropdownItem>
            <DropdownItem variant="light">
              <Button size="sm" radius="sm" color="danger" onClick={handleLogout}>Logout</Button>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        }
      </nav>
    </div>
  </header>
}

export default Header