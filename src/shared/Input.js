import React, { useState } from 'react'
import { validation } from '../util/validator'
import './Input.css'

const Input = (props) => {
  const [isValid, setValid] = useState(null)

  return (
    <div className='input-element'>
      {props.inputTitle && <h3>{props.inputTitle}</h3>}

      <input className={props.inputType === "text" ? `text-input ${isValid === false && "invalid-text"}` : "submit-btn"} 
             type={props.inputType} 
             name={props.inputName}
             value={props.value}
             onChange={(e) => {
              setValid(validation(props.validators, e.target.value))
              props.onEnter(e.target.name, e.target.value, validation(props.validators, e.target.value))
              }}/>

       {(props.inputType !== "submit" && isValid === false) && <label className='invalid-label'>Invalid entry</label>}
    </div>
  )
}

export default Input
