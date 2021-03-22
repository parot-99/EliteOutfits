import {Fragment} from 'react'
import {Row, Col} from 'react-bootstrap'
import {UserUpdate, UserOrders} from '.'

const Profile = () => {
  return (
    <Fragment>
      <Row>
        <Col md={3}>
          <h2>USER PROFILE</h2>
          <UserUpdate />
        </Col>
        <Col md={9}>
          <h2>MY ORDERS</h2>
          <UserOrders />
        </Col>
      </Row>
    </Fragment>
  )
}

export default Profile
