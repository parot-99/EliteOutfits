import axios from 'axios'
import * as actions from './../constants/orderConstants'


const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: actions.SAVE_SHIPPING_ADDRESS,
        payload: data
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}


const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({type: actions.ORDER_CREATE_REQUEST})

        const {authentication: {user}} = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }
        const {data} = await axios.post(
            '/api/orders/checkout',
            order,
            config
        )

        dispatch({type: actions.ORDER_CREATE_SUCCESS, payload: data})

    } catch (error) {
        dispatch({
            type: actions.ORDER_CREATE_FAIL, 
            payload: error.response === undefined 
                        ? error.message 
                        : error.response.data.message
        })
    }
}


const getOrders = () => async (dispatch, getState) => {
    try {
        dispatch({type: actions.USER_ORDER_LIST_REQUEST})

        const {authentication: {user}} = getState()           
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }
        const {data} = await axios.get(
            '/api/orders',
            config
        )
    
        dispatch({type: actions.USER_ORDER_LIST_SUCCESS, payload: data})

    } catch (error) {
        dispatch({
            type: actions.USER_ORDER_LIST_FAIL, 
            payload: error.response === undefined 
                        ? error.message 
                        : error.response.data.message
        })
    }
}


const getOrder = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: actions.ORDER_DETAIL_REQUEST})

        const {authentication: {user}} = getState()        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        } 
        const {data} = await axios.get(
            `/api/orders/${id}`,
            config
        )
    
        dispatch({type: actions.ORDER_DETAIL_SUCCESS, payload: data})

    } catch (error) {
        dispatch({
            type: actions.ORDER_DETAIL_FAIL, 
            payload: error.response === undefined 
                        ? error.message 
                        : error.response.data.message
        })
    }
}


export {saveShippingAddress, createOrder, getOrder, getOrders}