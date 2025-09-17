import { Protect, useClerk, useUser } from '@clerk/clerk-react'
import {
  Eraser,
  FileText,
  Hash,
  House,
  Image,
  Scissors,
  SquarePen,
  Users,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/ai', label: 'Dashboard', Icon: House },
  { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen },
  { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash },
  { to: '/ai/generate-images', label: 'Generate Images', Icon: Image },
  { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser },
  { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors },
  { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText },
  { to: '/ai/community', label: 'Community', Icon: Users },
]

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser()
  const { signOut, openUserProfile } = useClerk()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={`${
        collapsed ? 'w-20' : 'w-64'
      } bg-black/70 backdrop-blur-xl text-gray-300 
      border-r border-purple-500/20
      flex flex-col justify-between max-sm:absolute top-1 bottom-0 
      ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'} 
      transition-all duration-300 ease-in-out`}
    >
      {/* Top user section */}
      <div className="my-5 w-full flex flex-col items-center">
        <img
          src={user?.imageUrl}
          alt="user avatar"
          className={`rounded-full border border-purple-500 transition-all ${
            collapsed ? 'w-10 h-10' : 'w-16 h-16'
          }`}
        />
        {!collapsed && (
          <h1 className="mt-2 text-center font-semibold text-white">
            {user?.fullName}
          </h1>
        )}
      </div>

      {/* Nav links */}
      <div className="flex-1 flex flex-col gap-1 px-2">
        {navItems.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/ai'}
            onClick={() => setSidebar(false)}
            className={({ isActive }) =>
              `relative group px-3 py-2 flex items-center gap-3 rounded-lg transition-all duration-300
              ${
                isActive
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500'
                  : 'hover:bg-white/5 hover:text-purple-200'
              }`
            }
          >
            <Icon className="w-5 h-5 shrink-0" />
            {!collapsed && <span className="truncate">{label}</span>}

            {/* Tooltip when collapsed */}
            {collapsed && (
              <span
                className="absolute left-full ml-3 px-3 py-1.5 text-xs font-medium 
                text-white bg-black/60 backdrop-blur-md border border-purple-500/40
                rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300
                whitespace-nowrap z-50"
              >
                {label}
              </span>
            )}
          </NavLink>
        ))}
      </div>

      {/* Collapse button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-2 m-3 rounded-lg hover:bg-purple-500/10 transition-colors self-end text-purple-300"
      >
        {collapsed ? (
          <ChevronRight className="w-5 h-5" />
        ) : (
          <ChevronLeft className="w-5 h-5" />
        )}
      </button>

      {/* Footer profile & logout */}
      <div className="w-full border-t border-purple-500/20 p-4 px-5 flex items-center justify-between bg-black/40 backdrop-blur-md">
        <div
          onClick={openUserProfile}
          className="flex gap-2 items-center cursor-pointer"
        >
          <img
            src={user.imageUrl}
            className="w-8 rounded-full border border-purple-500"
            alt="user avatar"
          />
          {!collapsed && (
            <div>
              <h1 className="text-sm font-medium text-white">
                {user.fullName}
              </h1>
              <p className="text-xs text-gray-400">
                <Protect plan="premium" fallback="Free">
                  Premium
                </Protect>{' '}
                Plan
              </p>
            </div>
          )}
        </div>
        <LogOut
          onClick={signOut}
          className="w-5 text-gray-400 hover:text-red-500 transition cursor-pointer"
        />
      </div>
    </div>
  )
}

export default Sidebar
