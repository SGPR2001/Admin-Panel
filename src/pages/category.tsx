import React, { ReactElement, useState } from 'react'
import { mdiSearchWeb } from '@mdi/js'
import SectionMain from '../components/SectionMain'
import CardBox from '../components/CardBox'
import BaseButton from '../components/BaseButton'
import LayoutAuthenticated from '../layouts/Authenticated'
import { useSampleCategory } from '../hooks/sampleData'
import { Category } from '../interfaces'
import CategoryComponent from '../components/CategoryComponent'
import CategoryItem from '../components/CategoryItem'
const TablesPage = () => {
  const [searchOption, setSearchOption] = useState('')
  const [searchId, setSearchId] = useState('')
  const [showComponent, setShowComponent] = useState(false)
  const { category } = useSampleCategory()
  const originalData = category && category.response ? category.response : []

  const [data, setData] = useState([])
  const handleSearchClick = async () => {
    try {
      let url
      if (searchOption === 'id') {
        if (searchId) {
          url = `http://3.13.92.74:30005/questionnaire/admin/category/id/${searchId}`
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'X-USER-ID': '1',
            },
          })
          if (response.ok) {
            const category = await response.json()
            console.log(category)
            setData([category.response])
          } else {
            console.error('Error searching for formulations')
          }
        } else {
          console.error('Please enter an ID to search')
          return
        }
      } else if (searchOption === 'name') {
        url = `http://3.13.92.74:30005/questionnaire/admin/category/name/${searchId}`
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'X-USER-ID': '1',
          },
        })
        if (response.ok) {
          const category = await response.json()
          console.log(category)
          setData([category.response])
        } else {
          console.error('Error searching for formulations')
        }
      } else  {
        url = `http://3.13.92.74:30005/questionnaire/user/category/type/${searchId}`
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'X-category-ID': '1',
          },
        })
        if (response.ok) {
          const category = await response.json()
          console.log(category)
          setData(category.response)
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
  return (
    <>
      <SectionMain>
        <CardBox className="mb-6">
          <div className="flex justify-between">
            <CardBox className="  mb-6 ">
              <div className="flex justify-end">
                <select
                  value={searchOption}
                  onChange={(e) => setSearchOption(e.target.value)}
                  className="bg-white border border-gray-400 rounded-full px-3 py-2 outline-none "
                  style={{ width: '200px' }}
                >
                  <option value="">Select an option</option>
                  <option value="id">By ID</option>
                  <option value="name">By Name</option>
                  <option value="categorytype">By CategoryType</option>
                </select>
                {searchOption === 'id' && (
                  <div className="flex justify-end">
                    <input
                      type="text"
                      placeholder="Enter ID"
                      value={searchId}
                      onChange={(e) => setSearchId(e.target.value)}
                      className="bg-white border border-gray-400 rounded-full px-3 py-2 outline-none mr-4"
                      style={{ width: '200px' }}
                    />
                  </div>
                )}
                {searchOption === 'name' && (
                  <div className="flex justify-end">
                    <input
                      type="text"
                      placeholder="Enter name"
                      value={searchId}
                      onChange={(e) => setSearchId(e.target.value)}
                      className="bg-white border border-gray-400 rounded-full px-3 py-2 outline-none mr-4"
                      style={{ width: '200px' }}
                    />
                  </div>
                )}
                {searchOption === 'categorytype' && (
                  <div className="flex justify-end">
                    <input
                      type="text"
                      placeholder="Enter categoryType"
                      value={searchId}
                      onChange={(e) => setSearchId(e.target.value)}
                      className="bg-white border border-gray-400 rounded-full px-3 py-2 outline-none mr-4"
                      style={{ width: '200px' }}
                    />
                  </div>
                )}

                <BaseButton
                  label="Search"
                  icon={mdiSearchWeb}
                  onClick={handleSearchClick}
                  className="bg-blue-500 border-blue-500 hover:bg-[#7dd3fc]  text-white font-bold py-2 px-4 rounded"
                />
              </div>
            </CardBox>
            <CardBox className=" mb-6 ">
              <div>
                <BaseButton
                  label="Create category"
                  onClick={() => setShowComponent(true)}
                  className="bg-blue-500 border-blue-500 hover:bg-[#7dd3fc] text-white font-bold py-2 px-4 rounded"
                />
              </div>
            </CardBox>
          </div>
        </CardBox>
        {showComponent && (
          <CardBox className="mb-6">
            <CategoryComponent showComponent={handleCancelClick} />
          </CardBox>
        )}

        <CardBox className=" mb-6">
          {searchId.length > 0
            ? data.map((category: Category) => (
                <CardBox key={category.name} className="w-640 h-640 mb-4">
                  <CategoryItem key={category.name} category={category} />
                </CardBox>
              ))
            : originalData.map((category: Category) => (
                <CardBox key={category.name} className="w-640 h-640 mb-2">
                  <CategoryItem key={category.name} category={category} />
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
