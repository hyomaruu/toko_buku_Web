'use client'
import { Admin, UserRole, findUserRole, getAdmins } from "@toko-buku/controllers/admin";
import { SearchbarComponent, CommonSuccessAlert } from "@toko-buku/components";
import { ResponseArray } from "@toko-buku/controllers/global";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
// import { Metadata } from "next";

// export const generateMetadata = (): Metadata => {
//   return {
//     title: `Daftar User`,
//   };
// };

export default function UsersPage() {
  const initialized = useRef(false)

  const [data, setData] = useState<Admin[] | undefined | null>();
  const [isLoading, setLoading] = useState<boolean>(true);

  const handleFetchData = (params?: any) => {
      setLoading(true)
      getAdmins(params).then((response: ResponseArray<Admin>) => {
        if(response.data?.length) setData(response.data)
      }).finally(() => {
          setLoading(false)
      });
  }

  useEffect(() => {
    if (!initialized.current) {
      handleFetchData()
      initialized.current = true
    }
  },[])

  const onDataReceived = (data:any) => {
    handleFetchData(data)
  };

  return (
    <>
    {/* <CommonSuccessAlert text="Lorem ipsum dolor sit amet"></CommonSuccessAlert> */}
      <div className="my-10" >
        <div className="flex items-center justify-between mb-8">
            <h1 className="font-semibold text-xl ">Daftar User</h1>
            <Link href='/users/add'>
              <button 
              type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Tambah User</button>
            </Link>
        </div>

        <div className="mb-8">
          <SearchbarComponent onDataReceived={onDataReceived}></SearchbarComponent>
        </div>

        <div className={"relative overflow-x-auto"}>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nama
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Role
                        </th>
                        <th scope="col" className="px-6 py-3">
                            
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {!isLoading && data?.map((admin: Admin) => {
                      return (
                        <tr key={admin.Id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {admin.Name}
                        </th>
                        <td className="px-6 py-4">
                            {admin.Username}
                        </td>
                        <td className="px-6 py-4">
                            { findUserRole(admin?.Role as UserRole)?.text }
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex justify-center items-center space-x-4">
                                <a href={`/users/${admin.Id}`}>
                                <svg className="w-6 h-6 text-gray-800 dark:text-white hover:text-yellow-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                                </svg>
                                </a>
                                <a href="">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white hover:text-red-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                </svg>
                                </a>
                            </div>
                        </td>
                        </tr>
                      )
                    })}

                    {isLoading && [0,0,0,0,0]?.map((val, index) => {
                      return (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 max-w-sm animate-pulse">
                          <div className="w-64 h-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        </th>
                        <td className="px-6 py-4 max-w-sm animate-pulse">
                          <div className="w-48 h-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        </td>
                        <td className="px-6 py-4 max-w-sm animate-pulse">
                          <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        </td>
                        <td className="px-6 py-4 max-w-sm animate-pulse">
                          <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        </td>
                        </tr>
                      )
                    })}
                </tbody>
            </table>
        </div>


       
      </div>
    </>
  );
}
