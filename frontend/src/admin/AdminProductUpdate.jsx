import {Fragment, useEffect, useState} from 'react'
import {Link, useParams, useHistory} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {PRODUCT_CREATE_RESET_ADMIN} from './../constants/adminConstants'
import {ImageUpdateField} from '.'
import {Loader, Message} from './../handlers'
import {Meta, FormContainer} from './../base'
import {productDetailAction} from './../actions/productActions'
import {productUpdateAction} from './../actions/adminActions'


const AdminProductUpdate = () => {
  const {id} = useParams()
  const history = useHistory()
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const product = useSelector(state => state.product)
  const {loading, error, productDetail} = product
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({type: PRODUCT_CREATE_RESET_ADMIN})

    if (!productDetail.name || productDetail._id !== id) {
      dispatch(productDetailAction(id))

    } else {
      setName(productDetail.name)
      setPrice(productDetail.price)
      setCategory(productDetail.category)
      setCountInStock(productDetail.countInStock)
    }

  }, [id, productDetail, dispatch])

  const getImage = (newImage) => {
    setImage(newImage)
  }

  const handleUpdate = (event) => {
    event.preventDefault()
    dispatch(productUpdateAction({
      _id: id,
      name,
      price,
      image,
      category,
      countInStock
    }))
    
    history.push('/admin/products')
  }

  return (
    <Fragment>
      <Meta title='Admin | Product' />
      <Link to='/admin/products' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>EDIT PRODUCT</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={handleUpdate}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control 
              type='text'
              placeholder='Enter name'
              autoComplete='off'
              required={true}
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='price'>
            <Form.Label>Price</Form.Label>
            <Form.Control 
              type='number'
              placeholder='Enter price'
              autoComplete='off'
              required={true}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <ImageUpdateField getImage={getImage} />
          <Form.Group controlId='category'>
            <Form.Label>Category</Form.Label>
            <Form.Control 
              as='select'
              value={category} 
              onChange={(e) => {setCategory(e.target.value) 
                console.log(category)}}
            >
              <option value='Men'>Men</option>
              <option value='Women'>Women</option>
              <option value='Kids'>Kids</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId='countInStock'>
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control 
              type='number'
              placeholder='Enter count in stock'
              autoComplete='off'
              required={true}
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='dark'>
            Update
          </Button>
        </Form>
      </FormContainer>  
    </Fragment>
  )
}


export default AdminProductUpdate