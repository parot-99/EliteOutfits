import axios from 'axios'
import * as actions from './../constants/adminConstants'


const userListAction = () => async (dispatch, getState) => {
    try {
        dispatch({type: actions.USER_LIST_REQUEST})

        const {userLogin: {user}} = getState()
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }

        const {data} = await axios.get('/api/admin/users', config)

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