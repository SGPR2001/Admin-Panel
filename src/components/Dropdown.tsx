import React ,{useState,useEffect}from 'react'
import CardBox from './CardBox'
import BaseButton from './BaseButton';
import Modal from './Modal'

export default function Dropdown({ rowData ,close,showAlert}) {
  const [doctorName, setDoctorName] = useState(rowData.doctorName)
    const [selectDate, setSelectDate] = useState(rowData.date)
     const [showComponent, setShowComponent] = useState(false)
     const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })
     const [slotList, setSlotList] = useState('')
     const [selectedSlot, setSelectedSlot] = useState(null)
     const [patientTime,setpatientTime]=useState(rowData.time1)
     const [doctorList, setDoctorList] = useState([])
      const [doctorId, setDoctorId] = useState(rowData.doctorId)
      const [doctorUserId, setDoctorUserId] = useState(rowData.doctorUserId)
      const [doctorProfileId, setDoctorProfileId] = useState(rowData.doctorProfileId)
      const [showPopup, setShowPopup] = useState(false)
      

     const handleSlotClick = (from, to) => {
       setSelectedSlot({ from, to })
       const fromTime = new Date(from).toLocaleTimeString([], {
         hour: '2-digit',
         minute: '2-digit',
       })
       setpatientTime(fromTime)
       
       const fromDateTime = from
       const toDateTime = to
       const specialityId = rowData.specialityId
       const apiUrl = `http://3.13.92.74:30015/booking/admin/calender/availability?from=${encodeURIComponent(
         fromDateTime
       )}&to=${encodeURIComponent(toDateTime)}&specialityId=${specialityId}`

       fetch(apiUrl, {
         method: 'GET',
         headers: {
           'X-USER-ID': '1',
           zoneId: rowData.patientzone,
           'patientUserId': rowData.patientUserId ,
           'patientProfileId': rowData.patientProfileId
         },
       })
         .then((response) => response.json())
         .then((data) => {
           console.log(data)
           setDoctorList(data.response)
         })
         .catch((error) => {
           console.error(error)
         })
     }
    
     useEffect(()=>{
        
        const selectedDate = selectDate
        const fromDateTime = `${selectedDate}T00:00:00`
        const toDateTime = `${selectedDate}T23:59:59`
        const specialityId = rowData.specialityId
        const apiUrl = `http://3.13.92.74:30015/booking/admin/calender/time-slot?from=${encodeURIComponent(
          fromDateTime
        )}&to=${encodeURIComponent(toDateTime)}&specialityId=${specialityId}`

        fetch(apiUrl, {
          method: 'GET',
          headers: {
            'X-USER-ID': '1',
            zoneId: rowData.patientzone,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setSlotList(data)
          })
          .catch((error) => {
            console.error(error)
          })
     },[])
     const handleIconClick = (event) => {
       const iconRect = event.target.getBoundingClientRect()
       const iconPosition = {
         top: iconRect.top + iconRect.height + 10, 
         left: iconRect.left,
       }
       setModalPosition(iconPosition)
      setShowComponent(true);
     }
     const preventBodyScroll = (event) => {
       event.preventDefault()
     }

     if (showComponent) {
       document.body.style.overflow = 'hidden'
       window.addEventListener('scroll', preventBodyScroll, { passive: false })
     } else {
       document.body.style.overflow = 'auto'
       window.removeEventListener('scroll', preventBodyScroll)
     }
     
 const handlecloseClick=()=>{
       close(rowData.id)
 }
 const handleclosecomponent = () => {
   setShowComponent(false);
 }
  const handleDateChange = (event) => {
    setSelectDate(event.target.value);
    const selectedDate = event.target.value
    const fromDateTime = `${selectedDate}T00:00:00`
    const toDateTime = `${selectedDate}T23:59:59`
    const specialityId = rowData.specialityId
    const apiUrl = `http://3.13.92.74:30015/booking/admin/calender/time-slot?from=${encodeURIComponent(
      fromDateTime
    )}&to=${encodeURIComponent(toDateTime)}&specialityId=${specialityId}`


    fetch(apiUrl,{
      method: 'GET',
      headers: {
        'X-USER-ID': '1',
        'zoneId': rowData.patientzone,
      }})
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setSlotList(data);
        
        
      })
      .catch((error) => {
       
        console.error(error)
      })
  }
  const handleCancel = async () => {
    setShowPopup(true)
  }
  const handleConfirmCancel = async () => {
    setShowPopup(false)
    const meetingId = rowData.id
    const profileId = '3eca6459-6b54-4877-a7f1-b3c59bad12f2'
    const apiUrl = `http://3.13.92.74:30015/booking/admin/meeting/${meetingId}/cancel?profileId=${profileId}`
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'X-USER-ID': 'fa15cbe1-c018-40cc-8d73-0bcd172055f8',

          zoneId: 'IST',
        },
      })
      if (response.ok) {
        close(false)
      } else {
        console.error('error')
      }
    } catch (error) {
      console.error(error)
    }
  }
  const handleCancelModal = () => {
    setShowPopup(false)
    console.log('Cancellation cancelled!')
  }
  const handleUpdate = async () => {
    const meetingId = rowData.id
    const profileId = '3eca6459-6b54-4877-a7f1-b3c59bad12f2'
    const DoctorUserId=doctorUserId
    const DoctorProfileId=doctorProfileId
    const fromTime = new Date(selectedSlot.from).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }).replace(/(am|pm)/i, (match) => match.toUpperCase());
    const toTime = new Date(selectedSlot.to)
      .toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
      .replace(/(am|pm)/i, (match) => match.toUpperCase())
    const apiUrl = `http://3.13.92.74:30015/booking/admin/meeting/${meetingId}?profileId=${profileId}&doctorUserId=${DoctorUserId}&doctorProfileId=${DoctorProfileId}`
    
     const  date= selectDate
    const timeSlot= {
        "from": fromTime,
        "to": toTime,
      }
    
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'X-USER-ID': 'fa15cbe1-c018-40cc-8d73-0bcd172055f8',
          'Content-Type': 'application/json',
          zoneId: rowData.patientzone,
        },
        body: JSON.stringify({
         date,
         timeSlot
        }),
      })
      if (response.ok) {
        showAlert('updated successfully','success')
        close(false)

      } else {
        showAlert('Not updated', 'error')
        
        console.error('error')
      }
    } catch (error) {
      console.error(error)
    }
  }
  const handleDoctorChange = (event) => {
    const selectedDoctorName = event.target.value
    const selectedDoctor = doctorList.find(
      (doctor) => doctor.profileList[0].name === selectedDoctorName
    )

    if (selectedDoctor) {
      const { id, userId, profileList } = selectedDoctor
      const { id: profileId } = profileList[0]

      setDoctorId(id)
      setDoctorUserId(userId)
      setDoctorProfileId(profileId)
    }

    setDoctorName(selectedDoctorName)
  }
  
  return (
    <>
      <CardBox className="mb-6">
        <div style={{ display: 'flex' }}>
          <div style={{ width: '40%' }}>
            <div style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '10px' }}>
              Reschedule Appointment
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ display: 'flex', flexDirection: 'column', paddingRight: '10px' }}>
                <label
                  style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}
                  htmlFor="dateSelector"
                >
                  Date
                </label>
                <input
                  id="dateSelector"
                  type="date"
                  value={selectDate}
                  onChange={handleDateChange}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label
                  style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}
                  htmlFor="patientTime"
                >
                  Patient Time-{rowData.patientzone}
                </label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    id="patientTime"
                    type="text"
                    value={patientTime}
                    style={{ width: '160px', marginRight: '10px' }}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    id="IconChangeColor"
                    height="50"
                    width="40"
                    onClick={handleIconClick}
                  >
                    <g>
                      <path fill="none" d="M0 0h24v24H0z" id="mainIconPathAttribute"></path>
                      <path
                        d="M16.757 3l-2 2H5v14h14V9.243l2-2V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12.757zm3.728-.9L21.9 3.516l-9.192 9.192-1.412.003-.002-1.417L20.485 2.1z"
                        id="mainIconPathAttribute"
                      ></path>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div style={{ width: '60%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div
                style={{
                  fontSize: '15px',
                  fontWeight: 'bold',
                  marginBottom: '10px',
                  justifyContent: 'space-evenly',
                }}
              >
                Reassign Appointment
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                Close
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  style={{ marginLeft: '5px', cursor: 'pointer' }}
                  onClick={handlecloseClick}
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    fill="currentColor"
                    d="M7.41,15.59L12,11l4.59,4.59L18,14l-6-6l-6,6L7.41,15.59z"
                  />
                </svg>
              </div>
            </div>

            <div style={{ display: 'flex' }}>
              <div style={{ width: '35%',marginRight:'4px' }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold' }}>Doctor Name</div>
                <select value={doctorName} onChange={handleDoctorChange}>
                  {doctorList.length > 0 ? (
                    doctorList.map((doctor) => (
                      <option key={doctor.userId} value={doctor.profileList[0].name}>
                        {doctor.profileList[0].name}
                      </option>
                    ))
                  ) : (
                    <option value={rowData.doctorName}>{rowData.doctorName}</option>
                  )}
                </select>
              </div>
              <div style={{ width: '15%',marginLeft:'4px' }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold' }}>Doctor ID</div>
                {/* <div>#{doctorId.slice(-6)}</div> */}
              </div>
              <div style={{ width: '15%' }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold' }}>Modality</div>
                <div>{''}</div>
              </div>
              <div style={{ width: '20%' }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold' }}>Speciality</div>
                <div>{rowData.category}</div>
              </div>
              <div style={{ width: '20%' }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                  Doctor Time-{rowData.doctorzone}
                </div>
                <div>{rowData.time1}</div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <BaseButton className="bg-green-500" label="Update" onClick={handleUpdate} />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                cursor: 'pointer',
                textDecoration: 'underline',
                color: 'red',
              }}
              onClick={handleCancel}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" style={{ marginRight: '5px' }}>
                <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="2" />
                <path
                  fill="none"
                  stroke="red"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="M8,8 L16,16 M16,8 L8,16"
                />
              </svg>
              Cancel This Appointment
            </div>
          </div>
        </div>
      </CardBox>
      {showComponent && (
        <>
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-50"
            onClick={() => setShowComponent(false)}
            style={{ overflow: 'hidden' }}
          ></div>
          <div
            className="fixed flex items-center justify-center"
            style={{ top: 0, left: 0, right: 0, bottom: 0, overflow: 'auto' }}
          >
            <div
              className="bg-white p-4"
              style={{
                position: 'absolute',
                top: modalPosition.top,
                left: modalPosition.left,
                maxHeight: '60vh',
                overflowY: 'hidden',
                width: '400px',
              }}
            >
              <Modal
                close={handleclosecomponent}
                slotList={slotList}
                handleSlotClick={handleSlotClick}
              />
            </div>
          </div>
        </>
      )}
      {showPopup && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              width: '500px',
              padding: '20px',
              borderRadius: '4px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
              <button className="text-gray-700 hover:text-gray-900" onClick={handleCancelModal}>
                <svg
                  className="h-5 w-5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.2929 5.29289C18.6834 4.90237 19.3166 4.90237 19.7071 5.29289C20.0976 5.68342 20.0976 6.31658 19.7071 6.70711L13.4142 13L19.7071 19.2929C20.0976 19.6834 20.0976 20.3166 19.7071 20.7071C19.3166 21.0976 18.6834 21.0976 18.2929 20.7071L12 14.4142L5.70711 20.7071C5.31658 21.0976 4.68342 21.0976 4.29289 20.7071C3.90237 20.3166 3.90237 19.6834 4.29289 19.2929L10.5858 13L4.29289 6.70711C3.90237 6.31658 3.90237 5.68342 4.29289 5.29289C4.68342 4.90237 5.31658 4.90237 5.70711 5.29289L12 11.5858L18.2929 5.29289Z" />
                </svg>
              </button>
            </div>
            <div style={{ marginBottom: '20px', marginLeft: '70px' }}>
              <p className="font-bold">You are about to cancel this Appointment</p>
            </div>
            <div
              className="bg-orange-100 border-l-4 border-orange-500 rounded-b text-orange-900 px-4 py-3 shadow-md"
              role="alert"
            >
              <div className="flex">
                <div className="py-1">
                  <svg
                    className="fill-current h-6 w-6 text-orange-500 mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm">
                    A cancellation can only be done after patients consent. By clicking cancel you
                    confirm that patient has given the consent to cancel this appointment..
                  </p>
                </div>
              </div>
            </div>
            <div
              style={{
                marginLeft: '90px',
                display: 'flex',
                marginTop: '30px',
              }}
            >
              <div style={{ paddingRight: '10px' }}>
                <BaseButton
                  label="No Thanks"
                  className="bg-gray-500 rounded-lg "
                  onClick={handleCancelModal}
                />
              </div>
              <BaseButton
                label="Cancel Appointment "
                className="bg-red-600 rounded-lg"
                onClick={handleConfirmCancel}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
