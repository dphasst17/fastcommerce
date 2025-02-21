import { TfiDashboard } from "react-icons/tfi";
import { FaLaptopCode,FaUserCog,FaLuggageCart,FaCaretDown  } from "react-icons/fa";
import { BsFillPostcardFill } from "react-icons/bs";
import { MdOutlineDiscount,MdOutlineWarehouse,MdDarkMode,MdLightMode   } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { IconType } from "react-icons";
import { Button } from "@nextui-org/react";
import { useContext, useState } from "react";
import { StateContext } from "../context/state";
import { useNavigate } from "react-router-dom";
interface NavContent{
  idNav:number,
  content:string,
  icon:IconType,
  url:string,
  delay:string
}
const arrNav:NavContent[] = [
  {
    idNav:1,
    content:'Dashboard',
    icon:TfiDashboard,
    url:'/',
    delay:'0'
  },
  {
    idNav:2,
    content:'Product',
    icon:FaLaptopCode,
    url:'/product',
    delay:'5'
  },
  {
    idNav:3,
    content:'Account',
    icon:FaUserCog,
    url:'/account',
    delay:'10'
  },
  {
    idNav:4,
    content:'Post/Blog',
    icon:BsFillPostcardFill,
    url:'/post',
    delay:'15'
  },
  {
    idNav:5,
    content:'Order',
    icon:FaLuggageCart,
    url:'/order',
    delay:'20'
  },
  {
    idNav:6,
    content:'Event',
    icon:MdOutlineDiscount,
    url:'/event',
    delay:'25'
  },
  {
    idNav:7,
    content:'Warehouse',
    icon:MdOutlineWarehouse,
    url:'/warehouse',
    delay:'30'
  }
]
const Header = () => {
  const {isDark,setIsDark} = useContext(StateContext)
  const [toggleNav,setToggleNav] = useState<boolean>(true)
  const navigate = useNavigate()

  const handleSetDarkMode = () => {
    setIsDark(!isDark)
    localStorage.setItem('isDark',JSON.stringify(!isDark))
  }


  return <header className={`w-[98vw] h-[18vh] ssm:h-[16vh] md:h-[7vh] flex flex-wrap justify-between sm:justify-around content-around transition-all fixed bottom-2 z-50 rounded-md`}>
    <div className="buttonNav w-full md:w-1/5 h-full max-h-[62px] flex items-center md:justify-evenly">
      <Button style={{zIndex:"9999"}} isIconOnly color="primary" size="md" onClick={() => {setToggleNav(!toggleNav)}} className="h-4/5 !z-50">
        <FaCaretDown className={`text-[20px] ${toggleNav ? 'rotate-0' : '-rotate-180'} transition-all`} />
      </Button>
      <Button isIconOnly 
      className={`h-4/5 ${toggleNav ? 'translate-y-0' : 'translate-y-80'} ${isDark ? 'bg-zinc-100' : 'bg-zinc-950'} transition-all ml-1`} 
      onClick={() => handleSetDarkMode()}>
        {isDark ? <MdLightMode className="text-zinc-900 text-[20px]" /> : <MdDarkMode className="text-zinc-100 text-[20px]" />}
      </Button>
      <Button className={`w-[60px] md:w-2/4 max-w-[150px] h-4/5 ${toggleNav ? 'translate-y-0' : 'translate-y-80'} mx-1 md:mx-0`} color="danger">
        <IoIosLogOut className="w-2/4 h-4/5" />
        <span className="hidden md:block">LOGOUT</span>
      </Button>
    </div>
    <nav className={`w-full md:w-4/5 h-full max-h-[62px] flex flex-wrap justify-around items-center`}>
      {arrNav.map((a:NavContent) => <div key={a.idNav}
      onClick={() => navigate(a.url)}
      className={`w-[12%] h-4/5 flex items-center justify-center ${isDark ? 'bg-zinc-300 hover:bg-white text-zinc-950' : 'bg-zinc-800 hover:bg-zinc-950 text-zinc-100'} rounded-lg p-1 cursor-pointer 
      ${toggleNav ? 'translate-y-0' : 'translate-y-80'} transition-transform`} style={{transitionDelay:`${a.delay}0ms`}}>
        <a.icon className="text-[20px] md:text-[25px] lg:text-[30px]" />
        <span className="mx-2 hidden xl:block">{a.content}</span>
      </div>)}
    </nav>
  </header>
}

export default Header