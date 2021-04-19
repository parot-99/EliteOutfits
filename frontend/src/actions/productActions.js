import axios from 'axios'
import * as actions from './../constants/productConstants'


const productListAction = (pageNumber = '', category) => async (dispatch) => {
    try {
        dispatch({type: actions.PRODUCT_LIST_REQUEST})

        const {data} = await axios.get(
            `/api/products?pageNumber=${pageNumber}&category=${category}`
        )

        dispatch({type:actions.PRODUCT_LIST_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: actions.PRODUCT_LIST_FAIL, 
            payload: error.response === undefined 
                        ? error.message 
                        : error.response.data.message
        })
    }
}


const productDetailAction = (id, isAdmin=false) => async (dispatch) => {
    try {
        dispatch({type: actions.PRODUCT_DETAIL_REQUEST})

        const route = 
            isAdmin
            ?`/api/products/${id}?isAdmin`
            :`/api/products/${id}`

        const {data} = await axios.get(route)

        dispatch({type: actions.PRODUCT_DETAIL_SUCCESS, payload: data})

    } catch (error) {
        dispatch({
            type: actions.PRODUCT_DETAIL_FAIL,
            payload: error.response === undefined 
                        ? error.message 
                        : error.response.data.message
        })
    }
}


const reviewCreateAction = (id, review) => async (dispatch, getState) => {
    try {
        dispatch({type: actions.REVIEW_CREATE_REQUEST})

        const {authentication: {user}} = getState()        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }

        await axios.post(
            `/api/products/${id}/reviews`,
            review,
            config
        )

        dispatch({type: actions.REVIEW_CREATE_SUCCESS})

    } catch (error) {
        dispatch({
            type: actions.REVIEW_CREATE_FAIL,
            payload: error.response === undefined 
                        ? error.message 
                        : error.response.data.message
        })
    }
}


const productListTopAction = () => async (dispatch) => {
    try {
        dispatch({type: actions.PRODUCT_TOP_REQUEST})

        const {data} = await axios.get('/api/products/top')

        dispatch({type:actions.PRODUCT_TOP_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: actions.PRODUCT_TOP_FAIL, 
            payload: error.response === undefined 
                        ? error.message 
                        : error.response.data.message
        })
    }
}


export {
    productListAction,
    productDetailAction,
    reviewCreateAction,
    productListTopAction
}