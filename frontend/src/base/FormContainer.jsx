import { Container, Row, Col } from 'react-bootstrap'

const FormContainer = ({children}) => {
  return (
    <Container style={{width: '50%'}}>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={16}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer
