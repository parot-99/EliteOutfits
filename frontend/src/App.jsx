import {Fragment} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import {Header, Footer} from './base'
import {ProductList, ProductDetail} from './products'
import {CartList} from './cart'
import {UserLogin, UserRegister, Profile} from './users'
import {Shipping, PlaceOrder, OrderDetail} from './orders'
import * as Admin from './admin'
import {PrivateRoute, AdminRoute, NotFound} from './routing'


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
              <Route exact path='/page/:pageNumber'>
                <ProductList />
              </Route>
              <Route exact path='/product/:id'>
                <ProductDetail />
              </Route>
              <Route exact path='/cart/:id?'>
                <CartList />
              </Route>
              <Route exact path='/login'>
                <UserLogin />
              </Route>
              <Route exact path='/register'>
                <UserRegister />
              </Route>
              <PrivateRoute exact path='/profile'>
                <Profile />
              </PrivateRoute>
              <PrivateRoute exact path='/shipping'>
                <Shipping />
              </PrivateRoute>
              <PrivateRoute exact path='/placeorder'>
                <PlaceOrder />
              </PrivateRoute>
              <PrivateRoute exact path='/order/:id'>
                <OrderDetail />
              </PrivateRoute>
              <AdminRoute exact path='/admin/users'>
                <Admin.AdminUserList />
              </AdminRoute>
              <AdminRoute exact path='/admin/users/:id'>
                <Admin.AdminUserUpdate />
              </AdminRoute>
              <AdminRoute exact path='/admin/products'>
                <Admin.AdminProductList />
              </AdminRoute>
              <AdminRoute exact path='/admin/products/page/:pageNumber'>
                <Admin.AdminProductList />
              </AdminRoute>
              <AdminRoute exact path='/admin/orders'>
                <Admin.AdminOrderList />
              </AdminRoute>
              <AdminRoute exact path='/admin/product/:id'>
                <Admin.AdminProductUpdate />
              </AdminRoute>
              <AdminRoute exact path='/admin/pricefactor'>
                <Admin.AdminPriceFactor />
              </AdminRoute>
              <Route>
                <NotFound />
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