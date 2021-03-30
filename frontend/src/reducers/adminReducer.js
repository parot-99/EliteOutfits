import * as actions from './../constants/adminConstants'


const adminReducer = (
    state={usersList: [], userDetail: {}, orderList: [], productCreate: {}},
    action
) => {
    switch (action.type) {
        // users list

        case actions.USER_LIST_REQUEST_ADMIN:
            return {...state, loading: true, error: null}

        case actions.USER_LIST_SUCCESS_ADMIN:
            return {...state, loading: false, usersList: action.payload}

        case actions.USER_LIST_FAIL_ADMIN:
            return {...state, loading: false, error: action.payload}

        // user delete

        case actions.USER_DELETE_REQUEST_ADMIN:
            return {...state, loading: true, error: null, success: false}

        case actions.USER_DELETE_SUCCESS_ADMIN:
            return {...state, loading: false, success: true}

        case actions.USER_DELETE_FAIL_ADMIN:
            return {...state, loading: false, error: action.payload}

        // user detail

        case actions.USER_DETAIL_REQUEST_ADMIN:
            return {...state, loading: true, error: null}

        case actions.USER_DETAIL_SUCCESS_ADMIN:
            return {...state, loading: false, userDetail: action.payload}

        case actions.USER_DETAIL_FAIL_ADMIN:
            return {...state, loading: false, error: action.payload}

        // user update

        case actions.USER_UPDATE_REQUEST_ADMIN:
            return {...state, loading: true, error: null}

        case actions.USER_UPDATE_SUCCESS_ADMIN:
            return {...state, loading: false, userDetail: action.payload}

        case actions.USER_UPDATE_FAIL_ADMIN:
            return {...state, loading: false, error: action.payload}

        case actions.USER_UPDATE_RESET_ADMIN:
            return {...state, userDetail: {}}

        // order list

        case actions.ORDER_LIST_REQUEST_ADMIN:
            return {...state, loading: true, error: null}

        case actions.ORDER_LIST_SUCCESS_ADMIN:
            return {...state, loading: false, orderList: action.payload}

        case actions.ORDER_LIST_FAIL_ADMIN:
            return {...state, loading: false, error: action.payload}

        // product delete

        case actions.PRODUCT_DELETE_REQUEST_ADMIN:
            return {...state, loading: true, error: null, success: false}

        case actions.PRODUCT_DELETE_SUCCESS_ADMIN:
            return {...state, loading: false, success: true}

        case actions.PRODUCT_DELETE_FAIL_ADMIN:
            return {...state, loading: false, error: action.payload}

        // product create

        case actions.PRODUCT_CREATE_REQUEST_ADMIN:
            return {...state, loading: true, error: null}

        case actions.PRODUCT_CREATE_SUCCESS_ADMIN:
            return {
                ...state,
                loading: false,
                createSuccess: true,
                productCreate: action.payload
            }

        case actions.PRODUCT_CREATE_FAIL_ADMIN:
            return {...state, loading: false, error: action.payload}

        case actions.PRODUCT_CREATE_RESET_ADMIN:
            return {
                ...state,
                loading: false,
                createSuccess: false,
                productCreate: {}
            }

        // product update

        case actions.PRODUCT_UPDATE_REQUEST_ADMIN:
            return {...state, loading: true, error: null}

        case actions.PRODUCT_UPDATE_SUCCESS_ADMIN:
            return {...state, loading: false}

        case actions.PRODUCT_UPDATE_FAIL_ADMIN:
            return {...state, loading: false, error: action.payload}

        default:
            return state
    }
}


export default adminReducer