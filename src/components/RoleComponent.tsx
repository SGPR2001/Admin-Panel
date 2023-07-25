import React, { useState } from 'react'

function RoleComponent(props) {
     const [name, setName] = useState('')
     const [description, setDescription] = useState('')
     const handleCancelClick = () => {
       props.showComponent(false)
     }
 const handleAddModule = async () => {
    const moduleData = {
      name: name,
      description: description,
    };
   try {
      const response = await fetch('http://3.13.92.74:30001/acl/admin/role', {
        method: 'POST',
        headers: {
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
                <span className="font-bold">Name:</span>{' '}
                <p>
                  <input
                    className="border border-gray-400 p-1 rounded-sm"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </p>
              </h2>
              <h2 className="text-lg font-medium">
                <span className="font-bold">Description:</span>{' '}
                <p>
                  <input
                    className="border border-gray-400 p-1 rounded-sm"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlerp8c9-EKQFzOdaWtOO0Ic8ZOZeXNMlrcQ&usqp=CAU"
                  alt="Create"
                  className="cursor-pointer mb-4"
                  onClick={handleAddModule}
                  style={{ width: 50, height: 50 }}
                />
              </a>
              <a>
                <img
                  src="https://img.freepik.com/premium-vector/red-cross-mark-icon-negative-choice-symbol-sign-app-button_744955-339.jpg?w=360"
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
export default RoleComponent