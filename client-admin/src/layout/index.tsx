/* import { useContext } from "react" */
/* import LoadingComponent from "../loading/loadingComponent" */
import { useLocation } from "react-router-dom"
/* import { StateContext } from "../../context/stateContext" */
import Header from "./header"
import Auth from "../pages/auth"


const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()
  /* const {isLoading} = useContext(StateContext) */
  return location.pathname !== "/auth" ?
    <section className="max-w-full w-full !h-screen flex flex-wrap content-start justify-center thumbnails-color z-40">
      {/* {isLoading && <LoadingComponent />} */}
      <Header />
      <main className="w-full h-auto min-h-[99vh] overflow-y-auto thumbnails-color">
        <div className="w-full h-auto">{children}</div>
      </main>
    </section>
    : <Auth />
}

export default Layout