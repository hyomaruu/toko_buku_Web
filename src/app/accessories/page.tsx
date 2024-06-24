'use client'
import { Accessoris, deleteAccessoris, getAccessories } from "@toko-buku/controllers/accessoris";
import { SearchbarComponent, CommonSuccessAlert } from "@toko-buku/components";
import { ResponseArray, Response } from "@toko-buku/controllers/global";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button, Modal } from "flowbite-react";
// import { Metadata } from "next";

// export const generateMetadata = (): Metadata => {
//   return {
//     title: `Daftar Accessoris`,
//   };
// };

export default function Page() {
  const initialized = useRef(false)

  const [data, setData] = useState<Accessoris[] | undefined | null>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState(false);

  const [seletedAccessoris, setSeletedAccessoris] = useState<Accessoris | null>();

  const handleDeleteAccessoris = (user: string) => {
    setLoading(true)
    deleteAccessoris(user).then((response: Response<Accessoris>) => {
      if(response?.data){
       console.log('Succesfully delete accessoris')
      }
    }).finally(() => {
        setOpenModal(false)
        handleFetchData()
    });
  }

  const handleFetchData = (params?: any) => {
      setLoading(true)
      getAccessories(params).then((response: ResponseArray<Accessoris>) => {
        if(response.data?.length) setData(response.data)
      }).finally(() => {
          setLoading(false)
      });
  }

  const handleFormatCurrency = (price: number) => {
    let idr = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    }).format(price);

    return idr
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
            <h1 className="font-semibold text-xl ">Daftar Aksesoris</h1>
            <Link href='/accessories/add'>
              <Button 
              disabled={isLoading}
              type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Tambah Aksesoris</Button>
            </Link>
        </div>

        <div className="mb-8">
          <SearchbarComponent 
          placeholder="Cari bedasarkan nama..."
          onDataReceived={onDataReceived}></SearchbarComponent>
        </div>

        <div className={"relative overflow-x-auto"}>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Aksesoris
                            {/* Image ,Name, Penerbit, Genre */}
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Deskripsi
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Harga
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Stok
                        </th>
                        <th scope="col" className="px-6 py-3">
                            
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {!isLoading && data?.map((accessoris: Accessoris) => {
                      return (
                        <tr key={accessoris.Id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <img src={accessoris.Image as string} className="bg-cover rounded-lg w-32 h-16" alt="" />
                            <div>
                              <a href={`/accessories/${accessoris.Id}`} >
                                <div className="hover:text-blue-400 font-semibold text-gray-900 dark:text-white mb-1">{accessoris.Name}</div>
                              </a>
                            </div>
                          </div>
                        </th>
                        <td className="px-6 py-4 w-80 line-clamp-1">
                            {accessoris.Deskripsi}
                        </td>
                        <td className="px-6 py-4">
                            {handleFormatCurrency(accessoris.Harga as number)}
                        </td>
                        <td className="px-6 py-4">
                            {accessoris.Stok}
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex justify-center items-center space-x-4">
                                {/* <a href={`/accessoriss/${accessoris.Id}`}>
                                <svg className="w-6 h-6 text-gray-800 dark:text-white hover:text-yellow-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                                </svg>
                                </a> */}
                                <button type="button" 
                                onClick={() => {
                                  setSeletedAccessoris(accessoris)
                                  setOpenModal(true)
                                }
                              }
                                >
                                  <svg className="w-6 h-6 text-gray-800 dark:text-white hover:text-red-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                  </svg>
                                </button>
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
                          <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        </td>
                        <td className="px-6 py-4 max-w-sm animate-pulse">
                          <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
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

        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Hapus Aksesoris</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Dengan ini anda dapat menghapus aksesoris <span className="font-semibold text-gray-100 dark:text-gray-200">{seletedAccessoris?.Name}</span> yang sudah terdaftar didalam aplikasi.
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Apakah anda yakin ingin melakukan aksi ini?
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button disabled={isLoading} color="red" onClick={() => {
              handleDeleteAccessoris(seletedAccessoris?.Id as unknown as string)
            }}>{isLoading ? "Sedang diproses..." : 'Hapus'}</Button>
            <Button disabled={isLoading} color="gray" onClick={() => setOpenModal(false)}>
              Batalkan
            </Button>
          </Modal.Footer>
        </Modal>

       
      </div>
    </>
  );
}
