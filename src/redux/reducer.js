import { GET_ALL_PRODUCTS,
    GET_ALL_CLIENTS,
    GET_ALL_SUPPLIERS,
    GET_ALL_SHIPPING,
    GET_ALL_ORDERS,
    GET_ALL_ACCOUNTS, 
    GET_ALL_USERS
} from './actionTypes'

import { productos, clientes, suppliers, users } from '../assets/hardcodeo';


const initialState = {
    products: productos,
    clients: clientes,
    suppliers: suppliers,
    users: users,
    shipping:[],
    accounts:[],
    orders:[],
    showModal: false,
    productId:'',
    clientId:'',
    supplierId:''
}

export default function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case 'INSERT_SUPPLIERS':
            return {
                ...state,
                suppliers: payload
            };
        case 'GET_SUPPLIER_ID':
            return {
                ...state,
                supplierId: payload
            };
        case 'EDIT_SUPPLIER':
            return {
                ...state,
                suppliers: [ ...state.suppliers, ]
            };
        case 'INSERT_CLIENTS':
            return {
                ...state,
                clients: payload
            };
        case 'GET_CLIENT_ID':
            return {
                ...state,
                clientId: payload
            };
        case 'EDIT_CLIENT':
            return {
                ...state,
                clients: [ ...state.clients, ]
            };
        case 'INSERT_PRODUCTS':
            return {
                ...state,
                products: payload
            };
        case 'GET_PRODUCT_ID':
            return {
                ...state,
                productId: payload
            };
        case 'EDIT_PRODUCT':
            return {
                ...state,
                products: [ ...state.products, ]
            };
        case 'SHOW_MODAL':
            return {
                ...state,
                showModal: true,
            };
        case 'HIDE_MODAL':
            return {
                ...state,
                showModal: false,
                modalContent: null,
            };
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