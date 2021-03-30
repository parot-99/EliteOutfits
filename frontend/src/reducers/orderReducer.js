import * as actions from './../constants/orderConstants'

const orderReducer = (state={}, action) => {
    switch (action.type) {
        case actions.SAVE_SHIPPING_ADDRESS:
            return {...state, error: null, shippingAddress: action.payload}

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

        // order detail

        case actions.ORDER_DETAIL_REQUEST:
            return {...state, loading: true, error: null, orderDetails: {}}

        case actions.ORDER_DETAIL_SUCCESS:
            return {...state, loading: false, orderDetails: action.payload}

        case actions.ORDER_DETAIL_FAIL:
            return {...state, loading: false, error: action.payload}

        // user order list

        case actions.USER_ORDER_LIST_REQUEST:
            return {...state, loading: true, error: null, myOrders: []}

        case actions.USER_ORDER_LIST_SUCCESS:
            return {...state, loading: false, myOrders: action.payload}

        case actions.USER_ORDER_LIST_FAIL:
            return {...state, loading: false, error: action.payload}

        default:
            return state
    }
}

export default orderReducer