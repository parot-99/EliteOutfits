import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {PRODUCT_CREATE_RESET_ADMIN} from './../constants/adminConstants'


const AdminProductUpdate = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({type: PRODUCT_CREATE_RESET_ADMIN})
  }, [dispatch])

  return (
    <div>
      <h1>PRODUCT</h1>
    </div>
  )
}


export default AdminProductUpdate