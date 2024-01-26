// import axios from "axios";
// import {
//   GET_ALL_PRODUCTS,
//   GET_ALL_CLIENTS,
//   GET_ALL_SUPPLIERS,
//   GET_ALL_SHIPPING,
//   GET_ALL_ORDERS,
//   GET_ALL_ACCOUNTS,
//   GET_ALL_USERS,
// } from "./actionTypes";

export const addToCart = (data) => {
  return {
    type: "ADD_TO_CART",
    payload: data,
  };
};

export const newTransfer = (data) => {
  return {
    type: "NEW_TRANSFER",
    payload: data,
  };
};
export const newSetting = (data) => {
  return {
    type: "NEW_SETTING",
    payload: data,
  };
};
export const newPurchase = (data) => {
  return {
    type: "NEW_PURCHASE",
    payload: data,
  };
};

export const newSale = (data) => {
  return {
    type: "NEW_SALE",
    payload: data,
  };
};

export const createAccountType = (data) => {
  return {
    type: "CREATE_ACCOUNT_TYPE",
    payload: data,
  };
};
export const createOffer = (data) => {
  return {
    type: "CREATE_OFFER",
    payload: data,
  };
};

export const createCategory = (data) => {
  return {
    type: "CREATE_CATEGORY",
    payload: data,
  };
};

export const createMesure = (data) => {
  return {
    type: "CREATE_MESURE",
    payload: data,
  };
};

export const createDeposit = (data) => {
  return {
    type: "CREATE_DEPOSIT",
    payload: data,
  };
};

export const createRol = (data) => {
  return {
    type: "CREATE_ROL",
    payload: data,
  };
};

export const createUser = (data) => {
  return {
    type: "CREATE_USER",
    payload: data,
  };
};

export const createAccount = (data) => {
  return {
    type: "CREATE_ACCOUNT",
    payload: data,
  };
};

export const createDispatcher = (data) => {
  return {
    type: "CREATE_DISPATCHER",
    payload: data,
  };
};

export const createClient = (data) => {
  return {
    type: "CREATE_CLIENT",
    payload: data,
  };
};

export const createProduct = (data) => {
  return {
    type: "CREATE_PRODUCT",
    payload: data,
  };
};

export const createSupplier = (data) => {
  return {
    type: "CREATE_SUPPLIER",
    payload: data,
  };
};

export const getAccountTypeId = (id) => {
  return {
    type: "GET_ACCOUNT_TYPE_ID",
    payload: id,
  };
};
export const getMesureId = (id) => {
  return {
    type: "GET_MESURE_ID",
    payload: id,
  };
};

export const getAccountId = (id) => {
  return {
    type: "GET_ACCOUNT_ID",
    payload: id,
  };
};

export const getDepositId = (id) => {
  return {
    type: "GET_DEPOSIT_ID",
    payload: id,
  };
};

export const getOfferId = (id) => {
  return {
    type: "GET_OFFER_ID",
    payload: id,
  };
};

export const getProductId = (id) => {
  return {
    type: "GET_PRODUCT_ID",
    payload: id,
  };
};

export const getDispatcherId = (id) => {
  return {
    type: "GET_DISPATCHER_ID",
    payload: id,
  };
};

export const getRolId = (id) => {
  return {
    type: "GET_ROL_ID",
    payload: id,
  };
};

export const getCategoryId = (id) => {
  return {
    type: "GET_CATEGORY_ID",
    payload: id,
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

export const getSupplierId = (id) => {
  return {
    type: "GET_SUPPLIER_ID",
    payload: id,
  };
};

export const editAccountType = (data) => {
  console.log('action',data);
  return {
    type: "EDIT_ACCOUNT_TYPE",
    payload: data,
  };
};

export const editMesure = (data) => {
  return {
    type: "EDIT_MESURE",
    payload: data,
  };
};

export const editCategory = (data) => {
  return {
    type: "EDIT_CATEGORY",
    payload: data,
  };
};

export const editAccount = (data) => {
  return {
    type: "EDIT_ACCOUNT",
    payload: data,
  };
};

export const editDeposit = (data) => {
  return {
    type: "EDIT_DEPOSIT",
    payload: data,
  };
};

export const editOffer = (data) => {
  return {
    type: "EDIT_OFFER",
    payload: data,
  };
};

export const editUserRol = (data) => {
  return {
    type: "EDIT_USER_ROL",
    payload: data,
  };
};

export const editUser = (data) => {
  return {
    type: "EDIT_USER",
    payload: data,
  };
};

export const editDispatcher = (data) => {
  return {
    type: "EDIT_DISPATCHER",
    payload: data,
  };
};

export const editSupplier = (data) => {
  return {
    type: "EDIT_SUPPLIER",
    payload: data,
  };
};

export const editClient = (data) => {
  return {
    type: "EDIT_CLIENT",
    payload: data,
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

export const showCreateModal = () => ({
  type: "SHOW_CREATE_MODAL",
});

export const showModalMesure = () => ({
  type: "SHOW_MODAL_MESURE",
});

export const showModalAccountType = () => ({
  type: "SHOW_MODAL_ACCOUNT_TYPE",
});

export const showModalCategories = () => ({
  type: "SHOW_MODAL_CATEGORIES",
});

export const hideModal = () => ({
  type: "HIDE_MODAL",
});

export const hideCreateModal = () => ({
  type: "HIDE_CREATE_MODAL",
});

export const hideModalAccountType = () => ({
  type: "HIDE_MODAL_ACCOUNT_TYPE",
});

export const hideModalCategories = () => ({
  type: "HIDE_MODAL_CATEGORIES",
});

export const hideModalMesure = () => ({
  type: "HIDE_MODAL_MESURE",
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
