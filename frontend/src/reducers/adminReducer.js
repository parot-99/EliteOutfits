import * as actions from './../constants/adminConstants'


const adminReducer = (state={usersList: []}, action) => {
    switch (action.type) {
        case actions.USER_LIST_REQUEST:
            return {...state, loading: true}

        case actions.USER_LIST_SUCCESS:
            return {...state, loading: false, usersList: action.payload}

        case actions.USER_LIST_FAIL:
            return {...state, loading: false, error: action.payload}

        case actions.USER_DELETE_REQUEST:
            return {...state, loading: true, success: false}

        case actions.USER_DELETE_SUCCESS:
            return {...state, loading: false, success: true}

        case actions.USER_DELETE_FAIL:
            return {...state, loading: false, error: action.payload}

        default:
            return state
    }
}


export default adminReducer