import CurrentUser from "./current"
import Staff from "./staff"
import User from "./user"
import Address from "./address"
import { StateContext } from "../../context/state"
import { useContext } from "react"
const Account = () => {
  const {isDark} = useContext(StateContext)
  return <div className={`user w-full h-auto flex flex-wrap justify-around items-center ${isDark ? 'text-zinc-50' : 'text-zinc-900'}`}>
    <CurrentUser />
    <Staff />
    <User />
    <Address />
  </div>
}

export default Account