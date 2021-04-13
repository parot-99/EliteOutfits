import {Fragment} from 'react'
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='page-center'> 
      <h1>OOPS!</h1>
      <h3>Error 404: Page Not Found</h3>
      <Link to='/'>
        Go Home
      </Link> 
    </div>
  )
}


export default NotFound
