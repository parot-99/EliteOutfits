import * as actions from './../constants/orderConstatns'

const orderReducer = (state={}, action) => {
    switch (action.type) {
        case actions.SAVE_SHIPPING_ADDRESS:
            return {...state, shippingAddress: action.payload}

        // order create
    
        case actions.ORDER_CREATE_REQUEST:
            return {...state, loading: true}

        case actions.ORDER_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                newOrder: action.payload
            }

        case actions.ORDER_CREATE_FAIL:
            return {...state, loading: false, error: action.payload}

        case actions.ORDER_CREATE_RESET:
            return {...state, success: false}

        // order request

        case actions.ORDER_DETAIL_REQUEST:
            return {...state, loading: true}

        case actions.ORDER_DETAIL_SUCCESS:
            return {...state, loading: false, order: action.payload}

        case actions.ORDER_DETAIL_FAIL:
            return {...state, loading: false, error: action.payload}

        default:
            return state
    }
}

export {orderReducer}