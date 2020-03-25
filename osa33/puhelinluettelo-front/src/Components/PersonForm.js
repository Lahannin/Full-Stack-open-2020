import React from 'react'

const PersonForm = ({submitForm, name, onClickName, phone, onClickPhone}) => {
  return (
    <form onSubmit={submitForm}>
      <div>
        name: <input value={name} required 
      onChange={onClickName}/>
      </div>
      <div>
        phone: <input value={phone} required
      onChange={onClickPhone}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm