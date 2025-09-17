import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Menu, X } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { SignIn, useUser } from '@clerk/clerk-react'

const Layout = () => {
  const navigate = useNavigate()
  const [sidebar, setSidebar] = useState(false)
  const { user } = useUser()

  return user ? (
    <div>
      {/* Navbar */}
      <nav
        className="w-full px-8 min-h-12 flex items-center justify-between 
        bg-black/70 backdrop-blur-xl
        fixed top-0 left-0 z-50"
      >
        <img
          src={assets.logo}
          alt="logo"
          className="h-10 sm:h-12 cursor-pointer object-contain"
          onClick={() => navigate('/')}
        />
        {sidebar ? (
          <X
            onClick={() => setSidebar(false)}
            className="w-6 h-6 text-purple-300 sm:hidden cursor-pointer hover:text-white transition"
          />
        ) : (
          <Menu
            onClick={() => setSidebar(true)}
            className="w-6 h-6 text-purple-300 sm:hidden cursor-pointer hover:text-white transition"
          />
        )}
      </nav>

      {/* Page Content */}
      <div className="flex-1 w-full flex pt-14 h-[calc(100vh-56px)]">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />

        {/* Main content */}
        <div className="flex-1 bg-black overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  )
}

export default Layout
