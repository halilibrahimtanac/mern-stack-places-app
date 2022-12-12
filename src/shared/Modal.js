import React from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'

const Modal = (props) => {
  const overlay = <div onClick={props.closeFunc} className='overlay'></div>
  const content = <div className={props.className}>{props.children}</div>
  return (
    <React.Fragment>
    {ReactDOM.createPortal(overlay, document.getElementById('overlay'))}
    {ReactDOM.createPortal(content, document.getElementById('user-modal'))}
    </React.Fragment>
  )
}

export default Modal
