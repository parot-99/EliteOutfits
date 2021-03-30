import * as actions from './../constants/productConstants'


const productReducer = (
    state={productsList: [], productDetail: {}},
    action
) => {
    switch (action.type) {
        // product list

        case actions.PRODUCT_LIST_REQUEST:
            return {...state, loading: true, error: null}

        case actions.PRODUCT_LIST_SUCCESS:
            return {...state, loading: false, productsList: action.payload}

        case actions.PRODUCT_LIST_FAIL:
            return {...state, loading: false, error: action.payload}

        // product detail

        case actions.PRODUCT_DETAIL_REQUEST:
            return {...state, loading: true, error: null}

        case actions.PRODUCT_DETAIL_SUCCESS:
            return {...state, loading: false, productDetail: action.payload}

        case actions.PRODUCT_DETAIL_FAIL:
            return {...state, loading: false, error: action.payload}
            
        default:
            return state
    }
}


export {productReducer}