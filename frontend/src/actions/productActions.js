import axios from 'axios'
import * as actions from './../constants/productConstants'

const productListAction = () => async (dispatch) => {
    try {
        dispatch({type: actions.PRODUCT_LIST_REQUEST})

        const {data} = await axios.get('/api/products')

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

const productDetailAction = (id) => async (dispatch) => {
    try {
        dispatch({type: actions.PRODUCT_DETAIL_REQUEST})

        const {data} = await axios.get(`/api/products/${id}`)

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

        const {userLogin: {user}} = getState()
        
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


export {productListAction, productDetailAction, reviewCreateAction}