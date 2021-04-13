import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension' 
import productReducer from './reducers/productReducers'
import cartReducer from './reducers/cartReducers'
import {userReducer, authenticationReducer} from './reducers/userReducers'
import orderReducer from './reducers/orderReducer'
import adminReducer from './reducers/adminReducer'

const reducer = combineReducers({
    authentication: authenticationReducer,
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
    order: orderReducer,
    admin: adminReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []

const userFromStorage = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null

const addressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {}

const initialState = {
    cart: {cartItems: cartItemsFromStorage},
    authentication: {user: userFromStorage},
    order: {
        shippingAddress: addressFromStorage,
        orderDetails: {},
        myOrders: []
    }
}

const middleware = [thunk]

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        state = initialState
    }

    return reducer(state, action)
}

const store = createStore(
    rootReducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store