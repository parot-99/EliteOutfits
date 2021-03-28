import axios from 'axios'
import * as actions from './../constants/userConstants'

const userLoginAction = (email, password) => async (dispatch) => {
    try {
        dispatch({type: actions.USER_LOGIN_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post(
            '/api/users/login',
            {email, password},
            config
        )

        dispatch({type: actions.USER_LOGIN_SUCCESS, payload: data})

        localStorage.setItem('user', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: actions.USER_LOGIN_FAIL, 
            payload: error.response === undefined 
                        ? error.message 
                        : error.response.data.message
        })
    }
}

const userLogoutAction = () => (dispatch) => {
    localStorage.removeItem('user')

    dispatch({type: actions.USER_LOGOUT})
}

const userRegisterAction = (name, email, password, password2) => 
    async (dispatch) => {
        try {
            dispatch({type: actions.USER_REGISTER_REQUEST})

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const {data} = await axios.post(
                '/api/users/register',
                {name, email, password, password2},
                config
            )

            dispatch({type: actions.USER_REGISTER_SUCCESS, payload: data})
            dispatch({type: actions.USER_LOGIN_SUCCESS, payload: data})

            localStorage.setItem('user', JSON.stringify(data))
        } catch (error) {
            dispatch({
                type: actions.USER_REGISTER_FAIL, 
                payload: error.response === undefined 
                            ? error.message 
                            : error.response.data.message
            })
        }
    }

const userDetailAction = () => async(dispatch, getState) => {
    try {
        dispatch({type: actions.USER_DETAIL_REQUEST})

        const {userLogin: {user}} = getState()
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }

        const {data} = await axios.get(
            '/api/users/profile',
            config
        )

        dispatch({type: actions.USER_DETAIL_SUCCESS, payload: data})
    } catch (error) {
        dispatch({
            type: actions.USER_DETAIL_FAIL, 
            payload: error.response === undefined 
                        ? error.message 
                        : error.response.data.message
        })
    }
}

const userUpdateAction = (userInfo) => async(dispatch, getState) => {
    try {
        dispatch({type: actions.USER_UPDATE_REQUEST})

        const {userLogin: {user}} = getState()
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }

        const {data} = await axios.put(
            '/api/users/update',
            userInfo,
            config
        )

        dispatch({type: actions.USER_UPDATE_SUCCESS, payload: data})
        dispatch({
            type: actions.USER_LOGIN_SUCCESS,
            payload: {...data, token: user.token}
        })

        localStorage.setItem(
            'user',
            JSON.stringify({...data, token: user.token})
        )
    } catch (error) {
        dispatch({
            type: actions.USER_UPDATE_FAIL, 
            payload: error.response === undefined 
                        ? error.message 
                        : error.response.data.message
        })
    }
}

export {
    userLoginAction,
    userLogoutAction,
    userRegisterAction, 
    userDetailAction,
    userUpdateAction
}