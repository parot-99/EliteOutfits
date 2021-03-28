import * as actions from './../constants/adminConstants'


const adminReducer = (state={}, action) => {
    switch (action.type) {
        case actions.USER_LIST_REQUEST:
            return {loading: true}

        case actions.USER_LIST_SUCCESS:
            return {loading: false, usersList: action.payload}

        case actions.USER_LIST_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state
    }
}


export default adminReducer