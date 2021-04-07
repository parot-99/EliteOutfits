import {Fragment, useEffect, useState} from 'react'
import {Link, useParams, useHistory} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {PRODUCT_CREATE_RESET_ADMIN} from './../constants/adminConstants'
import {Loader, Message} from './../handlers'
import {Meta} from './../base'
import {FormContainer} from './../base'
import {productDetailAction} from './../actions/productActions'
import {productUpdateAction} from './../actions/adminActions'
import axios from 'axios'


const AdminProductUpdate = () => {
  const {id} = useParams()
  const history = useHistory()
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [uploading, setUploading] = useState(false)
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
      setImage(productDetail.image)
      setCategory(productDetail.category)
      setCountInStock(productDetail.countInStock)
    }

  }, [id, productDetail, dispatch])

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

  const uploadFile = async (event) => {
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': file.type
        }
      }

      // const {data} = await axios.post('/api/upload', formData, config)
      const {data} = await axios.get(
        `/api/upload/sign-s3?file-name=${file.name}&file-type=${file.type}`
      )
      console.log(data);

      const uploaded = await axios.put(data.signedRequest, file, config)

      setImage(data.url)
      setUploading(false)
      
    } catch (error) {
      console.log(error)
      setUploading(false)
    }
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
          <Form.Group controlId='image'>
            <Form.Label>Image</Form.Label>
            <Form.Control 
              type='text'
              placeholder='Enter image path'
              autoComplete='off'
              required={true}
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
            <Form.File 
              id='image-file'
              label='Choose File'
              custom
              onChange={uploadFile}
            ></Form.File>
            {uploading && <Loader />}
          </Form.Group>
          <Form.Group controlId='category'>
            <Form.Label>Category</Form.Label>
            <Form.Control 
              type='text'
              placeholder='Enter category'
              autoComplete='off'
              required={true}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
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