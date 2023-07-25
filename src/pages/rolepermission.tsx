import React, { ReactElement, useState } from 'react'
import SectionMain from '../components/SectionMain'
import CardBox from '../components/CardBox'
import BaseButton from '../components/BaseButton'
import LayoutAuthenticated from '../layouts/Authenticated'
import RolePermissionComponent from '../components/RolePermissionComponent'
import Alert from '../components/Alert'
const TablesPage = () => {
 
  const [showComponent, setShowComponent] = useState(false)
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500)
  }
  // const [showModal,setShowModal]=useState(false)
  // const [shownotModal, setShowNotModal] = useState(false)
  const handleCancelClick = () => {
    setShowComponent(false)
  }
  //  const handleModalClose = () => {
  //    setShowModal(true)
  //  }
  //  const handlenotModalClose = () => {
  //    setShowNotModal(true)
  //  }
  //  const handleModalOpen = () => {
  //    setShowModal(false)
  //  }
  //  const handlenotModalOpen = () => {
  //    setShowNotModal(false)
  //  }
  return (
    <>
      <SectionMain>
        <Alert alert={alert} />
        <CardBox className=" mb-6 ">
          <div className="flex justify-end">
            <BaseButton
              label="Create Role-Permission"
              onClick={() => setShowComponent(true)}
              className="bg-blue-500 border-blue-500 hover:bg-[#7dd3fc] text-white font-bold py-2 px-4 rounded"
            />
          </div>
        </CardBox>
        {/* {shownotModal && (
          <CardBox className=" md:w-7/12 xl:w-7/12  md:mx-auto mb-6">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h2 style={{ flex: '0.9' }}>Role Permission mapping is not Created</h2>
              <BaseButton
                label="Close"
                onClick={handlenotModalOpen}
                className="bg-blue-500 border-blue-500 hover:bg-[#7dd3fc] text-white font-bold py-2 px-4 rounded"
              />
            </div>
          </CardBox>
        )} */}
        {showComponent && (
          <CardBox className="mb-6"> 
            <RolePermissionComponent showAlert={showAlert}showComponent={handleCancelClick} />
          </CardBox>
        )}
        {/* {showModal && (
          <CardBox className=" md:w-7/12 xl:w-4/12  md:mx-auto mb-6">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h2 style={{ flex: '0.9' }}>Successfully Created</h2>
              <BaseButton
                label="Close"
                onClick={handleModalOpen}
                className="bg-blue-500 border-blue-500 hover:bg-[#7dd3fc] text-white font-bold py-2 px-4 rounded"
              />
            </div>
          </CardBox>
        )} */}
      </SectionMain>
    </>
  )
}

TablesPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default TablesPage
