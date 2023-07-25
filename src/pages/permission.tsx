import React, { ReactElement, useState } from 'react'
import { mdiUpload, mdiSearchWeb } from '@mdi/js'
import SectionMain from '../components/SectionMain'
import CardBox from '../components/CardBox'
import BaseButton from '../components/BaseButton'
import LayoutAuthenticated from '../layouts/Authenticated'
import { useSamplePermission } from '../hooks/sampleData'
import {Permission } from '../interfaces'
import PermissionItem from '../components/PermissionItem'
import PermissionComponent from '../components/PermissionComponent'
const TablesPage = () => {
  const [searchOption, setSearchOption] = useState('')
  const [searchId, setSearchId] = useState('')
  const [data, setData] = useState([])
  const { permission } = useSamplePermission()
  const originalData = permission && permission.response ? permission.response : []
  const [showComponent, setShowComponent] = useState(false)
  const handleSearchClick = async () => {
    try {
      let url
      if (searchOption === 'id') {
        if (searchId) {
          url = `http://3.13.92.74:30001/acl/admin/permission/id/${searchId}`
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'X-USER-ID': '1',
            },
          })
          if (response.ok) {
            const permission = await response.json()
            console.log(permission)
            setData([permission.response])
          } else {
            console.error('Error searching for formulations')
          }
        } else {
          console.error('Please enter an ID to search')
          return
        }
      } else {
        url = `http://3.13.92.74:30001/acl/admin/permission/name/${searchId}`
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'X-USER-ID': '1',
          },
        })
        if (response.ok) {
          const permission = await response.json()
          console.log(permission)
          setData([permission.response])
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
                <option value="name">By Name</option>
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
                label="Create Module"
                onClick={() => setShowComponent(true)}
                className="bg-blue-500 border-blue-500 hover:bg-[#7dd3fc] text-white font-bold py-2 px-4 rounded"
              />
            </div>
          </div>
        </CardBox>
        {showComponent && (
          <CardBox className="mb-6">
            <PermissionComponent showComponent={handleCancelClick} />
          </CardBox>
        )}
        <CardBox className="mb-6">
          {searchId.length > 0
            ? data.map((permission: Permission) => (
                <CardBox key={permission.id} className="mb-6">
                  <PermissionItem key={permission.id} permission={permission} />
                </CardBox>
              ))
            : originalData.map((permission: Permission) => (
                <CardBox key={permission.id}  className="mb-6">
                  <PermissionItem key={permission.id} permission={permission} />
                </CardBox>
              ))}
        </CardBox>
      </SectionMain>
    </>
  )
}

TablesPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default TablesPage
