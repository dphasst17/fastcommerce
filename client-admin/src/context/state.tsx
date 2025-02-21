import { createContext, useEffect, useState } from "react";
import { getLocalStorage } from "../utils/localStorage";
import Cookies from "js-cookie";
interface statisticalType {
    product: any[] | null,
    user: any[] | null,
    revenue: any[] | null
}

export const StateContext = createContext<any>({});
export const StateProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const [isDark, setIsDark] = useState<boolean>(false)
    const [statistical, setStatistical] = useState<statisticalType>({ product: null, user: null, revenue: null })
    const [product,setProduct] = useState<any[]|null>(null)
    useEffect(() => {
        document.body.classList.remove(!isDark ? 'dark' : 'light')
        document.body.classList.add(isDark ? 'dark' : 'light')
    }, [isDark])
    useEffect(() => {
        const isDark = getLocalStorage('isDark')
        const log = Cookies.get('a-login')
        setIsDark(isDark)
        setIsLogin(log === "true" ? true : false)
    }, [])
    return (
        <StateContext.Provider value={{
            isLoading,setIsLoading,
            isLogin, setIsLogin,
            isDark, setIsDark,
            statistical, setStatistical,
            product,setProduct
        }}>
            {children}
        </StateContext.Provider>
    )
}