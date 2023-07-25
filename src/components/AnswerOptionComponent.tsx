import React, { useState } from 'react'

function AnswerOptionComponent(props) {
  const [content, setContent] = useState('')
  const [pIdList, setPropertyIdList] = useState('')
  
  const handleCancelClick = () => {
    props.showComponent(false)
  }
  const handleAddModule = async () => {
     const propertyIdList = pIdList.split(',')
    const moduleData = {
      content: content,
      propertyIdList: propertyIdList,
    }
    try {
      const response = await fetch('http://3.13.92.74:30005/questionnaire/admin/answer-option', {
        method: 'POST',
        headers: {
          'X-User-ID': '1',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(moduleData),
      })
      if (response.ok) {
        console.log('File uploaded successfully')
        props.showComponent(false)
      } else {
        console.error('Error uploading file')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="flex justify-between mt-6">
        <div style={{ width: '80%' }}>
          <h2 className="text-lg font-medium">
            <span className="font-bold">Content:</span>{' '}
            <p>
              <input
                className="border border-gray-400 p-1 rounded-sm"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </p>
          </h2>
          <h2 className="text-lg font-medium">
            <span className="font-bold">PropertyId List:</span>{' '}
            <p>
              <input
                className="border border-gray-400 p-1 rounded-sm"
                value={pIdList}
                onChange={(e) => setPropertyIdList(e.target.value)}
              />
            </p>
          </h2>
          
         
         
        </div>
        <div
          style={{
            width: '10%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
          className="flex flex-col mt-4"
        >
          <a>
            <img
              src="https://cdn-icons-png.flaticon.com/512/992/992482.png"
              alt="Create"
              className="cursor-pointer mb-4"
              onClick={handleAddModule}
              style={{ width: 50, height: 50 }}
            />
          </a>
          <a>
            <img
              src="data:image/png;base64,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"
              alt="Cancel"
              onClick={handleCancelClick}
              className="cursor-pointer mb-4"
              style={{ width: 50, height: 50 }}
            />
          </a>
        </div>
      </div>
    </>
  )
}
export default AnswerOptionComponent
