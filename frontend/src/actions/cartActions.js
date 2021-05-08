import axios from 'axios'
import * as actions from './../constants/cartConstants'


const addToCart = (id, quanity, size) => async (dispatch, getState) => {
    try {
        dispatch({type: actions.CART_ADD_REQUEST})

        const {data} = await axios.get(`/api/products/${id}`)

        dispatch({
            type: actions.CART_ADD_SUCCESS,
            payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                quanity,
                size
            }
        })

        localStorage.setItem(
            'cartItems', JSON.stringify(getState().cart.cartItems)
        )
    } catch (error) {
        dispatch({
            type: actions.CART_ADD_FAIL, 
            payload: error.response === undefined 
                        ? error.message 
                        : error.response.data.message
        })
    }
}


const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: actions.CART_REMOVE,
        payload: id
    })

    localStorage.setItem(
        'cartItems', JSON.stringify(getState().cart.cartItems)
    )
}


export {addToCart, removeFromCart}