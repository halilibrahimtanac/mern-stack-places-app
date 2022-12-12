import React from 'react'
import ReactDOM from 'react-dom'
import './UserModal.css'

const UserModal = (props) => {
  const overlay = <div onClick={props.closeFunc} className='overlay'></div>
  const container = <div className='box'>
                        <img src={props.user.url}/>

                        <div className='info'>
                            <label><strong>Name: </strong>{props.user.name}</label>
                            <label><strong>Description: </strong>{props.user.description}</label>
                            <label><strong>Places: </strong>{props.user.places}</label>
                        </div>
                    </div>
  return (
    <React.Fragment>
    {ReactDOM.createPortal(overlay, document.getElementById('overlay'))}
    {ReactDOM.createPortal(container, document.getElementById('user-modal'))}
    </React.Fragment>
  )
}

export default UserModal
