"use client";

import { Sidebar } from "flowbite-react";
import { usePathname } from 'next/navigation';
import { useState } from "react";
import { FaBook, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { GiPencilBrush } from "react-icons/gi";
import { HiOutlineMenuAlt2, HiShoppingBag, HiUser, HiUserGroup } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { PiSignOutFill } from "react-icons/pi";
import { TbTransactionDollar } from "react-icons/tb";


export function SidebarComponent() {

  const [isOpen, openSidebar] = useState<boolean>(false)
  const pathname = usePathname()

  return (
    <>

      <div className="flex sm:hidden justify-between items-center px-4 py-4 bg-gray-800 dark:text-gray-400">
          <button onClick={() => openSidebar(true) } data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
          </button> 
          <div className="flex items-center space-x-2">
            <div className="truncate">
              Halo, {'Abid'} 
              {/* Split name here */}
            </div>
            <FaUserCircle className="w-6 h-6 text-gray-600"></FaUserCircle>
          </div>
      </div>

      <Sidebar
      className={`${'fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0'} ${isOpen ? "translate-x-0" : ""}`}
      aria-label="Default sidebar example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item onClick={() => openSidebar(false) } icon={HiOutlineMenuAlt2}>
              Menu
          </Sidebar.Item>
        </Sidebar.ItemGroup>
       
        <Sidebar.ItemGroup>
          <Sidebar.Item active={pathname === '/'} href="/" icon={MdDashboard}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item active={pathname.includes('/users')} href="/users" icon={HiUser}>
            Users
          </Sidebar.Item>
          <Sidebar.Item active={pathname.includes('/members')} href="/members" icon={HiUserGroup}>
            Members
          </Sidebar.Item>
          <Sidebar.Collapse icon={HiShoppingBag} label="Barang">
            <Sidebar.Item active={pathname.includes('/books')} href="/books" icon={FaBook}>Buku</Sidebar.Item>
            <Sidebar.Item active={pathname.includes('/accessories')} href="/accessories" icon={GiPencilBrush}>Aksesoris</Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Item icon={FaShoppingCart} label="3" labelColor="red">
            Keranjang
          </Sidebar.Item>
          <Sidebar.Item icon={TbTransactionDollar}>
            Transaksi
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.CTA>
          <div className="mb-3 flex items-center">
            <div className="text-sm">Halo, {"Abid Fakhri Maulana"}</div>
          </div>
          <div className="mb-3 text-sm text-cyan-900 dark:text-gray-400">
            Selamat datang diaplikasi toko buku. Saat ini anda login sebagai {"Pemilik"}
          </div>
      </Sidebar.CTA>
        <Sidebar.ItemGroup>
          <Sidebar.Item className="fixed bottom-0 my-10" icon={PiSignOutFill}>
              Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
      </Sidebar>
    </>

  )
}
