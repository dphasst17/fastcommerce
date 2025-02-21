import { useContext, useState } from "react"
import SignIn from "./signIn"
import { authForgot, authLogin, authRegister } from "../../api/auth"
import { SaveToken } from "../../utils/token"
import { setLocalStorage } from "../../utils/localStorage"
import { useNavigate } from "react-router-dom"
import { StateContext } from "../../context/stateContext"
import SignUp from "./signUp"
import Forgot from "./forgot"

const Auth = () => {
  const { setIsLogin } = useContext(StateContext)
  const [formName, setFormName] = useState<string>("signIn")
  const navigate = useNavigate()
  const handleAuth = (typeAuth: string, data: any) => {
    let url;
    switch (typeAuth) {
      case 'login':
        url = authLogin;
        break;
      case 'register':
        url = authRegister;
        break;
      case 'forgot':
        url = authForgot;
        break;
    }
    url && url(data).then((res: { status: number, message?: string, data?: any }) => {
      res.message && alert(res.message)
      if (res.status === 200 || res.status === 201) {
        if (typeAuth === "login") {
          SaveToken('aTk', res.data.accessToken, res.data.expiredA)
          SaveToken('rTk', res.data.refreshToken, res.data.expiredR)
          setLocalStorage('isLogs', true)
          setIsLogin(true)
          navigate('/')
        }
        (typeAuth === "register" || typeAuth === "forgot") && setFormName("signIn")
        
      }

    })
  }
  return <div className="auth w-full h-screen flex flex-wrap">
    <div className="background-auth w-2/4 h-full flex items-center justify-center">
      <img src="https://raw.githubusercontent.com/dphasst17/techWEB/main/src/Pages/Login/ImageLogin/icon_login.png" />
    </div>
    <div className="authForm w-2/4 h-full flex items-center justify-center">
      {formName === "signIn" && <SignIn handleAuth={handleAuth} setFormName={setFormName} />}
      {formName === "signUp" && <SignUp handleAuth={handleAuth} setFormName={setFormName} />}
      {formName === "forgot" && <Forgot handleAuth={handleAuth} setFormName={setFormName} />}
    </div>
  </div>
}

export default Auth