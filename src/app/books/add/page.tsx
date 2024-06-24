"use client";

// import { Metadata } from "next";
import { Book, addBook } from "@toko-buku/controllers/book";
import { Response } from "@toko-buku/controllers/global";
import { FormEvent, useState } from "react";
import { redirect } from 'next/navigation'
import { Dropdown } from "flowbite-react";


// export const generateMetadata = (): Metadata => {
//   return {
//     title: `Tambah User`,
//   };
// };

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    setIsLoading(true)

    event.preventDefault()
 
    const formData: any = new FormData(event.currentTarget)
    const payload = new FormData();

    for (const [key, val] of formData) {
      payload.append(key, val);
    } 

    // formData?.get

    const response: Response<Book> = await addBook(payload)

    
    setTimeout(() => {
      setIsLoading(false)

      if(response?.data){
        window.location.href = '/books'
      }
    }, 3000);
  }
  
  return (
    <>
      <div className="my-10 pb-10 h-screen overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
              <h1 className="font-semibold text-xl ">Tambah Buku</h1>
        </div>

        <form onSubmit={onSubmit}>
            <div className="grid gap-16 mb-10 md:grid-cols-2">
              <div className="text-lg">
                Berikut merupakan form tambah buku.
                <br />
                Isilah data-data yang diperlukan agar dapat menambahkan buku kedalam aplikasi.
                <br />
                <br />
                <div className="p-4 italic bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  Hanya user dengan role <span className="font-bold">Staf dan Pemilik</span> saja yang dapat menambahkan buku baru.
                </div>
              </div>
              <div className="space-y-6">
                  <div>
                    <label htmlFor="kode_buku" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kode Buku</label>
                    <div className="relative mb-6">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z" clipRule="evenodd"/>
                      </svg>
                      </div>
                      <input type="text" id="kode_buku" name="kode_buku" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Masukan kode buku" required/>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="nama_buku" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Buku</label>
                    <div className="relative mb-6">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M6 2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 1 0 0-2h-2v-2h2a1 1 0 0 0 1-1V4a2 2 0 0 0-2-2h-8v16h5v2H7a1 1 0 1 1 0-2h1V2H6Z" clipRule="evenodd"/>
                      </svg>
                      </div>
                      <input type="text" id="nama_buku" name="nama_buku" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Masukan nama buku" required/>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="deskripsi" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deskripsi</label>
                    <div className="flex">
                      <textarea rows={5} id="deskripsi" name="deskripsi" className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Masukan deskripsi" required></textarea>
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="gambar">Gambar</label>
                    <input id="gambar" name="gambar" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="gambar_help" id="gambar" type="file" accept="image/png,image/jpg"/>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="gambar_help">PNG or JPG.</p>
                  </div>

                  <div>
                    <label htmlFor="genre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Genre</label>
                    <select id="genre" name="genre" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                      <option defaultChecked>Pilih Genre</option>
                      <option value="Kuliner">Kuliner</option>
                      <option value="Pendidikan">Pendidikan</option>
                      <option value="Komik">Komik</option>
                      <option value="Biografi">Biografi</option>
                      <option value="Novel">Novel</option>
                      <option value="Keagamaan">Keagamaan</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="pengarang" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pengarang</label>
                    <div className="relative mb-6">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <input type="text" id="pengarang" name="pengarang" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Masukan nama pengarang" required/>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="penerbit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Penerbit</label>
                    <div className="relative mb-6">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M7 2a2 2 0 0 0-2 2v1a1 1 0 0 0 0 2v1a1 1 0 0 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H7Zm3 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm-1 7a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3 1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1Z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <input type="text" id="penerbit" name="penerbit" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Masukan nama penerbit" required/>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="harga" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Harga</label>
                    <div className="relative flex items-center mb-6">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 py-5 pointer-events-none text-sm w-4 h-4 text-gray-500 dark:text-gray-400">
                          Rp
                      </div>
                      <input type="number" id="harga" name="harga" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Masukan harga" required/>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="rilis" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal Rilis</label>
                    <div className="relative max-w-sm">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                        </svg>
                      </div>
                      <input type="date" id="rilis" name="rilis" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Masukan tanggal rilis"/>
                    </div>
                  </div>

                

                  {/* <div>
                    <label htmlFor="penerbit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Penerbit</label>
                    <div className="relative mb-6">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M7 2a2 2 0 0 0-2 2v1a1 1 0 0 0 0 2v1a1 1 0 0 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H7Zm3 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm-1 7a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3 1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1Z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <input type="text" id="penerbit" name="penerbit" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Masukan nama penerbit" required/>
                    </div>
                  </div> */}
{/* 
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
                    <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                    <select id="role" name="role" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                      <option defaultChecked>Pilih Role</option>
                      <option value="OWNER">Pemilik</option>
                      <option value="CASHIER">Kasir</option>
                      <option value="STAFF">Staf</option>
                    </select>
                  </div> */}

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
