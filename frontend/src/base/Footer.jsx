import {Container, Row, Col} from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className='bg-light'>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            Copyright &copy; EliteOutfits
            {' '}
            <a 
              href='https://www.instagram.com'
              className='text-prim' 
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className='fab fa-instagram fa-lg' />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
