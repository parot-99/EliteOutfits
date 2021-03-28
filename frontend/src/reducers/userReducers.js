import * as actions from './../constants/userConstants'


const userLoginReducer = (state={user: {}}, action) => {
    switch (action.type) {
        case actions.USER_LOGIN_REQUEST:
            return {loading: true}

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

const userRegisterReducer = (state={user: null}, action) => {
    switch (action.type) {
        case actions.USER_REGISTER_REQUEST:
            return {loading: true}

        case actions.USER_REGISTER_SUCCESS:
            return {loading: false, user: action.payload}

        case actions.USER_REGISTER_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state
    }
}

const userDetailReducer = (state={user: {}}, action) => {
    switch (action.type) {
        case actions.USER_DETAIL_REQUEST:
            return {loading: true}

        case actions.USER_DETAIL_SUCCESS:
            return {loading: false, userInfo: action.payload}

        case actions.USER_DETAIL_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state
    }
}

const userUpdateReducer = (state={userInfo: {}}, action) => {
    switch (action.type) {
        case actions.USER_UPDATE_REQUEST:
            return {loading: true}

        case actions.USER_UPDATE_SUCCESS:
            return {loading: false, success: true, userInfo: action.payload}

        case actions.USER_UPDATE_FAIL:
            return {loading: false, error: action.payload}

        case actions.USER_UPDATE_RESET:
            return {}

        default:
            return state
    }
}

export {
    userLoginReducer,
    userRegisterReducer,
    userDetailReducer,
    userUpdateReducer
}