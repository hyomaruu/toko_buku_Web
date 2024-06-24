"use client";

// import { Metadata } from "next";
import { Response } from "@toko-buku/controllers/global";
import { Book, getBook } from "@toko-buku/libs/controllers/book";
import { useEffect, useRef, useState } from "react";


export default function BooksPage(
  {
    params,
  }: {
    params: { book: string };
  }
) {
  const initialized = useRef(false)

  const [isFetchLoading, setFetchLoading] = useState<boolean>(true)
  const [data, setData] = useState<Book | null>()
  const [stock, setStock] = useState<number>(0)


  const handleFetchData = (bookData: string) => {
      setFetchLoading(true)
      getBook(bookData).then((response: Response<Book>) => {
        if(response?.data) setData(response?.data)
      }
      ).finally(() => {
          setFetchLoading(false)
      });
  }

  const handleAddCart = (bookData: string) => {
    // setFetchLoading(true)
    // getBook(bookData).then((response: Response<Book>) => {
    //   if(response?.data) setData(response?.data)
    // }
    // ).finally(() => {
    //     setFetchLoading(false)
    // });
}

  useEffect(() => {
    if (!initialized.current) {
      handleFetchData(params?.book)
      initialized.current = true
    }
  },[])


  const handleFormatCurrency = (price: number) => {
    let idr = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    }).format(price);

    return idr
  }


  const handleReplace =  (val: string) => {
    val = val.replace(/[^0-9.]/g, '')
    return Number(val)
  }
  
  const stockValidator = (val: string) => {
    switch (val) {
      case 'minimum-input':
        return stock <= 0 ? true : false
     
      case 'maximum-input':
        return data?.Stok && data?.Stok > 0 && stock >= data?.Stok ? true : false
  
      case 'stock-minimum':
        return data?.Stok && data?.Stok <= 0 ? true : false

      case 'stock-availabel':
        return data?.Stok && data?.Stok > 0 ? true : false
        
      case 'maximum-validation':
        return data?.Stok && data?.Stok > 0 && stock > data?.Stok ? true : false

      default:
        break;
    }

    return false
  }
  
  return (
    <>
      <div className="my-10">
        <div className="flex items-center justify-between mb-8">
              <h1 className="font-semibold text-xl ">Detail Buku</h1>
        </div>


        <div className="grid sm:grid-cols-3 gap-6">

            {
              data &&  <>
                  <div>
                    <img src={data.Image as string} className="w-full bg-center bg-cover h-40 sm:h-48 rounded-lg" alt="" />
                  </div>
                  <div>
                    <div className="p-4 rounded-lg bg-gray-800">
                      <div className="text-base sm:text-lg text-gray-900 dark:text-white mb-2 font-bold">{data.Name}</div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm text-gray-900 dark:text-gray-300 font-bold">Genre :</span>
                        <span className="text-sm text-gray-900 dark:text-gray-300">{data.Genre}</span>
                      </div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm text-gray-900 dark:text-gray-300 font-bold">Pengarang :</span>
                        <span className="text-sm text-gray-900 dark:text-gray-300">{data.Pengarang}</span>
                      </div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm text-gray-900 dark:text-gray-300 font-bold">Tanggal Rilis :</span>
                        <span className="text-sm text-gray-900 dark:text-gray-300">{data.Rilis}</span>
                      </div>
                   
                      <hr  className="border-b border-gray-500 my-4"/>

                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm text-gray-900 dark:text-gray-300 font-bold">Penerbit :</span>
                        <span className="text-sm text-gray-900 dark:text-gray-300">{data.Penerbit}</span>
                      </div>
                      <div>
                        <label htmlFor="deskripsi" className="text-sm text-gray-900 dark:text-gray-300 font-bold">Deskripsi</label>
                        <div id="deskripsi" className="text-sm text-gray-900 dark:text-gray-300 mb-2">{data.Deskripsi}</div>
                      </div>
                    </div>
                  </div>
                  <div className="pl-6 border-l border-grey-100">
                    <div className="p-4 min-h-[250px] bg-gray-900 relative">
                    <div className="text-lg sm:text-xl text-gray-900 dark:text-white mb-2 font-bold">{handleFormatCurrency(data.Harga as number)}</div>
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="text-sm text-gray-900 dark:text-gray-300 font-bold">Stok :</span>
                        <span className="text-sm text-gray-900 dark:text-gray-300">{data.Stok}</span>
                      </div>
                        <div className="py-5">
                          <form>
                            <div>
                              <div className="relative flex items-center mb-1 border border-gray-300 rounded-lg overflow-hidden">
                              <button onClick={() => setStock(stock - 1)} disabled={isFetchLoading || !stockValidator('stock-availabel') || stockValidator('minimum-input') } type="button" 
                                className={ (isFetchLoading ||  !stockValidator('stock-availabel') || stockValidator('minimum-input') ? "opacity-60" : "")  +  " text-sm text-gray-900 bg-gray-400 text-white font-medium text-sm w-auto h-full px-5 py-2.5 text-center"}
                                >
                                  -
                                </button>
                                <input onChange={(e) => setStock(handleReplace(e.target.value))} value={Number(stock)} type="text" id="stok" name="stok" className=" text-center bg-gray-50 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Masukan stok"/>
                                <button onClick={() => setStock(stock + 1)}  disabled={isFetchLoading || !stockValidator('stock-availabel') || stockValidator('maximum-input') } type="button" 
                                className={ (isFetchLoading ||  !stockValidator('stock-availabel') || stockValidator('maximum-input')  ? "opacity-60" : "")  +  " text-sm text-gray-900 bg-gray-400 text-white font-medium text-sm w-auto h-full px-5 py-2.5 text-center"}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <p 
                            className={ (!stockValidator('stock-availabel') ? "" : "hidden") +  " text-red-700 text-sm italic"}
                            >* Stok tidak tersedia</p>
                             <p 
                            className={ (stockValidator('maximum-validation') ? "" : "hidden") +  " text-red-700 text-sm italic"}
                            >* Stok tidak mencukupi</p>
                          </form>
                        </div>
                      <div className="absolute bottom-0 w-full left-0 p-4">
                        <button disabled={isFetchLoading || !stockValidator('stock-availabel') || stockValidator('minimum-input') || stockValidator('maximum-validation') } type="button" 
                        className={ (isFetchLoading || !stockValidator('stock-availabel') || stockValidator('minimum-input') || stockValidator('maximum-validation') ? "opacity-60" : "")  +  " text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"}
                        >
                            {!isFetchLoading && 
                              "Tambah ke Keranjang"
                            }

                            {isFetchLoading && 
                              "Sedang diproses..."
                            }
                        </button>

                      </div>
                      {/* <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm text-gray-900 dark:text-gray-300 font-bold">Genre :</span>
                        <span className="text-sm text-gray-900 dark:text-gray-300">{data.Genre}</span>
                      </div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm text-gray-900 dark:text-gray-300 font-bold">Pengarang :</span>
                        <span className="text-sm text-gray-900 dark:text-gray-300">{data.Pengarang}</span>
                      </div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm text-gray-900 dark:text-gray-300 font-bold">Tanggal Rilis :</span>
                        <span className="text-sm text-gray-900 dark:text-gray-300">{data.Rilis}</span>
                      </div>
                    
                      <hr  className="border-b border-gray-500 my-4"/>

                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm text-gray-900 dark:text-gray-300 font-bold">Penerbit :</span>
                        <span className="text-sm text-gray-900 dark:text-gray-300">{data.Penerbit}</span>
                      </div>
                      <div>
                        <label htmlFor="deskripsi" className="text-sm text-gray-900 dark:text-gray-300 font-bold">Deskripsi</label>
                        <div id="deskripsi" className="text-sm text-gray-900 dark:text-gray-300 mb-2">{data.Deskripsi}</div>
                      </div> */}
                    </div>
                  </div>

              </>
            }

        </div>
       
      </div>
    </>
  );
}
