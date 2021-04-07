import express from 'express'
import multer from 'multer'
import path from 'path'
import dotenv from 'dotenv'
import useS3 from './../config/useS3.js'

dotenv.config()

const router = express.Router()


const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    }, 
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        )
    }
})


function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    )
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
        return cb(null, true)
        
    } else {
        cb('Images only!')
    }
}

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb)
    }
})


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


router.post('/', upload.single('image'), (req, res) => {
    res.send(`uploaded`)
})


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