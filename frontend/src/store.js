import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension' 
import * as productReducers from './reducers/productReducers'
import {cartReducer} from './reducers/cartReducers'
import * as userReducers from './reducers/userReducers'
import {orderReducer} from './reducers/orderReducers'

const reducer = combineReducers({
    productList: productReducers.productListReducer,
    productDetail: productReducers.productDetailReducer,
    cart: cartReducer,
    userLogin: userReducers.userLoginReducer,
    userRegister: userReducers.userRegisterReducer,
    userDetail: userReducers.userDetailReducer,
    userUpdate: userReducers.userUpdateReducer,
    order: orderReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []

const userFromStorage = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null

const addressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : null

const initialState = {
    cart: {cartItems: cartItemsFromStorage},
    userLogin: {user: userFromStorage},
    order: {shippingAddress: addressFromStorage, loading: true}
}

const middleware = [thunk]

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store