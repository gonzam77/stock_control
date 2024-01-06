import { GET_ALL_PRODUCTS,
    GET_ALL_CLIENTS,
    GET_ALL_SUPPLIERS,
    GET_ALL_SHIPPING,
    GET_ALL_ORDERS,
    GET_ALL_ACCOUNTS, 
    GET_ALL_USERS,
    CHANEGE_PRODUCT_MODAL
} from './actionTypes'
import { changeProductModal } from './actions'



const initialState = {
    products: [],
    clients: [],
    suppliers: [],
    users:[],
    shipping:[],
    accounts:[],
    orders:[],
    productModal:false
}

export default function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case changeProductModal:
            if(state.productModal === true) {
                return {
                    ...state,
                    productModal: false
                }
            } else {
                return {
                    ...state,
                    productModal: false
                }
            }
        case GET_ALL_USERS:
            return {
                ...state,
                users: payload
            }
        case GET_ALL_ACCOUNTS:
            return {
                ...state,
                accounts: payload
            }
        case GET_ALL_CLIENTS:
            return {
                ...state,
                clients: payload
            }
            case GET_ALL_ORDERS:
        return {
            ...state,
            orders: payload
        }
        case GET_ALL_SHIPPING:
        return {
            ...state,
            shipping: payload
        }
        case GET_ALL_SUPPLIERS:
        return {
            ...state,
            suppliers: payload
        }
        case GET_ALL_PRODUCTS:
        return {
            ...state,
            products: payload
        }        
        default:
            return { ...state }
    }
}