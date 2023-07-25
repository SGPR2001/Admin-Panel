import React, { ReactElement, useState,useRef } from 'react'
import { mdiUpload, mdiSearchWeb } from '@mdi/js'
import SectionMain from '../components/SectionMain'
import CardBox from '../components/CardBox'
import BaseButton from '../components/BaseButton'
import LayoutAuthenticated from '../layouts/Authenticated'
import SweetnerItem from '../components/SweetnerItem'
import { useSampleSweetner } from '../hooks/sampleData'
import { Sweetner } from '../interfaces'
import Alert from '../components/Alert'
const TablesPage = () => {
  const [searchOption, setSearchOption] = useState('')
  const [searchId, setSearchId] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null)
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    })
    setTimeout(() => {
      setAlert(null)
    }, 3000)
  }
  const handleReset = () => {
    setSearchId('')
    setData([])
    setSearchOption('')
  }
  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sweetnerCsvFile = event.target.files?.[0]
    setSelectedFile(sweetnerCsvFile)
  }

  const handleUploadButtonClick = async () => {
    if (selectedFile) {
      const formData = new FormData()
      formData.append('sweetnerCsvFile', selectedFile)

      try {
        const response = await fetch(
          'http://3.13.92.74:30009/master-data/admin/sweetner/sweetner.csv',
          {
            method: 'POST',
            body: formData,
            headers: {
              'X-USER-ID': '1',
            },
          }
        )
        if (response.ok) {
           showAlert('File Uploaded successfully', 'success')
           setSelectedFile(null)
           fileInputRef.current.value = ''
        } else {
          showAlert('File not Uploaded', 'error')
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
  const [pageNumber, setPageNumber] = useState(0)

  const { sweetner } = useSampleSweetner(pageNumber)
  const handlePrevClick = () => {
    setPageNumber(pageNumber - 1)
  }
  const handleNextClick = () => {
    setPageNumber(pageNumber + 1)
  }

  const originalData = sweetner && sweetner.response ? sweetner.response : []
  const totalPages = sweetner && sweetner.totalPages ? sweetner.totalPages : 0
  const [data, setData] = useState([])
  const handleSearchClick = async () => {
    try {
      let url
      if (searchOption === 'id') {
        if (searchId) {
          url = `http://3.13.92.74:30009/master-data/admin/sweetner/id/${searchId}`
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'X-USER-ID': '1',
            },
          })
          if (response.ok) {
            const sweetner = await response.json()
            console.log(sweetner)
            setData([sweetner.response])
          } else {
            console.error('Error searching for formulations')
          }
        } else {
          console.error('Please enter an ID to search')
          return
        }
      } else if (searchOption == 'name') {
        url = `http://3.13.92.74:30009/master-data/admin/sweetner/name/${searchId}`
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'X-USER-ID': '1',
          },
        })
        if (response.ok) {
          const sweetner = await response.json()
          console.log(sweetner)
          setData([sweetner.response])
        } else {
          console.error('Error searching for formulations')
        }
      } else {
        url = `http://3.13.92.74:30009/master-data/admin/sweetner/regex/name/${searchId}`
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'X-USER-ID': '1',
          },
        })
        if (response.ok) {
          const sweetner = await response.json()
          console.log(sweetner)
          setData(sweetner.response)
        } else {
          console.error('Error searching for formulations')
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <SectionMain>
        <CardBox className="mb-6 bg-green-500">
          <div className="flex flex-col md:flex-row  items-center">
            <div className="flex items-center">
              <select
                value={searchOption}
                onChange={(e) => setSearchOption(e.target.value)}
                className="bg-white border border-gray-400  pl-3 py-2 outline-none "
                style={{ width: '200px' }}
              >
                <option value="">Select an option</option>
                <option value="id">By ID</option>
                <option value="name">By Name</option>
                <option value="regex">By Name Regex</option>
              </select>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Enter Id or Name or Regex"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  className="block p-2.5  w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  style={{ width: '300px' }}
                />
                <button
                  type="submit"
                  className="absolute top-0 left-62 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleSearchClick}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
              </div>
            </div>
            <div className="flex items-center  ">
              <button
                className=" text-black-500 background-transparent font-bold uppercase px-3 py-3 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>

            <div
              style={{
                marginLeft: '120px',
                display: 'flex',
                flexDirection: 'column',
                height: '60px',
              }}
            >
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="inline text-lg   text-gray-900 border border-gray-300  cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  onChange={handleFileInputChange}
                />

                <BaseButton
                  label="Upload"
                  icon={mdiUpload}
                  onClick={handleUploadButtonClick}
                  className="h-10 w-13 bg-blue-500 border-blue-500 hover:bg-[#7dd3fc] text-white font-bold  rounded"
                />
              </div>
              <div style={{ marginLeft: '140px', marginTop: '4px' }}>
                <button
                  className=" text-black-500 background-transparent font-bold uppercase px-3 py-3 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  Download CSV
                </button>
              </div>
            </div>
          </div>
        </CardBox>
        <div style={{ position: 'sticky', top: '60px', zIndex: '100' }}>
          {alert && <Alert alert={alert} />}
        </div>

        <CardBox className="mb-6">
          {searchId.length > 0
            ? data.map((sweetner: Sweetner) => (
                <CardBox key={sweetner.id} className="mb-6">
                  <SweetnerItem key={sweetner.id} sweetner={sweetner} />
                </CardBox>
              ))
            : originalData.map((sweetner: Sweetner) => (
                <CardBox key={sweetner.id} className="mb-6">
                  <SweetnerItem key={sweetner.id} sweetner={sweetner} />
                </CardBox>
              ))}
        </CardBox>
        <CardBox>
          <div className="flex justify-end  mt-6">
            <button
              className="mr-2 px-4 py-2 rounded-md bg-blue-400 text-white-700 hover:bg-blue-500 focus:bg-blue-600 focus:outline-none"
              onClick={handlePrevClick}
              disabled={pageNumber === 0}
              style={{ opacity: pageNumber === 0 ? 0.5 : 1 }}
            >
              Prev
            </button>
            <button
              className="mr-2 px-4 py-2 rounded-md bg-blue-600 text-white-600 hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
              disabled={pageNumber === 0}
            >
              {pageNumber}
            </button>
            <button
              className="px-4 py-2 rounded-md bg-blue-400 text-white-700 hover:bg-blue-500 focus:bg-blue-600 focus:outline-none"
              onClick={handleNextClick}
              disabled={pageNumber === totalPages - 1}
              style={{ opacity: pageNumber === totalPages - 1 ? 0.5 : 1 }}
            >
              Next
            </button>
          </div>
        </CardBox>
      </SectionMain>
    </>
  )
}

TablesPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default TablesPage
