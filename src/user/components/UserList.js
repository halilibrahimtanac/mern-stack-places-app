import React from 'react'
import UserItem from './UserItem'
import './UserList.css'

const UserList = (props) => {
  return (
    <div className='list'>
      {
        props.users.map((u,i) => (
            <UserItem showFunc={props.showFunc} key={i} user={u}/>
        ))
      }
    </div>
  )
}

export default UserList
