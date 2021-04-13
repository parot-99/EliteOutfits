import * as actions from './../constants/userConstants'


const initialState = {
    userInfo: null
}

const authenticationReducer = (state={user: {}}, action) => {
    switch (action.type) {
        case actions.USER_LOGIN_REQUEST:
            return {loading: true, error: null}

        case actions.USER_LOGIN_SUCCESS:
            return {loading: false, user: action.payload}

        case actions.USER_LOGIN_FAIL:
            return {loading: false, error: action.payload}

        case actions.USER_LOGOUT:
            return {}

        default:
            return state
    }
}


const userReducer = (state=initialState, action) => {
    switch (action.type) {

        // user detail

        case actions.USER_DETAIL_REQUEST:
            return {...state, loading: true, error: null}

        case actions.USER_DETAIL_SUCCESS:
            return {...state, loading: false, userInfo: action.payload}

        case actions.USER_DETAIL_FAIL:
            return {...state, loading: false, error: action.payload}

        // user update

        case actions.USER_UPDATE_REQUEST:
            return {...state, updateLoading: true, updateError: null}

        case actions.USER_UPDATE_SUCCESS:
            return {
                ...state,
                updateLoading: false,
                success: true,
                userInfo: action.payload
            }

        case actions.USER_UPDATE_FAIL:
            return {
                ...state,
                updateLoading: false,
                updateError: action.payload
            }

        case actions.USER_UPDATE_RESET:
            return {...state, success: false}

        // user register

        case actions.USER_REGISTER_REQUEST:
            return {...state, loading: true, error: null}

        case actions.USER_REGISTER_SUCCESS:
            return {...state, loading: false}

        case actions.USER_REGISTER_FAIL:
            return {...state, loading: false, error: action.payload}

        default:
            return state
    }
}



export {
    authenticationReducer,
    userReducer
}