import {Fragment} from 'react'
import {NavLink} from 'react-router-dom'
import {Table, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Loader, Message} from './../handlers'
import {userListAction} from './../actions/adminActions'

const UserList = () => {
  const admin = useSelector(state => state.admin)
  const {loading, error, usersList} = admin
  const dispatch = useDispatch


  return (
    <Fragment>
      
    </Fragment>
  )
}

export default UserList
