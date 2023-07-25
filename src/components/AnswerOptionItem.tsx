import React, { useState } from 'react'

function AnswerOptionItem({ answeroption }) {
  const [editing, setEditing] = useState(false)
  const [id, setId] = useState(answeroption.id)
  const [content, setContent] = useState(answeroption.content)
 const [pIdList,setPropertyIdList]=useState('');
  const handleEditClick = () => {
    setEditing(true)
  }
  const handleCancelClick = () => {
    setEditing(false)
  }
  const handleUpdateClick = async () => {
      const propertyIdList = pIdList.split(',')
    try {
      const response = await fetch(
        `http://3.13.92.74:30005/questionnaire/admin/answer-option/id/${answeroption.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-USER-ID': '1',
          },
          body: JSON.stringify({
            content,
            propertyIdList
          }),
        }
      )

      if (!response.ok) {
        throw new Error('Failed to update the data')
      }

      setEditing(false)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteClick = () => {
    // call an API to delete the medicine here
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {editing ? (
        <>
          <div className="flex justify-between mt-6">
            <div
              style={{
                width: '80%',
              }}
            >
              <h2 className="text-lg font-medium">
                <span className="font-bold"> Id:</span>{' '}
                <p className="border border-gray-400 p-1 rounded-sm">
                  <input
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    style={{ width: '850px' }}
                  />
                </p>
              </h2>
              <h2 className="text-lg font-medium">
                <span className="font-bold">Content:</span>{' '}
                <p className="border border-gray-400 p-1 rounded-sm">
                  <input
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{ width: '850px' }}
                  />
                </p>
              </h2>
              <h2 className="text-lg font-medium">
                <span className="font-bold">PropertyIdList:</span>{' '}
                <p className="border border-gray-400 p-1 rounded-sm">
                  <input
                    value={pIdList}
                    onChange={(e) => setPropertyIdList(e.target.value)}
                    style={{ width: '850px' }}
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
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-md mb-4"
                onClick={handleUpdateClick}
              >
                Update
              </button>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-md"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between mt-6">
            <div
              style={{
                width: '80%',
              }}
            >
              <h2 className="text-lg font-medium">
                <span className="font-bold"> Id:</span>
                <p className=" h-10 border border-gray-400 p-1 rounded-sm">{id}</p>
              </h2>
              <h2 className="text-lg font-medium">
                <span className="font-bold">Content:</span>
                <p className="h-10 border border-gray-400 p-1 rounded-sm">{content}</p>
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
              {/* <a onClick={handleEditClick}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY4vn7vnrC96nFLCCYoUsLnNB94zoi-ivlID2iT7TO0-_cCtxR9_MezQU5c25ENYD0Zoo&usqp=CAU"
                  alt="Edit"
                  className="cursor-pointer mb-4"
                  style={{ width: 50, height: 50 }}
                />
              </a>
              <a onClick={handleDeleteClick}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFlZGyD2OLJFRjXfAe2xpw6KzhjBmyiz9CjIjrzZDVWxKCz9YoFeYkoOdEsqapNMDESi4&usqp=CAU"
                  alt="Delete"
                  className="cursor-pointer mb-4"
                  style={{ width: 50, height: 50 }}
                />
              </a> */}
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-md mb-4"
                onClick={handleEditClick}
              >
                Edit
              </button>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-md"
                onClick={handleDeleteClick}
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default AnswerOptionItem
