import React, { ReactElement, useState,useRef } from 'react'

import SectionMain from '../components/SectionMain'
import CardBox from '../components/CardBox'
import Alert from '../components/Alert'
import LayoutAuthenticated from '../layouts/Authenticated'

const TablesPage = () => {
 const [categoryIdList, setCategoryIdList] = useState('')
 const [workflowName, setWorkflowName] = useState('')
 const [validForDays, setValidForDays] = useState('')
 const [workflowCsvFile, setWorkflowCsvFile] = useState(null)
const fileInputRef = useRef(null)
const [workflowNamed, setWorkflowNamed] = useState('')
const [version, setVersion] = useState('')
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
 const handleSubmit = async (e) => {
   e.preventDefault()

   // construct the API URL
   const apiUrl = `http://3.13.92.74:30005/questionnaire/admin/question-workflow/workflow.csv?categoryIdList=${categoryIdList}&workflowName=${workflowName}&validForDays=${validForDays}`

   // create a new FormData instance
   const formData = new FormData()
   formData.append('workflowCsvFile', workflowCsvFile)

 
   const response = await fetch(apiUrl, {
     method: 'POST',
     body: formData,
     headers: {
       'X-USER-ID': '1',
     },
   })

   if (response.ok) {
     console.log('File uploaded successfully!')
     showAlert('File uploaded successfully', 'success')
      setCategoryIdList('')
      setWorkflowName('')
      setValidForDays('')
      setWorkflowCsvFile(null)
    fileInputRef.current.value = ''
   } else {
     console.error('Error uploading file:', response.statusText)
     showAlert('File not Uploaded ', 'error')
   }
 }
const handleDownload = (e) => {
  e.preventDefault()
  const apiUrl = `http://3.13.92.74:30005/questionnaire/admin/question-workflow/workflow.csv?workflowName=${workflowNamed}&version=${version}`
  fetch(apiUrl)
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(new Blob([blob]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${workflowNamed}-v${version}.csv`)
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
    })
     setWorkflowNamed('')
     setVersion('')
     
}
  return (
    <>
      <SectionMain>
        <Alert alert={alert} />
        <CardBox className="mb-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="categoryIdList">
                Category Id List
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="categoryIdList"
                type="text"
                value={categoryIdList}
                onChange={(e) => setCategoryIdList(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="workflowName">
                Workflow Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="workflowName"
                type="text"
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="validForDays">
                Valid For Days
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="validForDays"
                type="text"
                value={validForDays}
                onChange={(e) => setValidForDays(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="file">
                WorkflowCsvFile
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="file"
                type="file"
                ref={fileInputRef}
                onChange={(e) => setWorkflowCsvFile(e.target.files[0])}
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Upload File
            </button>
          </form>
        </CardBox>
        <CardBox>
          <form onSubmit={handleDownload}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="workflowName">
                Workflow Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="workflowName"
                type="text"
                value={workflowNamed}
                onChange={(e) => setWorkflowNamed(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="validForDays">
                Version
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="validForDays"
                type="text"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
              />
            </div>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Download CSV
            </button>
          </form>
        </CardBox>
      </SectionMain>
    </>
  )
}

TablesPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default TablesPage
