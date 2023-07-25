import { mdiEye, mdiTrashCan } from '@mdi/js'
import React, { useState,useEffect } from 'react'
import { useSampleClients } from '../hooks/sampleData'
import { Client } from '../interfaces'
import BaseButton from './BaseButton'
import BaseButtons from './BaseButtons'
import CardBoxModal from './CardBoxModal'
import UserAvatar from './UserAvatar'

const TableSampleClients = () => {
  
  const { clients } = useSampleClients()

  // const perPage = 5

  // const [currentPage, setCurrentPage] = useState(0)

  // const clientsPaginated = clients.slice(perPage * currentPage, perPage * (currentPage + 1))

  // const numPages = clients.length / perPage

  // const pagesList = []

  // for (let i = 0; i < numPages; i++) {
  //   pagesList.push(i)
  // }

  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)

  const handleModalAction = () => {
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
  }
   const [filteredData, setFilteredData] = useState(
     clients && clients.response ? clients.response : []
   )
  //  console.log(clients.response)
  //  console.log(filteredData)
   const [searchQuery, setSearchQuery] = useState('')

   useEffect(() => {
     const newData =
       clients.response && clients.response.filter((client) => client.groupId.includes(searchQuery))
     setFilteredData(newData)
   }, [searchQuery])

   const handleSearchChange = (event) => {
     setSearchQuery(event.target.value)
   }

  return (
    <>
      <CardBoxModal
        title="Sample modal"
        buttonColor="info"
        buttonLabel="Done"
        isActive={isModalInfoActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <p>
          Lorem ipsum dolor sit amet <b>adipiscing elit</b>
        </p>
        <p>This is sample modal</p>
      </CardBoxModal>

      <CardBoxModal
        title="Please confirm"
        buttonColor="danger"
        buttonLabel="Confirm"
        isActive={isModalTrashActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <p>
          Lorem ipsum dolor sit amet <b>adipiscing elit</b>
        </p>
        <p>This is sample modal</p>
      </CardBoxModal>
      <div>
        <label className="mr-5">Group ID:</label>
        <input type="text" value={searchQuery} onChange={handleSearchChange} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Content</th>
            <th>CategoryId</th>
            <th>GroupId</th>
          </tr>
        </thead>
        <tbody>
          {filteredData &&
            filteredData.map((client: Client) => (
              <tr key={client.id}>
                <td data-label="Name">{client.id}</td>
                <td data-label="Company">{client.content}</td>
                <td data-label="City">{client.categoryId}</td>
                <td data-label="City">{client.groupId}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
          <BaseButtons>
            {pagesList.map((page) => (
              <BaseButton
                key={page}
                active={page === currentPage}
                label={page + 1}
                color={page === currentPage ? 'lightDark' : 'whiteDark'}
                small
                onClick={() => setCurrentPage(page)}
              />
            ))}
          </BaseButtons>
          <small className="mt-6 md:mt-0">
            Page {currentPage + 1} of {numPages}
          </small>
        </div>
      </div> */}
    </>
  )
}

export default TableSampleClients
