import axios from 'axios'
import * as actions from './../constants/checkoutConstatns'

const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: actions.SAVE_SHIPPING_ADDRESS,
        payload: data
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export {saveShippingAddress}