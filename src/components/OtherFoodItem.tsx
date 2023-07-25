import React, { useState } from 'react'

function OtherFoodItem({ otherfood }) {
  const [editing, setEditing] = useState(false)
    const [id, setId] = useState(otherfood.id)
  const [name, setName] = useState(otherfood.name)
  const [description, setDescription] = useState(otherfood.description)
  const [imageUrl, setImageUrl] = useState(otherfood.imageUrl)
  const [markdown, setMarkDown] = useState(otherfood.markdown)
  const [showDetails, setShowDetails] = useState(false)
    const [status, setStatus] = useState(otherfood.status)
  const handleEditClick = () => {
    setEditing(true)
  }
  const handleCancelClick = () => {
    setEditing(false)
  }
  const handleUpdateClick = async () => {
    try {
      const response = await fetch(
        `http://3.13.92.74:30009/master-data/admin/other-food/id/${otherfood.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-USER-ID': '1',
          },
          body: JSON.stringify({
            name,
            description,
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
  const handleDeleteClick =async () => {
    const status = '0'
    try {
      const response = await fetch(
        `http://3.13.92.74:30009/master-data/admin/other-food/id/${otherfood.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-USER-ID': '1',
          },
          body: JSON.stringify({
            status,
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

  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {editing ? (
        <>
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <div
              style={{
                width: '80%',
              }}
            >
              <h2 className="text-lg font-medium">
                <span className="font-bold">Id:</span>{' '}
                <p className="border border-gray-400 p-1 rounded-sm">
                  <input
                    className="outline-0"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    style={{ width: '850px' }}
                  />
                </p>
              </h2>
              <h2 className="text-lg font-medium">
                <span className="font-bold">Name:</span>{' '}
                <p className="border border-gray-400 p-1 rounded-sm">
                  <input
                    className="outline-0"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </p>
              </h2>
              <h2 className="text-lg font-medium">
                <span className="font-bold">Description:</span>{' '}
                <p className="border border-gray-400 p-1 rounded-sm">
                  <input
                    className="outline-0"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </p>
              </h2>
              <h2 className="text-lg font-medium">
                <span className="font-bold">ImageUrl:</span>{' '}
                <p className="border border-gray-400 p-1 rounded-sm">
                  <input
                    className="outline-0"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    style={{ width: '850px' }}
                  />
                </p>
              </h2>
              <h2 className="text-lg font-medium">
                <span className="font-bold">MarkDown:</span>{' '}
                <textarea
                  className="outline-0"
                  value={markdown}
                  rows={4}
                  onChange={(e) => setMarkDown(e.target.value)}
                  style={{ width: '850px' }}
                />
              </h2>
            </div>
            <div className="flex flex-col mt-4 p-7 sm:w-1/5 lg:w-1/10">
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
          <div className="flex flex-col md:flex-row md:justify-between items-center relative">
            <div
              style={{
                width: '80%',
              }}
            >
              <h2 className="text-lg font-medium">
                <span className="font-bold">Id:</span>
                <p className=" h-10 border border-gray-400 p-1 rounded-sm">{id}</p>
              </h2>
              <h2 className="text-lg font-medium">
                <span className="font-bold">Name:</span>
                <p className="border border-gray-400 p-1 rounded-sm">{name}</p>
              </h2>
              <h2 className="text-lg font-medium">
                <span className="font-bold">Description:</span>
                <p className="border border-gray-400 p-1 rounded-sm">{description}</p>
              </h2>
              {showDetails && (
                <>
                  <h2 className="text-lg font-medium">
                    <span className="font-bold">ImageUrl:</span>
                    <p className="border border-gray-400 p-1 rounded-sm">{imageUrl}</p>
                  </h2>
                  <h2 className="text-lg font-medium">
                    <span className="font-bold">MarkDown:</span>
                    <p className="border border-gray-400 p-1 rounded-sm">{markdown}</p>
                  </h2>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <a onClick={() => setShowDetails(false)}>
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/2926/2926319.png"
                        alt="Show more"
                        className="py-2 px-4 rounded-md cursor-pointer mb-4"
                        style={{
                          width: 80,
                          height: 50,
                          justifyContent: 'center',
                        }}
                      />
                    </a>
                  </div>
                </>
              )}
              {!showDetails && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <a onClick={() => setShowDetails(true)}>
                    <img
                      src="https://p.kindpng.com/picc/s/134-1344553_double-chevron-down-down-arrow-icon-png-transparent.png"
                      alt="Show more"
                      className="py-2 px-4 rounded-md cursor-pointer mb-4"
                      style={{ width: 70, height: 50, justifyContent: 'center' }}
                    />
                  </a>
                </div>
              )}
            </div>
            <div className="flex flex-col mt-4 p-7 sm:w-1/5 lg:w-1/10">
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
            {status == 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                }}
              >
                <div
                  style={{
                    width: '100px',
                    height: '40px',
                    position: 'relative',
                  }}
                  className="bg-gray-200"
                >
                  <div
                    style={{
                      position: 'absolute',
                      left: '0',
                      bottom: '0',
                      width: '0',
                      height: '0',
                      borderLeft: '20px solid white',
                      borderTop: '20px solid transparent',
                      borderBottom: '20px solid transparent',
                    }}
                  ></div>
                  <div
                    style={{
                      content: '""',
                      position: 'absolute',
                      right: '-20px',
                      bottom: '0',
                      width: '0',
                      height: '0',
                      borderLeft: '20px  gray',
                      borderTop: '20px solid transparent',
                      borderBottom: '20px solid transparent',
                    }}
                  ></div>
                  <span
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    Deleted
                  </span>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default OtherFoodItem
