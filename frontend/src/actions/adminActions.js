import axios from 'axios'
import * as actions from './../constants/adminConstants'


const userListAction = (pageNumber='') => async (dispatch, getState) => {
    try {
        dispatch({type: actions.USER_LIST_REQUEST_ADMIN})

        const {authentication: {user}} = getState()       
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }
        const { data } = await axios.get(
            `/api/admin/users?pageNumber=${pageNumber}`,
            config
        )

        dispatch({type:actions.USER_LIST_SUCCESS_ADMIN, payload: data })
        
    } catch (error) {
        dispatch({
            type: actions.USER_LIST_FAIL_ADMIN, 
            payload: error.response === undefined 
                        ? error.message 
                        : error.response.data.message
        })
    }
}


const userDeleteAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: actions.USER_DELETE_REQUEST_ADMIN})

        const {authentication: {user}} = getState()       
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }

        await axios.delete(`/api/admin/users/${id}`, config)

        dispatch({type:actions.USER_DELETE_SUCCESS_ADMIN})

    } catch (error) {
        dispatch({
            type: actions.USER_DELETE_FAIL_ADMIN, 
            payload: error.response === undefined 
                        ? error.message 
                        : error.response.data.message
        })
    }
}


const userDetailAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: actions.USER_DETAIL_REQUEST_ADMIN})

        const {authentication: {user}} = getState()     
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }
        const {data} = await axios.get(
            `/api/admin/users/${id}`,
            config
        )

        dispatch({type: actions.USER_DETAIL_SUCCESS_ADMIN, payload: data})

    } catch (error) {
        dispatch({
            type: actions.USER_DETAIL_FAIL_ADMIN, 
            payload: error.response === undefined 
                        ? error.message 
                        : error.response.data.message
        })
    }
}


const userUpdateAction = (userInfo) => async (dispatch, getState) => {
    try {
        dispatch({type: actions.USER_UPDATE_REQUEST_ADMIN})

        const {authentication: {user}} = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }
        const {data} = await axios.put(
            `/api/admin/users/${userInfo._id}`,
            userInfo,
            config
        )

        dispatch({type: actions.USER_UPDATE_SUCCESS_ADMIN, payload: data})

    } catch (error) {
        dispatch({
            type: actions.USER_UPDATE_FAIL_ADMIN, 
            payload: error.response === undefined 
                        ? error.message 
                        : error.response.data.message
        })
    }
}


const productDeleteAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: actions.PRODUCT_DELETE_REQUEST_ADMIN})

        const {authentication: {user}} = getState()    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }
        const {data} = await axios.delete(
            `/api/admin/products/${id}`,
            config
        )

        dispatch({type: actions.PRODUCT_DELETE_SUCCESS_ADMIN, payload: data})

    } catch (error) {
        dispatch({
            type: actions.PRODUCT_DELETE_FAIL_ADMIN, 
            payload: error.response === undefined 
                        ? error.message 
                        : error.response.data.message
        })
    }
}


const productCreateAction = () => async (dispatch, getState) => {
    try {
        dispatch({type: actions.PRODUCT_CREATE_REQUEST_ADMIN})

        const {authentication: {user}} = getState()      
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }
        const {data} = await axios.post(
            '/api/admin/products',
            {},
            config
        )

        dispatch({type: actions.PRODUCT_CREATE_SUCCESS_ADMIN, payload: data})

    } catch (error) {
        dispatch({
            type: actions.PRODUCT_CREATE_FAIL_ADMIN, 
            payload: error.response === undefined 
                        ? error.message 
                        : error.response.data.message
        })
    }
}


const productUpdateAction = (product) => async (dispatch, getState) => {
    try {
        dispatch({type: actions.PRODUCT_UPDATE_REQUEST_ADMIN})

        const {authentication: {user}} = getState()     
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }

        await axios.put(
            `/api/admin/products/${product._id}`,
            product,
            config
        )

        dispatch({type: actions.PRODUCT_UPDATE_SUCCESS_ADMIN})

    } catch (error) {
        dispatch({
            type: actions.PRODUCT_UPDATE_FAIL_ADMIN, 
            payload: error.response === undefined 
                        ? error.message 
                        : error.response.data.message
        })
    }
}


const orderListAction = () => async (dispatch, getState) => {
    try {
        dispatch({type: actions.ORDER_LIST_REQUEST_ADMIN})

        const {authentication: {user}} = getState()       
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }
        const {data} = await axios.get('/api/admin/orders', config)

        dispatch({type:actions.ORDER_LIST_SUCCESS_ADMIN, payload: data })
        
    } catch (error) {
        dispatch({
            type: actions.ORDER_LIST_FAIL_ADMIN, 
            payload: error.response === undefined 
                        ? error.message 
                        : error.response.data.message
        })
    }
}


const orderDeleteAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: actions.ORDER_DELETE_REQUEST_ADMIN})

        const {authentication: {user}} = getState()    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }
        const {data} = await axios.delete(
            `/api/admin/orders/${id}`,
            config
        )

        dispatch({type: actions.ORDER_DELETE_SUCCESS_ADMIN, payload: data})

    } catch (error) {
        dispatch({
            type: actions.ORDER_DELETE_FAIL_ADMIN, 
            payload: error.response === undefined 
                        ? error.message 
                        : error.response.data.message
        })
    }
}


const payOrderAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: actions.ORDER_PAY_REQUEST_ADMIN})

        const {authentication: {user}} = getState()       
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }
        const {data} = await axios.put(
            `/api/admin/orders/${id}/pay`,
            {},
            config
        )

        dispatch({type: actions.ORDER_PAY_SUCCESS_ADMIN, payload: data})

    } catch (error) {
        dispatch({
            type: actions.ORDER_PAY_FAIL_ADMIN, 
            payload: error.response === undefined 
                        ? error.message 
                        : error.response.data.message
        })
    }
}


const deliverOrderAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: actions.ORDER_PAY_REQUEST_ADMIN})

        const {authentication: {user}} = getState()      
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }
        const {data} = await axios.put(
            `/api/admin/orders/${id}/deliver`,
            {},
            config
        )

        dispatch({type: actions.ORDER_PAY_SUCCESS_ADMIN, payload: data})

    } catch (error) {
        dispatch({
            type: actions.ORDER_PAY_FAIL_ADMIN, 
            payload: error.response === undefined 
                        ? error.message 
                        : error.response.data.message
        })
    }
}


const priceFactorGetAction = () => async (dispatch, getState) => {
    try {
        dispatch({type: actions.PRICE_FACTOR_DETAIL_REQUEST})

        const {authentication: {user}} = getState()     
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }

        const {data} = await axios.get('/api/admin/pricefactor', config)

        dispatch({
            type: actions.PRICE_FACTOR_DETAIL_SUCCESS,
            payload: data.priceFactor
        })

    } catch (error) {
        dispatch({
            type: actions.PRICE_FACTOR_DETAIL_FAIL, 
            payload: error.response === undefined 
                        ? error.message 
                        : error.response.data.message
        })
    }
}


const priceFactorUpdateAction = (newPrice) => async (dispatch, getState) => {
    try {
        dispatch({type: actions.PRICE_FACTOR_UPDATE_REQUEST})

        const {authentication: {user}} = getState()     
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }

        const {data} = await axios.put(
            '/api/admin/pricefactor',
            {newPriceFactor: newPrice},
            config
        )

        dispatch({
            type: actions.PRICE_FACTOR_UPDATE_SUCCESS,
            payload: data.priceFactor
        })

    } catch (error) {
        dispatch({
            type: actions.PRICE_FACTOR_UPDATE_FAIL, 
            payload: error.response === undefined 
                        ? error.message 
                        : error.response.data.message
        })
    }
}

export {
    userListAction,
    userDeleteAction,
    userDetailAction,
    userUpdateAction,
    productDeleteAction,
    productCreateAction,
    productUpdateAction,
    orderListAction,
    orderDeleteAction,
    payOrderAction,
    deliverOrderAction,
    priceFactorGetAction,
    priceFactorUpdateAction
}