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
            return {
                ...state,
                loading: false,
                productsList: action.payload.products,
                page: action.payload.page,
                pages: action.payload.pages
            }

        case actions.PRODUCT_LIST_FAIL:
            return {...state, loading: false, error: action.payload}

        // product detail

        case actions.PRODUCT_DETAIL_REQUEST:
            return {...state, loading: true, error: null}

        case actions.PRODUCT_DETAIL_SUCCESS:
            return {...state, loading: false, productDetail: action.payload}

        case actions.PRODUCT_DETAIL_FAIL:
            return {...state, loading: false, error: action.payload}

        // review create

        case actions.REVIEW_CREATE_REQUEST:
            return {...state, reviewLoading: true, reviewError: null}

        case actions.REVIEW_CREATE_SUCCESS:
            return {...state, reviewLoading: false, success: true}

        case actions.REVIEW_CREATE_FAIL:
            return {...state, reviewLoading: false, reviewError: action.payload}

        case actions.REVIEW_CREATE_RESET:
            return {...state, success: false}
            
        default:
            return state
    }
}


export {productReducer}