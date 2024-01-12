import axios from "axios";
import {
  GET_ALL_PRODUCTS,
  GET_ALL_CLIENTS,
  GET_ALL_SUPPLIERS,
  GET_ALL_SHIPPING,
  GET_ALL_ORDERS,
  GET_ALL_ACCOUNTS,
  GET_ALL_USERS,
} from "./actionTypes";

export const createProduct = (data) => {
  return {
    type: "CREATE_PRODUCT",
    payload: data,
  };
};

export const getSupplierId = (id) => {
  return {
    type: "GET_SUPPLIER_ID",
    payload: id,
  };
};

export const editSupplier = (data) => {
  return {
    type: "EDIT_SUPPLIER",
    payload: data,
  };
};

export const getClientId = (id) => {
  return {
    type: "GET_CLIENT_ID",
    payload: id,
  };
};
export const getUserId = (id) => {
  return {
    type: "GET_USER_ID",
    payload: id,
  };
};

export const editClient = (data) => {
  return {
    type: "EDIT_CLIENT",
    payload: data,
  };
};

export const getProductId = (id) => {
  return {
    type: "GET_PRODUCT_ID",
    payload: id,
  };
};

export const editProduct = (data) => {
  return {
    type: "EDIT_PRODUCT",
    payload: data,
  };
};

export const showModal = () => ({
  type: "SHOW_MODAL",
});

export const hideModal = () => ({
  type: "HIDE_MODAL",
});

export const showCreateModal = () => ({
  type: "SHOW_CREATE_MODAL",
});

export const hideCreateModal = () => ({
  type: "HIDE_CREATE_MODAL",
});

// export const getAllProducts = () => {
//     return async function (dispatch) {
//         const response = await axios(`${URL}/products`);
//         const data = response.data;
//         return dispatch({
//             type: GET_ALL_PRODUCTS,
//             payload: data,
//         })
//     }
// };

// export const getAllClients = () => {
//     return async function (dispatch) {
//         const response = await axios(`${URL}/clients`);
//         const data = response.data;
//         return dispatch({
//             type: GET_ALL_CLIENTS,
//             payload: data,
//         })
//     }
// };

// export const getAllOrders = () => {
//     return async function (dispatch) {
//         const response = await axios(`${URL}/orders`);
//         const data = response.data;
//         return dispatch({
//             type: GET_ALL_ORDERS,
//             payload: data,
//         })
//     }
// };

// export const getAllSuppliers = () => {
//     return async function (dispatch) {
//         const response = await axios(`${URL}/supplies`);
//         const data = response.data;
//         return dispatch({
//             type: GET_ALL_SUPPLIERS,
//             payload: data,
//         })
//     }
// };

// export const getAllShipping = () => {
//     return async function (dispatch) {
//         const response = await axios(`${URL}/shipping`);
//         const data = response.data;
//         return dispatch({
//             type: GET_ALL_SHIPPING,
//             payload: data,
//         })
//     }
// };

// export const getAllAccounts = () => {
//     return async function (dispatch) {
//         const response = await axios(`${URL}/accounts`);
//         const data = response.data;
//         return dispatch({
//             type: GET_ALL_ACCOUNTS,
//             payload: data,
//         })
//     }
// };

// export const getAllUsers = () => {
//     return async function (dispatch) {
//         const response = await axios(`${URL}/users`);
//         const data = response.data;
//         return dispatch({
//             type: GET_ALL_USERS,
//             payload: data,
//         })
//     }
// };
