import { Fragment, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Loader, Message } from './../handlers'
import { Meta, Paginate } from './../base'
import { userListAction, userDeleteAction } from './../actions/adminActions'

const AdminUserList = () => {
  const { pageNumber } = useParams()
  const admin = useSelector((state) => state.admin)
  const { loading, error, usersList, success, pages, page } = admin
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userListAction(pageNumber))
  }, [pageNumber, success, dispatch])

  const removeUser = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(userDeleteAction(id))
    }
  }

  return (
    <Fragment>
      <Meta title="Admin | Users" />
      <h1>USERS</h1>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {!loading && !error && usersList.length !== 0 && (
        <Fragment>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.isAdmin ? (
                      <i className="fas fa-check" style={{ color: 'green' }} />
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    <Link to={`/admin/users/${user._id}`}>
                      <Button className="btn-block" variant="info">
                        Edit
                      </Button>
                    </Link>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      className="btn-block"
                      onClick={() => removeUser(user._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} adminPath='users' isAdmin />
        </Fragment>
      )}
    </Fragment>
  )
}

export default AdminUserList
