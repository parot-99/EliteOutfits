import {useState} from 'react'
import {Form} from 'react-bootstrap'
import {Loader} from './../handlers'
import axios from 'axios'


const ImageUpdateField = ({getImage}) => {
  const [image, setImage] = useState('')
  const [uploading, setUploading] = useState(false)


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

      const {data} = await axios.get(
        `/api/upload/sign-s3?file-name=${file.name}&file-type=${file.type}`
      )

      await axios.put(data.signedRequest, file, config)

      setImage(data.url)
      getImage(data.url)
      setUploading(false)
      
    } catch (error) {
      console.log(error)
      setUploading(false)
    }
  }

  return (
    <Form.Group controlId='image'>
      <Form.Label>Image</Form.Label>
      <Form.Control 
        type='text'
        placeholder='Enter image path'
        autoComplete='off'
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
  )
}


export default ImageUpdateField
