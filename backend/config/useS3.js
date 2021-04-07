import aws from 'aws-sdk'


const useS3 = () => {
    aws.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    })
    
    const s3 = new aws.S3({   
        region: 'us-east-2',
    })

    return s3
}


export default useS3