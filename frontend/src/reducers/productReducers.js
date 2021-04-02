import * as actions from './../constants/productConstants'


const productReducer = (
    state={productsList: [], productDetail: {}, topProducts: []},
    action
) => {
    switch (action.type) {
        // product list

        case actions.PRODUCT_LIST_REQUEST:
            return {...state, loading: true, error: null, productDetail: {}}

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
            return {...state, loading: true, error: null, productsList: []}

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

        // product top

        case actions.PRODUCT_TOP_REQUEST:
            return {...state, carouselLoading: true, carouselError: null, topProducts: []}

        case actions.PRODUCT_TOP_SUCCESS:
            return {...state, carouselLoading: false, topProducts: action.payload,}

        case actions.PRODUCT_TOP_FAIL:
            return {...state, carouselLoading: false, carouselError: action.payload}
            
        default:
            return state
    }
}


export {productReducer}