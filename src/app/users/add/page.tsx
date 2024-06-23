"use client";

// import { Metadata } from "next";
import { Admin, addAdmin } from "@toko-buku/controllers/admin";
import { Response } from "@toko-buku/controllers/global";
import { FormEvent, useState } from "react";
import { redirect } from 'next/navigation'
import { Dropdown } from "flowbite-react";


// export const generateMetadata = (): Metadata => {
//   return {
//     title: `Tambah User`,
//   };
// };

export default function UsersAddPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    setIsLoading(true)

    event.preventDefault()
 
    const formData: any = new FormData(event.currentTarget)
    const payload: any = {};
    for (const [key, val] of formData) {
      payload[key] = val;
    } 

    const response: Response<Admin> = await addAdmin(payload)

    
    setTimeout(() => {
      setIsLoading(false)

      if(response?.data){
        window.location.href = '/users'
      }
    }, 3000);
  }
  
  return (
    <>
      <div className="my-10">
        <div className="flex items-center justify-between mb-8">
              <h1 className="font-semibold text-xl ">Tambah User</h1>
        </div>

        <form onSubmit={onSubmit}>
            <div className="grid gap-16 mb-10 md:grid-cols-2">
              <div className="text-lg">
                Berikut merupakan form tambah user.
                <br />
                Isilah data-data yang diperlukan agar dapat menambahkan user kedalam aplikasi.
                <br />
                <br />
                <div className="p-4 italic bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  Hanya user dengan role <span className="font-bold">Pemilik</span> saja yang dapat menambahkan user baru.
                </div>
              </div>
              <div className="space-y-6">
                  <div>
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <div className="relative mb-6">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                        </svg>
                      </div>
                      <input type="text" id="username" name="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="test@gmail.com" required/>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Lengkap</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                        </svg>
                      </span>
                      <input type="text" id="name" name="nama_lengkap"  className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Masukan nama lengkap" required/>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z" clipRule="evenodd"/>
                        </svg>
                      </span>
                      <input type="password" id="password" name="password" className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Masukan password" required/>
                    </div>
                  </div>

                  <div>
                  {/* <Dropdown className='-ml-4 w-36 rounded-lg' label="Urutkan" placement="bottom-start" dismissOnClick={true} renderTrigger={() => 
                        {
                          if(selectedSort) return <span className='flex items-center space-x-2'><span>Urutkan : {selectedSort.text}</span> <IoChevronDown></IoChevronDown></span>
                          return <span className='flex items-center space-x-2'><span>Urutkan</span> <IoChevronDown></IoChevronDown></span>
                        }
                    }>
                    <Dropdown.Item className={`${selectedSort?.option === SORT.ASC ? 'font-extrabold' : ''}`} onClick={() => sortSelect({option: SORT.ASC, text: "Menaik"})}>
                      Menaik
                    </Dropdown.Item>
                    <Dropdown.Item className={`${selectedSort?.option === SORT.DSC ? 'font-extrabold' : ''}`} onClick={() => sortSelect({option: SORT.DSC, text: "Menurun"})}>
                      Menurun
                    </Dropdown.Item>
                    <Dropdown.Item  onClick={() => sortSelect(null)}>
                      <span className='text-xs italic text-red-400'>Hapus</span>
                    </Dropdown.Item>
                  </Dropdown> */}
                  
                    <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                    <select id="role" name="role" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                      <option defaultChecked>Pilih Role</option>
                      <option value="OWNER">Pemilik</option>
                      <option value="CASHIER">Kasir</option>
                      <option value="STAFF">Staf</option>
                    </select>
                  </div>

                  <button disabled={isLoading} type="submit" 
                  className={ (isLoading ? "opacity-60" : "")  +  " text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"}
                  >
                      {!isLoading && 
                        "Kirim"
                      }

                      {isLoading && 
                        "Sedang diproses..."
                      }
                    </button>
              </div>
             
            </div>
           
        </form>
      </div>
    </>
  );
}
