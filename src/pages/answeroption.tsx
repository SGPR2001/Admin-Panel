import React, { ReactElement, useState } from 'react'
import { mdiSearchWeb } from '@mdi/js'
import SectionMain from '../components/SectionMain'
import CardBox from '../components/CardBox'
import BaseButton from '../components/BaseButton'
import LayoutAuthenticated from '../layouts/Authenticated'
import { useSampleAnswerOption } from '../hooks/sampleData'
import { AnswerOption } from '../interfaces'
import AnswerOptionItem from '../components/AnswerOptionItem'
import AnswerOptionComponent from '../components/AnswerOptionComponent'
const TablesPage = () => {
  const [searchOption, setSearchOption] = useState('')
  const [searchId, setSearchId] = useState('')
  const [showComponent, setShowComponent] = useState(false)
  const { answeroption } = useSampleAnswerOption()
  const originalData = answeroption && answeroption.response ? answeroption.response : []

  const [data, setData] = useState([])
  const handleSearchClick = async () => {
    try {
      let url
      if (searchOption === 'id') {
        if (searchId) {
          url = `http://3.13.92.74:30005/questionnaire/admin/answer-option/id/${searchId}`
          const response = await fetch(url, {
            method: 'GET',
            headers: { 
              'X-USER-ID': '1',
            },
          })
          if (response.ok) {
            const answeroption = await response.json()
            console.log(answeroption)
            setData([answeroption.response])
          } else {
            console.error('Error searching for formulations')
          }
        } else {
          console.error('Please enter an ID to search')
          return
        }
      } else {
        url = `http://3.13.92.74:30005/questionnaire/admin/answer-option/content/${searchId}`
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'X-USER-ID': '1',
          },
        })
        if (response.ok) {
          const answeroption = await response.json()
          console.log(answeroption)
          setData(answeroption.response)
        } else {
          console.error('Error searching for formulations')
        }
      }
    } catch (error) {
      console.error(error)
    }
  }
  const handleCancelClick = () => {
    setShowComponent(false)
  }
  const handleReset = () => {
    setSearchId('')
    setData([])
    setSearchOption('')
  }
  return (
    <>
      <SectionMain>
        <CardBox className="bg-green-500 mb-6">
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
                <option value="name">By ContentRegex</option>
              </select>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Enter Id or Name "
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
                marginLeft: '350px',
              }}
            >
              <BaseButton
                label="Create AnswerOption"
                onClick={() => setShowComponent(true)}
                className="bg-blue-500 border-blue-500 hover:bg-[#7dd3fc] text-white font-bold py-2 px-4 rounded"
              />
            </div>
          </div>
        </CardBox>
        {showComponent && (
          <CardBox className="mb-6">
            <AnswerOptionComponent showComponent={handleCancelClick} />
          </CardBox>
        )}

        <CardBox className=" mb-6">
          {searchId.length > 0
            ? data.map((answeroption: AnswerOption) => (
                <CardBox key={answeroption.id} className="w-640 h-640 mb-4">
                  <AnswerOptionItem key={answeroption.id} answeroption={answeroption} />
                </CardBox>
              ))
            : originalData.map((answeroption: AnswerOption) => (
                <CardBox key={answeroption.id} className="w-640 h-640 mb-2">
                  <AnswerOptionItem key={answeroption.id} answeroption={answeroption} />
                </CardBox>
              ))}
        </CardBox>
        {/* <CardBox>
          <div className="flex justify-end  mt-6">
            <button
              className="mr-2 px-4 py-2 rounded-md bg-blue-500 border-blue-500 text-white-700 hover:bg-blue-500 focus:bg-blue-600 focus:outline-none"
              onClick={handlePrevClick}
              disabled={pageNumber === 0}
              style={{ opacity: pageNumber === 0 ? 0.5 : 1 }}
            >
              Prev
            </button>
            <button
              className="mr-2 px-4 py-2 rounded-md bg-blue-500 border-blue-500 text-white-600 hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
              disabled={pageNumber === 0}
            >
              {pageNumber}
            </button>
            <button
              className="px-4 py-2 rounded-md bg-blue-500 border-blue-500 text-white-700 hover:bg-blue-500 focus:bg-blue-600 focus:outline-none"
              onClick={handleNextClick}
              disabled={pageNumber === totalPages - 1}
              style={{ opacity: pageNumber === totalPages - 1 ? 0.5 : 1 }}
            >
              Next
            </button>
          </div>
        </CardBox> */}
      </SectionMain>
    </>
  )
}

TablesPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default TablesPage
