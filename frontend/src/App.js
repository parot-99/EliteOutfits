import {Fragment} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import {Header, Footer} from './base'
import {ProductList, ProductDetail} from './products'

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
          </Container>
        </main>
        <Footer />
      </Fragment>
    </BrowserRouter>
  )
}

export default App
