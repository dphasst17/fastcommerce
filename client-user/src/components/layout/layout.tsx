import { useContext } from "react"
import LoadingComponent from "../loading/loadingComponent"
import { useLocation } from "react-router-dom"
import { StateContext } from "../../context/stateContext"
import Header from "./header"
import Auth from "../../pages/auth/auth"
import ScrollToTop from "./scrollToTop"
import Footer from "./footer"

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()
  const { isLoading } = useContext(StateContext)
  return location.pathname !== "/auth" ?
    <section className="w-full h-auto min-h-screen flex flex-wrap content-start justify-center">
      {isLoading && <LoadingComponent />}
      <Header />
      <main className="w-full h-auto min-h-[100vh] overflow-y-auto">
        <div className="w-full h-auto">{children}</div>
      </main>
      <Footer />
      <ScrollToTop />
    </section>
    : <Auth />
}

export default Layout