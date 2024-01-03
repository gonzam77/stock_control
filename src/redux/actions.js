
import axios from "axios";
import { URL } from "../App";
import { GET_ALL_PRODUCTS,
    GET_ALL_CLIENTS,
    GET_ALL_SUPPLIERS,
    GET_ALL_SHIPPING,
    GET_ALL_ORDERS,
    GET_ALL_ACCOUNTS, 
    GET_ALL_USERS
} from './actionTypes'

export const getAllProducts = () => {
    return async function (dispatch) {
        const response = await axios(`${URL}/products`);
        const data = response.data;
        return dispatch({
            type: GET_ALL_PRODUCTS,
            payload: data,
        })
    }
};

export const getAllClients = () => {
    return async function (dispatch) {
        const response = await axios(`${URL}/clients`);
        const data = response.data;
        return dispatch({
            type: GET_ALL_CLIENTS,
            payload: data,
        })
    }
};

export const getAllOrders = () => {
    return async function (dispatch) {
        const response = await axios(`${URL}/orders`);
        const data = response.data;
        return dispatch({
            type: GET_ALL_ORDERS,
            payload: data,
        })
    }
};

export const getAllSuppliers = () => {
    return async function (dispatch) {
        const response = await axios(`${URL}/supplies`);
        const data = response.data;
        return dispatch({
            type: GET_ALL_SUPPLIERS,
            payload: data,
        })
    }
};

export const getAllShipping = () => {
    return async function (dispatch) {
        const response = await axios(`${URL}/shipping`);
        const data = response.data;
        return dispatch({
            type: GET_ALL_SHIPPING,
            payload: data,
        })
    }
};

export const getAllAccounts = () => {
    return async function (dispatch) {
        const response = await axios(`${URL}/accounts`);
        const data = response.data;
        return dispatch({
            type: GET_ALL_ACCOUNTS,
            payload: data,
        })
    }
};

export const getAllUsers = () => {
    return async function (dispatch) {
        const response = await axios(`${URL}/products`);
        const data = response.data;
        return dispatch({
            type: GET_ALL_USERS,
            payload: data,
        })
    }
};
