import express from 'express'
import multer from 'multer'
import path from 'path'
import dotenv from 'dotenv'
import useS3 from './../utils/useS3.js'

dotenv.config()

const router = express.Router()

const checkFileTypeS3 = (fileNmae) => {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(
        path.extname(fileNmae).toLowerCase()
    )
    const mimetype = filetypes.test(fileNmae.mimetype)

    if (extname && mimetype) {
        return 
        
    } else {
        throw new Error('Wrong file type')
    }
}


const uploadToS3 = (req, res) => {
    const s3 = useS3()

    const fileName = req.query['file-name']
    const fileType = req.query['file-type']

    // checkFileTypeS3(fileName)

    const key = `products/${path.parse(fileName).name}-${Date.now()}${path.extname(fileName)}`

    const s3Params = {
      Bucket: process.env.AWS_STORAGE_BUCKET_NAME,
      Key: key,
      Expires: 60,
      ContentType: fileType,
    }

    s3.getSignedUrl('putObject', s3Params, (error, data) => {
      if (error) {
        console.log(error)
        return res.end()
      }

      res.status(200)
      res.json({
        signedRequest: data,
        url: key
      })
    })
}

router.get('/sign-s3', uploadToS3)


export default router