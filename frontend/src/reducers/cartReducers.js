import * as actions from './../constants/cartConstants'


const cartReducer = (state={cartItems: []}, action) => {
    switch(action.type) {
        case actions.CART_ADD_REQUEST:
            return {loading: true, error: null, cartItems: state.cartItems}

        case actions.CART_ADD_SUCCESS:
            const item = action.payload
            const existItem = state.cartItems.find(x => (
                x.product === item.product && x.size === item.size
            ))

            if (existItem) {
                return {
                    loading: false,
                    cartItems: state.cartItems.map(x => 
                        x.product === existItem.product && x.size === existItem.size ? item : x
                    )
                }
            } else {
                return {
                    loading: false,
                    cartItems: [...state.cartItems, item]
                }
            }

        case actions.CART_ADD_FAIL:
            return {loading: false, error: action.payload}

        case actions.CART_REMOVE:
            return {
                cartItems: state.cartItems.filter(x => (
                    x.product !== action.product || (x.product === action.product && x.size !== action.size)
                ))
            }

        default:
            return state
    }
}


export default cartReducer