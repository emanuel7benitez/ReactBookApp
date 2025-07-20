import { Link } from "react-router-dom"
import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom"

const Layout = ({ children }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <>
      <div className="relative flex size-full min-h-screen flex-col bg-[#101323] dark group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#21294a] px-10 py-3">
          <div className="flex items-center gap-4 text-white">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path></svg>
            </div>
            <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">TaskMaster</h2>
          </div>
          {user && <>
          <div className="flex flex-1 justify-end gap-8">
            <ul className="flex items-center gap-9">
             <Link to="/">
                  <li className="text-white text-sm font-medium leading-normal">Home</li>
             
             </Link> 
             <Link to={'/dashboard'}>
             
              <li className="text-white text-sm font-medium leading-normal">Dashboard</li>
             </Link>
              <li onClick={handleLogout} className="text-white text-sm font-medium leading-normal cursor-pointer">Logout</li>
            </ul>
          </div>
              </>}
        </header>
        {children}
      </div>
    </div>
    </>
  )
}

export { Layout }