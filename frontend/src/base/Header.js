import {LinkContainer} from 'react-router-bootstrap'
import {Navbar, Nav, NavDropdown, Container} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import {UserLogout} from './../users'

const Header = () => {
  const userLogin = useSelector(state => state.userLogin)
  const {user} = userLogin

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer exact to='/'>
            <Navbar.Brand>EliteOutfits</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <LinkContainer exact to='/'>
                <Nav.Link>
                  <i className='fas fa-home'></i> Home
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>
              {user && 
                <NavDropdown title={user.name} ud='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <UserLogout />
                </NavDropdown>
              }
              {!user && 
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
