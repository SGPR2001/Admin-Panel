import React, { useState, useEffect } from 'react'
import Alert from './Alert'
function RolePermissionComponent(props) {
  const [role, setRole] = useState('')
  const [roleid, setRoleid] = useState('')
  const [permission,setPermission]=useState('')
  const [permissionid, setPermissionid] = useState('')
  const [options, setOptions] = useState([])
  const [optionspermission, setOptionsPermission] = useState([])
  const [showDropdowna, setShowDropdowna] = useState(false)
  const [showDropdownb, setShowDropdownb] = useState(false)
  const [loadinga, setLoadinga] = useState(false)
const [loadingb, setLoadingb] = useState(false)
  // const [alert, setAlert] = useState(null)
  // const showAlert = (message, type) => {
  //   setAlert({
  //     msg: message,
  //     type: type,
  //   })
  //   setTimeout(() => {
  //     setAlert(null)
  //   }, 1500)
  // }
  useEffect(() => {
    if (role) {
      setLoadinga(true)
        
      // Call your API here with the entered role value
      fetch(`http://3.13.92.74:30001/acl/admin/role/name/${role}`)
        .then((response) => response.json())
        .then((data) => {
          setLoadinga(false)
          // Update the options state with the data received from the API
          console.log(data)
          if (data.response.status!=='204') {
            setOptions([data.response])
            console.log(options)
            setShowDropdowna(true)
          } else {
            setShowDropdowna(false)
          }
        })
        .catch((error) => console.error(error))
    }
  }, [role])
   useEffect(() => {
     if (permission) {
       setLoadingb(true)
       // Call your API here with the entered role value
       fetch(`http://3.13.92.74:30001/acl/admin/permission/name/${permission}`)
         .then((response) => response.json())
         .then((data) => {
           setLoadingb(false)
           // Update the options state with the data received from the API
           console.log(data)
           if (data.response.status !== '204') {
             setOptionsPermission([data.response])
             console.log(optionspermission)
             setShowDropdownb(true)
           } else {
             setShowDropdownb(false)
           }
         })
         .catch((error) => console.error(error))
     }
   }, [permission])


  const handleCancelClick = () => {
    props.showComponent(false)
  }


  const handleOptionClick = (option) => {
    setRole(option.name)
     setRoleid(option.id)
     console.log(roleid)
    setShowDropdowna(false)
  }
    const handleOptionPermissionClick = (option) => {
      // Update the role state with the selected option
      setPermission(option.name)
       setPermissionid(option.id)
        console.log(permissionid)
      setShowDropdownb(false)
    }
    const handleAddModule = async () => {
      
      const moduleData = {
        roleId: roleid,
        permissionId: permissionid,
      }
      try {
        const response = await fetch('http://3.13.92.74:30001/acl/admin/role-permission', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(moduleData),
        })
        if (response.ok) {
            // alert('Module created successfully.')
            props.showAlert('Role Permission created successfully', 'success')
            // props.showModal(true)
          props.showComponent(false) 
        } else {
          //  alert('Module not created ')
          props.showAlert('Role Permission not created ', 'error') 
          //  props.shownotModal(true)
          console.error('Error uploading file')
        }
      } catch (error) {
        console.error(error)
      }
    }
   
  

  return (
    <>
      <div>
       
        <div className="flex justify-between mt-6">
          <div style={{ width: '80%' }}>
            <h2 className="text-lg font-medium " style={{ marginBottom: '1rem' }}>
              <span className="font-bold">Role:</span>{' '}
              <input
                className="border border-gray-400 p-1 rounded-sm"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
              {loadinga && <p>Loading...</p>}
              {!loadinga && showDropdowna && options && (
                <div className="pl-11">
                  <ul className="border border-gray-400 p-1 rounded-sm " style={{ width: '28.5%' }}>
                    {options.map((option) => (
                      <li key={option.id} onClick={() => handleOptionClick(option)}>
                        {option.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* {!loadinga && showDropdowna && options.length === 0 && <p>No matching options</p>} */}
            </h2>
            <h2 className="text-lg font-medium">
              <span className="font-bold">Permission:</span>{' '}
              <input
                className="border border-gray-400 p-1 rounded-sm"
                value={permission}
                onChange={(e) => setPermission(e.target.value)}
              />
              {loadingb && <p>Loading...</p>}
              {!loadingb && showDropdownb && optionspermission && (
                <div className="pl-12">
                  <ul className="border border-gray-400 p-1 rounded-sm" style={{ width: '28.5%' }}>
                    {optionspermission.map((option) => (
                      <li key={option.id} onClick={() => handleOptionPermissionClick(option)}>
                        {option.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* {!loadingb && showDropdownb && options.length === 0 && <p>No matching options</p>} */}
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
      </div>
    </>
  )
}

export default RolePermissionComponent
