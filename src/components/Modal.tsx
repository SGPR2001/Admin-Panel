import React from 'react'
import BaseButton from './BaseButton'
const Modal = ({close,slotList,handleSlotClick}) => {
  
  const handlecloseClick=()=>{
    close(false)
  }
  const handleSlotSelection = (slot) => {
    handleSlotClick(slot.from, slot.to)
    close(false) 
  }
  const slots = slotList.response[0].slotList
  return (
    <div>
      <div className="flex  justify-between border-b h-5">
        <h1
          className="text-gray-900 dark:text-white"
          style={{ fontSize: '14px', fontWeight: 'bold' }}
        >
          Available Slots
        </h1>
        <button className="text-gray-700 hover:text-gray-900" onClick={handlecloseClick}>
          <svg
            className="h-5 w-5 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18.2929 5.29289C18.6834 4.90237 19.3166 4.90237 19.7071 5.29289C20.0976 5.68342 20.0976 6.31658 19.7071 6.70711L13.4142 13L19.7071 19.2929C20.0976 19.6834 20.0976 20.3166 19.7071 20.7071C19.3166 21.0976 18.6834 21.0976 18.2929 20.7071L12 14.4142L5.70711 20.7071C5.31658 21.0976 4.68342 21.0976 4.29289 20.7071C3.90237 20.3166 3.90237 19.6834 4.29289 19.2929L10.5858 13L4.29289 6.70711C3.90237 6.31658 3.90237 5.68342 4.29289 5.29289C4.68342 4.90237 5.31658 4.90237 5.70711 5.29289L12 11.5858L18.2929 5.29289Z" />
          </svg>
        </button>
      </div>
      <div
        className="grid grid-cols-2 gap-2"
        style={{
          maxHeight: 'calc(30vh - 10px)',
          overflowY: 'auto',
          marginTop: '4px',
          fontSize: '14px',
          fontWeight: 'bold',
        }}
      >
       
        {slots.map((slot, index) => {
          const fromTime = new Date(slot.from).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })
          const toTime = new Date(slot.to).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })

          return (
            <div
              key={index}
              className="flex items-center justify-center w-30 cursor-pointer p-2 rounded border border-green-500"
              onClick={() => handleSlotSelection(slot)}
            >
              <h3>{`${fromTime} - ${toTime}`}</h3>
            </div>
          )
        })}
      </div>
      <div className="flex justify-center " style={{ marginTop: '4px' }}>
        <BaseButton className="bg-green-500" label="Update" />
      </div>
    </div>
  )
}
export default Modal
