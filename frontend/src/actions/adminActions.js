import axios from 'axios'
import * as actions from './../constants/adminConstants'


const userListAction = () => async (dispatch) => {
    try {
        dispatch({type: actions.USER_LIST_REQUEST})

        const {data} = await axios.get('/api/admin/users')

        dispatch({type:actions.USER_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: actions.USER_LIST_FAIL, 
            payload: error.response === undefined 
                        ? error.message 
                        : error.response.data.message
        })
    }
}


export {userListAction}