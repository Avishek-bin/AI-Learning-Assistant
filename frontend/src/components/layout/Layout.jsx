
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function Layout() {
  return (
    <div className="min-h-screen bg-[#060411] text-white">
      <Navbar />

      <main className="min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
