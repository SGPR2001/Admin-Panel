import React, { useState } from 'react'

function PropertyItem({ property }) {
  const [editing, setEditing] = useState(false)
  const [id,setId]=useState(property.id)
  const [entityType, setEntityType] = useState(property.entityType)
  const [entityId, setEntityId] = useState(property.entityId)
  const [value, setValue] = useState(property.value)
  const [description, setdescription] = useState( property.description)
  const [clientId, setclientId] = useState(property.clientId)

  const [showDetails, setShowDetails] = useState(false)
  const handleEditClick = () => {
    setEditing(true)
  }
  const handleCancelClick = () => {
    setEditing(false)
  }
  const handleUpdateClick = async () => {
    try {
      const response = await fetch(
        `http://3.13.92.74:30005/questionnaire/admin/property/id/${property.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-User-ID': '1',
          },
          body: JSON.stringify({
            entityType,
            entityId,
            value,
            description,
            clientId,
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
                <span className="font-bold">Entity Type:</span>{' '}
                <p className="border border-gray-400 p-1 rounded-sm">
                  <input
                    value={entityType}
                    onChange={(e) => setEntityType(e.target.value)}
                    style={{ width: '850px' }}
                  />
                </p>
              </h2>
              <h2 className="text-lg font-medium">
                <span className="font-bold">EntityId:</span>{' '}
                <p className="border border-gray-400 p-1 rounded-sm">
                  <input
                    value={entityId}
                    onChange={(e) => setEntityId(e.target.value)}
                    style={{ width: '850px' }}
                  />
                </p>
              </h2>
              <h2 className="text-lg font-medium">
                <span className="font-bold"> Value:</span>{' '}
                <p className="border border-gray-400 p-1 rounded-sm">
                  <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    style={{ width: '850px' }}
                  />
                </p>
              </h2>
              <h2 className="text-lg font-medium">
                <span className="font-bold"> Description:</span>{' '}
                <p className="border border-gray-400 p-1 rounded-sm">
                  <input
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
                    style={{ width: '850px' }}
                  />
                </p>
              </h2>
              <h2 className="text-lg font-medium">
                <span className="font-bold"> Client Id:</span>{' '}
                <p className="border border-gray-400 p-1 rounded-sm">
                  <input
                    value={clientId}
                    onChange={(e) => setclientId(e.target.value)}
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
                <span className="font-bold">Id:</span>
                <p className=" h-10 border border-gray-400 p-1 rounded-sm">{id}</p>
              </h2>
              <h2 className="text-lg font-medium">
                <span className="font-bold"> Entity Type:</span>
                <p className=" h-10 border border-gray-400 p-1 rounded-sm">{entityType}</p>
              </h2>
              <h2 className="text-lg font-medium">
                <span className="font-bold">Entity Id:</span>
                <p className="h-10 border border-gray-400 p-1 rounded-sm">{entityId}</p>
              </h2>

              {showDetails && (
                <>
                  <h2 className="text-lg font-medium">
                    <span className="font-bold">Value:</span>
                    <p className="h-10 border border-gray-400 p-1 rounded-sm">{value}</p>
                  </h2>
                  <h2 className="text-lg font-medium">
                    <span className="font-bold">Description:</span>
                    <p className="h-10 border border-gray-400 p-1 rounded-sm">{description}</p>
                  </h2>
                  <h2 className="text-lg font-medium">
                    <span className="font-bold">Client Id:</span>
                    <p className="h-10 border border-gray-400 p-1 rounded-sm">{clientId}</p>
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

export default PropertyItem
