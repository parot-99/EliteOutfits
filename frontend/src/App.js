import {Fragment} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import {Header, Footer} from './base'
import {ProductList, ProductDetail} from './products'
import {Cart} from './cart'
import {UserLogin, UserRegister, Profile} from './users'

const App = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Header />
        <main className='py-3'>
          <Container>
            <Switch>
              <Route exact path='/'>
                <ProductList />
              </Route>
              <Route exact path='/product/:id'>
                <ProductDetail />
              </Route>
              <Route exact path='/cart/:id?'>
                <Cart />
              </Route>
              <Route exact path='/login'>
                <UserLogin />
              </Route>
              <Route exact path='/register'>
                <UserRegister />
              </Route>
              <Route exact path='/profile'>
                <Profile />
              </Route>
              <Route>
                <h1>404 NOT FOUND</h1>
              </Route>
            </Switch>
          </Container>
        </main>
        <Footer />
      </Fragment>
    </BrowserRouter>
  )
}

export default App
