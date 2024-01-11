import {
  GET_ALL_PRODUCTS,
  GET_ALL_CLIENTS,
  GET_ALL_SUPPLIERS,
  GET_ALL_SHIPPING,
  GET_ALL_ORDERS,
  GET_ALL_ACCOUNTS,
  GET_ALL_USERS,
} from "./actionTypes";

import { productos } from "../assets/dataHardcodeoProducts";
import { clientes } from "../assets/dataHardcodeoClients";
import { suppliers } from "../assets/dataHardcodeoSuppliers";
import { users } from "../assets/dataHardcodeoUsers";

const initialState = {
  products: productos,
  clients: clientes,
  suppliers: suppliers,
  users: users,
  shipping: [],
  accounts: [],
  orders: [],
  showModal: false,
  showCreateModal: false,
  productId: "",
  clientId: "",
  userId: "",
  supplierId: "",
  selectedSupplier:''
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case "SELECTED_SUPPLIER":
      return {
        ...state,
        selectedSupplier: payload,
      };
    case "CREATE_PRODUCT":
      return {
        ...state,
        products: [...state.products, payload],
      };
    case "GET_SUPPLIER_ID":
      return {
        ...state,
        supplierId: payload,
      };
    case "EDIT_SUPPLIER":
      return {
        ...state,
        suppliers: payload,
      };
    case "GET_USER_ID":
      return {
        ...state,
        userId: payload,
      };
    case "GET_CLIENT_ID":
      return {
        ...state,
        clientId: payload,
      };
    case "EDIT_CLIENT":
      return {
        ...state,
        clients: payload,
      };
    case "GET_PRODUCT_ID":
      return {
        ...state,
        productId: payload,
      };
    case "EDIT_PRODUCT":
      return {
        ...state,
        products: payload,
      };
    case "SHOW_MODAL":
      return {
        ...state,
        showModal: true,
      };
    case "HIDE_MODAL":
      return {
        ...state,
        showModal: false,
        modalContent: null,
      };
    case "SHOW_CREATE_MODAL":
      return {
        ...state,
        showCreateModal: true,
      };
    case "HIDE_CREATE_MODAL":
      return {
        ...state,
        showCreateModal: false,
        modalContent: null,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        users: payload,
      };
    case GET_ALL_ACCOUNTS:
      return {
        ...state,
        accounts: payload,
      };
    case GET_ALL_CLIENTS:
      return {
        ...state,
        clients: payload,
      };
    case GET_ALL_ORDERS:
      return {
        ...state,
        orders: payload,
      };
    case GET_ALL_SHIPPING:
      return {
        ...state,
        shipping: payload,
      };
    case GET_ALL_SUPPLIERS:
      return {
        ...state,
        suppliers: payload,
      };
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: payload,
      };
    default:
      return { ...state };
  }
}
