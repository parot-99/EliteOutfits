import * as actions from './../constants/userConstants'

const userLoginReducer = (state={user: {}}, action) => {
    switch (action.type) {
        case actions.USER_LOGIN_REQUEST:
            return {loading: true, user: {}}

        case actions.USER_LOGIN_SUCCESS:
            return {loading: false, user: action.payload}

        case actions.USER_LOGIN_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state
    }
}

export {userLoginReducer}