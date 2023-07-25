import React, { useState, useEffect } from 'react'

function UserRoleComponent(props) {
  const [user, setUser] = useState('')
  const [userid, setUserid] = useState('')
  const [role, setRole] = useState('')
  const [roleid, setRoleid] = useState('')
  const [options, setOptions] = useState([])

  const [optionsrole, setOptionsRole] = useState([])
  const [showDropdowna, setShowDropdowna] = useState(false)
  const [showDropdownb, setShowDropdownb] = useState(false)
  const [loadinga, setLoadinga] = useState(false)
  const [loadingb, setLoadingb] = useState(false)
  useEffect(() => {
    if (user) { 
      setLoadinga(true)

      // Call your API here with the entered role value
      fetch(`http://3.13.92.74:30006/authentication/admin/user/user-name-regex/${user}`)
        .then((response) => response.json())
        .then((data) => {
          setLoadinga(false)
          // Update the options state with the data received from the API
          console.log(data)
          if (data.response.status !== '204') {
            setOptions(data.response)
            console.log(options)
            setShowDropdowna(true)
          } else {
            setShowDropdowna(false)
          }
        })
        .catch((error) => console.error(error))
    }
  }, [user])
  useEffect(() => {
    if (role) {
      setLoadingb(true)
      // Call your API here with the entered role value
      fetch(`http://3.13.92.74:30001/acl/admin/role/name/${role}`)
        .then((response) => response.json())
        .then((data) => {
          setLoadingb(false)
          // Update the options state with the data received from the API
          console.log(data)
          if (data.response.status !== '204') {
            setOptionsRole([data.response])
            console.log(optionsrole)
            setShowDropdownb(true)
          } else {
            setShowDropdownb(false)
          }
        })
        .catch((error) => console.error(error))
    }
  }, [role])

  const handleCancelClick = () => {
    props.showComponent(false)
  }

  const handleOptionClick = (option) => {
    // Update the role state with the selected option

    setUser(option.userName)
    setUserid(option.id)

    setShowDropdowna(false)
  }
  const handleOptionRoleClick = (option) => {
    // Update the role state with the selected option

    setRole(option.name)
    setRoleid(option.id)
    setShowDropdownb(false)
  }
  const handleAddModule = async () => {
    const moduleData = {
      userId: userid,
      entityType:"ACCOUNT",
      entityId:"",
      roleId: roleid,
    }
    try {
      const response = await fetch('http://3.13.92.74:30001/acl/admin/user-entity-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(moduleData),
      })
      if (response.ok) {
         props.showAlert('User-Entity-Role created successfully', 'success')
        props.showComponent(false)
      } else {
        props.showAlert('User-Entity-Role not created ', 'error') 
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="flex justify-between mt-6">
        <div style={{ width: '80%' }}>
          <h2 className="text-lg font-medium" style={{ marginBottom: '1rem' }}>
            <span className="font-bold">User:</span>{' '}
            <input
              className="border border-gray-400 p-1 rounded-sm"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            {loadinga && <p>Loading...</p>}
            {!loadinga && showDropdowna && options && (
              <div className="pl-12">
                <ul  style={{ width: '28.5%' }}>
                  {options.map((option) => (
                    <li
                      className="border border-gray-400 p-1 rounded-sm "
                       key={option.id}
                      onClick={() => handleOptionClick(option)}
                    >
                      {option.userName}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </h2>
          <h2
            className="text-lg font-medium"
            style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}
          >
            <span className="font-bold" style={{ marginRight: '1rem' }}>
              Entity Type:
            </span>
            <p className="h-10 border border-gray-400 p-1 rounded-sm" style={{ flex: 0.3 }}>
              ACCOUNT
            </p>
          </h2>

          <h2
            className="text-lg font-medium"
            style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}
          >
            <span className="font-bold">Entity Id:</span>
            <p className="h-10 border border-gray-400 p-1 rounded-sm" style={{ flex: 0.3 }}></p>
          </h2>
          <h2 className="text-lg font-medium">
            <span className="font-bold">Role:</span>{' '}
            <input
              className="border border-gray-400 p-1 rounded-sm"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            {loadingb && <p>Loading...</p>}
            {!loadingb && showDropdownb && optionsrole && (
              <div className="pl-12">
                <ul className="border border-gray-400 p-1 rounded-sm" style={{ width: '28.5%' }}>
                  {optionsrole.map((option) => (
                    <li key={option.id} onClick={() => handleOptionRoleClick(option)}>
                      {option.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
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

export default UserRoleComponent
