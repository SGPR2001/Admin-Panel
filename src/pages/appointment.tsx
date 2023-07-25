import React, { ReactElement, useState } from 'react'
import SectionMain from '../components/SectionMain'
import CardBox from '../components/CardBox'
import LayoutAuthenticated from '../layouts/Authenticated'
import { useSampleAppointments } from '../hooks/sampleData'
import BaseButton from '../components/BaseButton'
import NewAppointment from '../components/NewAppointment'
import Dropdown from '../components/Dropdown'
import Alert from '../components/Alert'
const TablesPage = () => {
     const [searchData, setSearchData] = useState('')
      const [selectDate, setSelectDate] = useState('')
      const [showComponent, setShowComponent] = useState(false)
      // const [selectedRow, setSelectedRow] = useState(null)
     const [selectedAppointment, setSelectedAppointment] = useState(null)
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
   const [pageNumber, setPageNumber] = useState(0)

   const { appointment } = useSampleAppointments(pageNumber)
 
   const handlePrevClick = () => {
     setPageNumber(pageNumber - 1)
   }
   const handleNextClick = () => {
     setPageNumber(pageNumber + 1)
   }  
  
 
  const originalData= appointment && appointment.response? appointment.response:[];
  const totalPages = appointment && appointment.totalPages ? appointment.totalPages : 0
   const appointmentData = originalData.map((app) => {
    const id=app.id
     const doctorId = app.attendeeMap.HEALTH_EXPERT[0].userProfile.id
    const doctorName = app.attendeeMap.HEALTH_EXPERT[0].userProfile.profileList[0].name
     const patientName = app.attendeeMap.PATIENT[0].userProfile.profileList[0].name
     const condition = app.disease.name
     const category = app.speciality.name
     const joinMeeting = app.meetingChannel.meetingUrl
     const slottime=app.slot.from
     const specialityId=app.speciality.id
     const patientUserId = app.attendeeMap.PATIENT[0].userProfile.userId
     const patientProfileId = app.attendeeMap.PATIENT[0].userProfile.profileList[0].id
     const doctorUserId = app.attendeeMap.HEALTH_EXPERT[0].userProfile.userId
     const doctorProfileId = app.attendeeMap.HEALTH_EXPERT[0].userProfile.profileList[0].id
     const patientzone = app.attendeeMap.PATIENT[0].userProfile.profileList[0].attribute.zoneId
     const doctorzone = app.attendeeMap.HEALTH_EXPERT[0].userProfile.profileList[0].attribute.zoneId
     return {
      id,
       date: app.date,
       time1: app.timeSlot.from,
       time2: app.timeSlot.to,
       appointmentStatus: app.meetingStatus,
       doctorId,
       doctorName,
       patientName,
       condition,
       category,
       joinMeeting,
       slottime,
       specialityId,
       patientUserId,
       patientProfileId,
       doctorUserId,
       doctorProfileId,
       patientzone,
       doctorzone
     }
   })
  
  const handleResetClick=() =>{
            setSearchData('')
            setSelectDate('')
  }
  // const handleRowClick = (id) => {
  //    setSelectedRow(id === selectedRow ? null : id)
  // }
   const handleAppointmentClick = (id) => {
     setSelectedAppointment(id === selectedAppointment ? null : id)
   }
   function getAppointmentStatusColor(appointmentStatus) {
     let colorClass = ''

     switch (appointmentStatus) {
       case 'RESCHEDULED':
         colorClass = 'bg-yellow-500'
         break
       case 'CONFIRMED':
         colorClass = 'bg-green-300'
         break
       case 'CANCELED':
         colorClass = 'bg-gray-200'
         break
       case 'REJECTED':
         colorClass = 'bg-red-200'
         break
       default:
         colorClass = 'bg-gray-200'
         break
     }

     return colorClass
   }
   
  return (
    <>
      <SectionMain>
        <CardBox className="mb-6">
          <div className="flex justify-between ">
            <div className="flex justify-end">
              <div className="pr-5 " style={{ width: '300px' }}>
                <form>
                  <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                  >
                    Search
                  </label>
                  <div className="relative  ">
                    <input
                      type="search"
                      id="default-search"
                      value={searchData}
                      onChange={(e) => setSearchData(e.target.value)}
                      className="block w-full h-10 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Search All Doctors..."
                      required
                    />
                    <button
                      type="submit"
                      className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                </form>
              </div>
              <div className="pr-5">
                <input
                  type="date"
                  id="appointment-date"
                  name="appointment-date"
                  value={selectDate}
                  onChange={(e) => setSelectDate(e.target.value)}
                  className="block w-full h-10 p-4 text-sm text-gray-900 border border-success rounded-lg bg-gray-50 focus:ring-success focus:border-success dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="pr-5">
                <BaseButton
                  label="Reset"
                  onClick={handleResetClick}
                  className="bg-blue-500 border-blue-500 hover:bg-[#7dd3fc] text-white font-bold py-2 px-4 rounded"
                />
              </div>
            </div>
            <div>
              <BaseButton
                label="Create an Appointment"
                onClick={() => setShowComponent(true)}
                className="bg-blue-500 border-blue-500 hover:bg-[#7dd3fc] text-white font-bold py-2 px-4 rounded"
              />
            </div>
          </div>
        </CardBox>
        <div style={{ position: 'sticky', top: '60px', zIndex: '100' }}>
          {alert && <Alert alert={alert} />}
        </div>
        {showComponent && (
          <div className="fixed z-50 top-0 bottom-0 left-0 right-0 overflow-y-auto ">
            <div className="fixed top-0 bottom-0 left-60 right-0 bg-black bg-opacity-25  flex items-center justify-center">
              <div className=" relative bg-white  w-5/6 lg:w-3/6 rounded-lg shadow-lg  ">
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                    New Appointment
                  </h1>
                  <button
                    className="text-gray-700 hover:text-gray-900"
                    onClick={() => setShowComponent(false)}
                  >
                    <svg
                      className="h-6 w-6 fill-current"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M18.2929 5.29289C18.6834 4.90237 19.3166 4.90237 19.7071 5.29289C20.0976 5.68342 20.0976 6.31658 19.7071 6.70711L13.4142 13L19.7071 19.2929C20.0976 19.6834 20.0976 20.3166 19.7071 20.7071C19.3166 21.0976 18.6834 21.0976 18.2929 20.7071L12 14.4142L5.70711 20.7071C5.31658 21.0976 4.68342 21.0976 4.29289 20.7071C3.90237 20.3166 3.90237 19.6834 4.29289 19.2929L10.5858 13L4.29289 6.70711C3.90237 6.31658 3.90237 5.68342 4.29289 5.29289C4.68342 4.90237 5.31658 4.90237 5.70711 5.29289L12 11.5858L18.2929 5.29289Z" />
                    </svg>
                  </button>
                </div>
                <div className="pl-6 pr-6 space-y-3">
                  <NewAppointment />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col">
          <CardBox className="mb-6 bg-green-500">
            <div className="grid grid-cols-8 gap-2">
              <div>
                <h3 className="font-bold text-lg">Date & Time</h3>
              </div>
              <div>
                <h3 className="font-bold text-lg">Appointment Status</h3>
              </div>
              <div>
                <h3 className="font-bold text-lg">Doctor ID</h3>
              </div>
              <div>
                <h3 className="font-bold text-lg">Doctor Name</h3>
              </div>
              <div>
                <h3 className="font-bold text-lg">Patient Name</h3>
              </div>
              <div>
                <h3 className="font-bold text-lg">Condition</h3>
              </div>
              <div>
                <h3 className="font-bold text-lg">Category</h3>
              </div>
              <div>
                <h3 className="font-bold text-lg">Join Meeting</h3>
              </div>
            </div>
          </CardBox>
          {appointmentData.map((data) => (
            <div key={data.id}>
              <CardBox
                className={` ${selectedAppointment === data.id ? 'bg-orange-100' : 'mb-6'}`}
                onClick={() => handleAppointmentClick(data.id)}
              >
                <div className="grid grid-cols-8 gap-2">
                  <div>
                    {data.date} {}
                    {data.time1}
                    {data.time2}
                  </div>
                  <div>
                    <div
                      className={`rounded-full px-4 py-2 ${getAppointmentStatusColor(
                        data.appointmentStatus
                      )}`}
                    >
                      {data.appointmentStatus}
                    </div>
                  </div>
                  <div>{data.doctorId}</div>
                  <div>{data.doctorName}</div>
                  <div>{data.patientName}</div>
                  <div>
                    {data.category}({data.condition})
                  </div>
                  <div></div>
                  <div>
                    <BaseButton className="bg-green-300" label="Join" />
                  </div>
                </div>
              </CardBox>
              {selectedAppointment === data.id && (
                <Dropdown rowData={data} close={handleAppointmentClick} showAlert={showAlert} />
              )}
            </div>
          ))}
        </div>
        <CardBox>
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
        </CardBox>
      </SectionMain>
    </>
  )
}

TablesPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default TablesPage
