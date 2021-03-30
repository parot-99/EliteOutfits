import {useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {productCreateAction} from './../actions/adminActions'


const AdminProductCreate = () => {
  const admin = useSelector(state => state.admin)
  const {createSuccess, productCreate} = admin
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (createSuccess) {
      history.push(`/admin/product/${productCreate._id}`)
    }
  }, [createSuccess, history, productCreate])

  const createProduct = () => {
    dispatch(productCreateAction())  
  }


  return (
    <Button className='my-3 btn-dark' onClick={createProduct}>
      <i className='fas fa-plus' /> Create Product
    </Button>
  )
}

export default AdminProductCreate
