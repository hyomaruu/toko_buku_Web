"use client";

// import { Metadata } from "next";
import { Admin, addAdmin, getAdmin, updateAdmin } from "@toko-buku/controllers/admin";
import { Response } from "@toko-buku/controllers/global";
import { FormEvent, useEffect, useRef, useState } from "react";
import { redirect } from 'next/navigation'
import { Dropdown } from "flowbite-react";
import { Member, getMember, updateMember } from "@toko-buku/controllers/member";


// export const generateMetadata = (): Metadata => {
//   return {
//     title: `Tambah User`,
//   };
// };

export default function Page(
  {
    params,
  }: {
    params: { member: string };
  }
) {
  const initialized = useRef(false)

  const [dataForm, setDataForm] = useState<any | undefined | null>();

  const [isFetchLoading, setFetchLoading] = useState<boolean>(true)
  const [isLoading, setLoading] = useState<boolean>(false)

  const handleFetchData = (memberData: string) => {
      setFetchLoading(true)
      getMember(memberData).then((response: Response<Member>) => {
        if(response?.data) {
          setDataForm({
            ...dataForm,
            nama_lengkap: response?.data?.nama_lengkap,
            telepon: response?.data?.telepon,
            alamat: response?.data?.alamat,
            email: response?.data?.email,
          })
        }
      }).finally(() => {
          setFetchLoading(false)
      });
  }

  useEffect(() => {
    if (!initialized.current) {
      handleFetchData(params?.member)
      initialized.current = true
    }
  },[])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    setLoading(true)
    event.preventDefault()
 
    const formData: any = new FormData(event.currentTarget)
    const payload: any = {};
    for (const [key, val] of formData) {
      payload[key] = val;
    } 

    const response: Response<Member> = await updateMember(params?.member, payload)

    
    setTimeout(() => {
      setLoading(false)

      if(response?.data){
        window.location.href = '/members'
      }
    }, 3000);
  }
  
  return (
    <>
      <div className="my-10">
        <div className="flex items-center justify-between mb-8">
              <h1 className="font-semibold text-xl ">Edit Member</h1>
        </div>

        <form onSubmit={onSubmit}>
            <div className="grid gap-16 mb-10 md:grid-cols-2">
              <div className="text-lg">
                Berikut merupakan form edit member.
                <br />
                Isilah data-data yang diperlukan agar dapat mengubah member didalam aplikasi.
                <br />
                <br />
              </div>
              
              <div className="space-y-6">
                  <div>
                    <label htmlFor="nama_lengkap" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Lengkap</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                        </svg>
                      </span>
                      <input value={dataForm?.nama_lengkap} onChange={(e) => setDataForm({...dataForm, nama_lengkap: e?.target?.value})} type="text" id="nama_lengkap" name="nama_lengkap"  className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Masukan nama lengkap" required/>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <div className="relative mb-6">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                        </svg>
                      </div>
                      <input value={dataForm?.email} onChange={(e) => setDataForm({...dataForm, email: e?.target?.value})} type="text" id="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="test@gmail.com" required/>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="telepon" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telepom</label>
                    <div className="relative mb-6">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M5 4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4Zm12 12V5H7v11h10Zm-5 1a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z" clipRule="evenodd"/>
                      </svg>
                      </div>
                      <input value={dataForm?.telepon} onChange={(e) => setDataForm({...dataForm, telepon: e?.target?.value})} type="phone" id="telepon" name="telepon" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Contoh: 02123456789" required/>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="alamat" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Alamat</label>
                    <div className="flex">
                      <textarea value={dataForm?.alamat} onChange={(e) => setDataForm({...dataForm, alamat: e?.target?.value})} rows={6} id="alamat" name="alamat" className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Masukan alamat" required></textarea>
                    </div>
                  </div>

                  <button disabled={isLoading || isFetchLoading} type="submit" 
                  className={ (isLoading || isFetchLoading ? "opacity-60" : "")  +  " text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"}
                  >
                      {(!isLoading && !isFetchLoading) && 
                        "Kirim"
                      }

                      {isLoading && 
                        "Sedang diproses..."
                      }

                      {isFetchLoading && 
                        "Sedang mengambil data..."
                      }
                    </button>
              </div>
            </div>
        </form>
      </div>
    </>
  );
}
