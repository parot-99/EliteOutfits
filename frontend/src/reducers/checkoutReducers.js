import * as actions from './../constants/checkoutConstatns'

const checkoutReducer = (state={shippingAddress: {}}, action) => {
    switch (action.type) {
        case actions.SAVE_SHIPPING_ADDRESS:
            return {shippingAddress: action.payload}
    
        default:
            return state
    }
}

export {checkoutReducer}