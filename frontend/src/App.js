import {Fragment} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import {Header, Footer} from './base'
import {ProductList, ProductDetail} from './products'
import {Cart} from './cart'
import {UserLogin, UserRegister} from './users'

const App = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Header />
        <main className='py-3'>
          <Container>
            <Route exact path='/'>
              <ProductList />
            </Route>
            <Route path='/product/:id'>
              <ProductDetail />
            </Route>
            <Route path='/cart/:id?'>
              <Cart />
            </Route>
            <Route path='/login'>
              <UserLogin />
            </Route>
            <Route path='/register'>
              <UserRegister />
            </Route>
          </Container>
        </main>
        <Footer />
      </Fragment>
    </BrowserRouter>
  )
}

export default App
