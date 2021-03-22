import * as actions from './../constants/productConstants'

const productListReducer = (state={products: []}, action) => {
    switch (action.type) {
        case actions.PRODUCT_LIST_REQUEST:
            return {loading: true, products: []}

        case actions.PRODUCT_LIST_SUCCESS:
            return {loading: false, products: action.payload}

        case actions.PRODUCT_LIST_FAIL:
            return {...state, loading: false, error: action.payload}
            
        default:
            return state
    }
}

const productDetailReducer = (state={product: {}}, action) => {
    switch(action.type) {
        case actions.PRODUCT_DETAIL_REQUEST:
            return {loading: true, product: {}}
        case actions.PRODUCT_DETAIL_SUCCESS:
            return {loading: false, product: action.payload}
        case actions.PRODUCT_DETAIL_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export {productListReducer, productDetailReducer}