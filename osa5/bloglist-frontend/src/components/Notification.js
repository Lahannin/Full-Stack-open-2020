import React from 'react'


const Notification = ({ message, style }) => {
  if (message === null) {
    return null
  }


  return (
    <div id='message' className={style}>
      {message}
    </div>
  )
}


export default Notification