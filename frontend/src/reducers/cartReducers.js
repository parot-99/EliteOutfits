import {
    CART_ADD_REQUEST,
    CART_ADD_SUCCESS,
    CART_ADD_FAIL,
    CART_REMOVE
} from './../constants/cartConstants'

const cartReducer = (state={cartItems: []}, action) => {
    switch(action.type) {
        case CART_ADD_REQUEST:
            return {loading: true, cartItems: state.cartItems}

        case CART_ADD_SUCCESS:
            const item = action.payload
            const existItem = state.cartItems.find(
                x => x.product === item.product
            )

            if (existItem) {
                return {
                    loading: false,
                    cartItems: state.cartItems.map(
                        x => x.product === existItem.product ? item : x
                    )
                }
            } else {
                return {
                    loading: false,
                    cartItems: [...state.cartItems, item]
                }
            }

        case CART_ADD_FAIL:
            return {loading: false, error: action.payload}

        case CART_REMOVE:
            return {
                cartItems: state.cartItems.filter(x => (
                    x.product !== action.payload)
                ) 
            }

        default:
            return state
    }
}

export {cartReducer}