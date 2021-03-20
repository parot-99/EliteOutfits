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

export {productListAction, productDetailAction}