import React from 'react'

function Alert(props) {
  const capitalise = (msg) => {
    const st = msg.toLowerCase()
    return st.charAt(0).toUpperCase() + st.slice(1)
  }
  let color
  if(props.alert&&props.alert.type==='error')
  {
       color='red'
  }
  else{
    color='blue'
  }
  return (
    <div style={{ height: '50px' }}>
      {props.alert && (
        <div className={`bg-${color}-500 text-white text-sm font-bold px-4 py-3`} >
          <strong>{capitalise(props.alert.type)}</strong>:{props.alert.msg}
        </div>
      )}
    </div>
  )
}

export default Alert
