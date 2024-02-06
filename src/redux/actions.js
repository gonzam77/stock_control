import axios from "axios";
import { axiosConfig } from "../App";
import { backURL } from "../App";

export const getAllUserTypes = () => {
  return async function (dispatch) {
    try {
      const response = await axios(`${backURL}/tipos`, axiosConfig);
      const data = response.data;
      return dispatch({
        type: 'GET_ALL_USER_TYPES',
        payload: data.Data,
      });
    } catch (error) {
      console.log(error);      
    }
  };
};

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
export const getAllUbications = () => {
  return async function (dispatch) {
    try {
      const response = await axios(`${backURL}/ubicaciones`, axiosConfig);
      const data = response.data;
      return dispatch({
        type: 'GET_ALL_UBUCATIONS',
        payload: data.Data,
      });
      
    } catch (error) {
      console.log(error);
    }
  };
};
export const getAllDeposits = () => {
  return async function (dispatch) {
    try {
      const response = await axios(`${backURL}/bodegas`, axiosConfig);
      const data = response.data;
      return dispatch({
        type: 'GET_ALL_DEPOSITS',
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
export const getAllBrands = () => {
  return async function (dispatch) {
    try {
      const response = await axios(`${backURL}/marcas`, axiosConfig);
      const data = response.data;
      return dispatch({
        type: 'GET_ALL_BRANDS',
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


export const cleanUserTypes = () => {
  return async function(dispatch){
    return dispatch({
      type: "CLEAN_USER_TYPES",
      payload: [],
    });
  }
};

export const cleanBrands = () => {
  return async function(dispatch){
    return dispatch({
      type: "CLEAN_BRANDS",
      payload: [],
    });
  }
};

export const cleanDeposits = () => {
  return async function(dispatch){
    return dispatch({
      type: "CLEAN_DEPOSITS",
      payload: [],
    });
  }
};

export const cleanAccountTypes = () => {
  return async function(dispatch){
    return dispatch({
      type: "CLEAN_ACCOUNT_TYPES",
      payload: [],
    });
  }
};

export const cleanAccount = () => {
  return async function(dispatch){
    return dispatch({
      type: "CLEAN_ACCOUNT",
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

export const getBrandId = (id) => {
  return {
    type: "GET_BRAND_ID",
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

export const showModalEditBrand = () => ({
  type: "SHOW_MODAL_EDIT_BRAND",
});
export const showModalEditMesure = () =>({
  type: "SHOW_MODAL_EDIT_MESURE",
});

export const showModalEditAccountType = () => ({
  type: "SHOW_MODAL_EDIT_ACCOUNT_TYPE",
});
export const showModalEditUserType = () => ({
  type: "SHOW_MODAL_EDIT_USER_TYPE",
});

export const showModalEditCategories = () => ({
  type: "SHOW_MODAL_EDIT_CATEGORIES",
});

export const hideModal = () => ({
  type: "HIDE_MODAL",
});

export const hideCreateModal = () => ({
  type: "HIDE_CREATE_MODAL",
});

export const hideModalEditUserType = () => ({
  type: "HIDE_MODAL_EDIT_USER_TYPE",
});

export const hideModalEditAccounType = () => ({
  type: "HIDE_MODAL_EDIT_ACCOUNT_TYPE",
});

export const hideModalEditCategories = () => ({
  type: "HIDE_MODAL_EDIT_CATEGORIES",
});

export const hideModalEditMesure = () => ({
  type: "HIDE_MODAL_EDIT_MESURE",
});
export const hideModalEditBrand = () => ({
  type: "HIDE_MODAL_EDIT_BRAND",
});

