import axios from "axios";
import { axiosConfig } from "../App";
import { backURL } from "../App";

export const getAllUsers = () => {
  return async function (dispatch) {
    try {
      const response = await axios(`${backURL}/usuarios`, axiosConfig);
      const data = response.data;
      return dispatch({
        type: 'GET_ALL_USERS',
        payload: data.Data,
      });
    } catch (error) {
      console.log(error);      
    }
  };
};

export const getProductById = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios(`${backURL}/producto/id/?id=${id}`, axiosConfig);
      const data = response.data;
      return dispatch({
        type: 'GET_PRODUCT_BY_ID',
        payload: data.Data,
      });
      
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllSuppliers = () => {
  return async function (dispatch) {
    try {
      const response = await axios(`${backURL}/proveedores`, axiosConfig);
      const data = response.data;
      return dispatch({
        type: 'GET_ALL_SUPPPLIERS',
        payload: data.Data,
      });
      
    } catch (error) {
      console.log(error);
    }
  };
};
export const getAllClients = () => {
  return async function (dispatch) {
    try {
      const response = await axios(`${backURL}/clientes`, axiosConfig);
      const data = response.data;
      return dispatch({
        type: 'GET_ALL_CLIENTS',
        payload: data.Data,
      });
      
    } catch (error) {
      console.log(error);
    }
  };
};
export const getAllAccounts = () => {
  return async function (dispatch) {
    try {
      const response = await axios(`${backURL}/cuentas`, axiosConfig);
      const data = response.data;
      return dispatch({
        type: 'GET_ALL_ACCOUNTS',
        payload: data.Data,
      });
      
    } catch (error) {
      console.log(error);
    }
  };
};
export const getAllAccountTypes = () => {
  return async function (dispatch) {
    try {
      const response = await axios(`${backURL}/tipocuentas`, axiosConfig);
      const data = response.data;
      return dispatch({
        type: 'GET_ALL_ACCOUNT_TYPES',
        payload: data.Data,
      });
      
    } catch (error) {
      console.log(error);
    }
  };
};
export const getAllPersons = () => {
  return async function (dispatch) {
    try {
      const response = await axios(`${backURL}/personas`, axiosConfig);
      const data = response.data;
      return dispatch({
        type: 'GET_ALL_PERSONS',
        payload: data.Data,
      });
      
    } catch (error) {
      console.log(error);
    }
  };
};
export const getAllProducts = () => {
  return async function (dispatch) {
    try {
      const response = await axios(`${backURL}/productos`, axiosConfig);
      const data = response.data;
      return dispatch({
        type: 'GET_ALL_PRODUCTS',
        payload: data.Data,
      });
      
    } catch (error) {
      console.log(error);
    }
  };
};

export const cleanAccountTypes = () => {
  return async function(dispatch){
    return dispatch({
      type: "CLEAN_ACCOUNT_TYPES",
      payload: [],
    });
  }
};
export const cleanClient = () => {
  return async function(dispatch){
    return dispatch({
      type: "CLEAN_CLIENT",
      payload: [],
    });
  }
};
export const cleanSuppliers = () => {
  return async function(dispatch){
    return dispatch({
      type: "CLEAN_SUPPLIERS",
      payload: [],
    });
  }
};

export const cleanPerson = () => {
  return async function(dispatch){
    return dispatch({
      type: "CLEAN_PERSONS",
      payload: [],
    });
  }
};

export const cleanUsers = () => {
  return async function(dispatch){
    return dispatch({
      type: "CLEAN_USERS",
      payload: [],
    });
  }
};

export const cleanProducts = () => {
  return async function(dispatch){
    return dispatch({
      type: "CLEAN_PRODUCTS",
      payload: [],
    });
  }
};

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

export const getPersonId = (id) => {
  return {
    type: "GET_PERSON_ID",
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

