import React, { useState, useEffect } from 'react'

function UserModuleComponent(props) {
  const [user, setUser] = useState('')
  const [userid, setUserid] = useState('')
  const [module, setModule] = useState('')
  const [moduleid, setModuleid] = useState('')
  const [options, setOptions] = useState([])

  const [optionsmodule, setOptionsModule] = useState([])
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
    if (module) {
      setLoadingb(true)
      // Call your API here with the entered role value
      fetch(`http://3.13.92.74:30001/acl/admin/module/name/${module}`)
        .then((response) => response.json())
        .then((data) => {
          setLoadingb(false)
          // Update the options state with the data received from the API
          console.log(data)
          if (data.response.status !== '204') {
            setOptionsModule([data.response])
            console.log(optionsmodule)
            setShowDropdownb(true)
          } else {
            setShowDropdownb(false)
          }
        })
        .catch((error) => console.error(error))
    }
  }, [module])

  const handleCancelClick = () => {
    props.showComponent(false)
  }

  const handleOptionClick = (option) => {
    // Update the role state with the selected option

    setUser(option.userName)
    setUserid(option.id)

    setShowDropdowna(false)
  }
  const handleOptionModuleClick = (option) => {
    // Update the role state with the selected option

    setModule(option.name)
    setModuleid(option.id)
    setShowDropdownb(false)
  }
  const handleAddModule = async () => {
    const moduleData = {
     userId: userid,
      moduleId: moduleid,
    }
    try {
      const response = await fetch('http://3.13.92.74:30001/acl/admin/user-module', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(moduleData),
      })
      console.log(response)
      if (response.ok) {
         props.showAlert('User-Module created successfully', 'success')

        props.showComponent(false)

      } else {
       props.showAlert('User-Module not created ', 'error') 
        // const cardbox = document.createElement('div')
        // cardbox.textContent = 'Module not created'
        // cardbox.style.backgroundColor = '#d9534f'
        // cardbox.style.color = '#fff'
        // cardbox.style.padding = '1rem'
        // cardbox.style.position = 'fixed'
        // cardbox.style.bottom = '1rem'
        // cardbox.style.right = '1rem'
        // cardbox.style.zIndex = '9999'
        // document.body.appendChild(cardbox)
        // setTimeout(() => {
        //   cardbox.remove()
        // }, 3000)
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
                    <li className="border border-gray-400 p-1 rounded-sm " key={option.id} onClick={() => handleOptionClick(option)}>
                      {option.userName}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </h2>
          <h2 className="text-lg font-medium">
            <span className="font-bold">Module:</span>{' '}
            <input
              className="border border-gray-400 p-1 rounded-sm"
              value={module}
              onChange={(e) => setModule(e.target.value)}
            />
            {loadingb && <p>Loading...</p>}
            {!loadingb && showDropdownb && optionsmodule && (
              <div className="pl-14">
                <ul className="border border-gray-400 p-1 rounded-sm" style={{ width: '28.5%' }}>
                  {optionsmodule.map((option) => (
                    <li key={option.id} onClick={() => handleOptionModuleClick(option)}>
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

export default UserModuleComponent
