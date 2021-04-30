import { Fragment } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { UserLogout } from './../users'

const Header = () => {
  const authentication = useSelector(state => state.authentication)
  const {user} = authentication

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container> 
          <Link to='/'>
            <Navbar.Brand>EliteOutfits</Navbar.Brand>       
          </Link>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>         
              <Nav.Link as={NavLink} exact to='/'>
                <i className='fas fa-home'></i> Home
              </Nav.Link>                    
              <Nav.Link as={NavLink} to='/cart'>
                <i className='fas fa-shopping-cart'></i> Cart
              </Nav.Link>         
              {user && 
                <Fragment> 
                  <NavDropdown title={user.name} id='username'>
                    <NavDropdown.Item as={Link} to='/profile'>
                        <i className='far fa-user-circle'></i>
                        {' '}Profile
                    </NavDropdown.Item>   
                    <UserLogout />
                  </NavDropdown>
                </Fragment>
              }
              {user && user.isAdmin && 
                <Fragment>
                  <NavDropdown title='Admin' id='admin'>        
                    <NavDropdown.Item as={Link} to='/admin/users'>
                      Users
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/admin/products'>
                      Products
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/admin/orders'>
                      Orders
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/admin/pricefactor'>
                      Price Factor
                    </NavDropdown.Item>
                  </NavDropdown>
                </Fragment>
              }
              {!user &&               
                <Nav.Link as={NavLink} to='/login'>
                  <i className='fas fa-user'></i> Sign In
                </Nav.Link>             
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
