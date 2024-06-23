"use client";

import { Dropdown } from "flowbite-react";
import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

export enum SORT {
  ASC='ASC',
  DSC='DSC',
}

export function SearchbarComponent(props:any) {
  const [selectedSort, sortSelect] = useState<{option:SORT ,text:string} | null>()
  const [keyword, setKeyword] = useState<string>()


  const sendDataToParent = () => {
    props?.onDataReceived({...selectedSort, keyword});
  };

  return (
    <>
          <div className="w-full mx-auto">
              <div className="flex">
                <div className='flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600'>
                  <Dropdown className='-ml-4 w-36 rounded-lg' label="Urutkan" placement="bottom-start" dismissOnClick={true} renderTrigger={() => 
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
                  </Dropdown>
                </div>
                <div className="relative w-full">
                    <input value={keyword} onChange={(e:any) => setKeyword(e?.target?.value)} type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder={props?.placeholder || "Cari bedasarkan nama, email..."} required />
                    <button onClick={sendDataToParent} type="button" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                        <span className="sr-only">Cari</span>
                    </button>
                </div>
              </div>
          </div>
    </>

  )
}
