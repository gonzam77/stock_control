import { productos } from "../assets/dataHardcodeoProducts";
import { clientes } from "../assets/dataHardcodeoClients";
import { suppliers } from "../assets/dataHardcodeoSuppliers";
import { users } from "../assets/dataHardcodeoUsers";
import {
  GET_ALL_PRODUCTS,
  GET_ALL_CLIENTS,
  GET_ALL_SUPPLIERS,
  GET_ALL_SHIPPING,
  GET_ALL_ORDERS,
  GET_ALL_ACCOUNTS,
  GET_ALL_USERS,
} from "./actionTypes";


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
  supplierId: ""
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case "CREATE_CLIENT":
      return {
        ...state,
        clients: [...state.clients, payload],
      };
    case "CREATE_SUPPLIER":
      return {
        ...state,
        suppliers: [...state.suppliers, payload],
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
      const updatedSupplier = payload;
        const updatedSuppliers = state.suppliers.map((supplier) => {
          if (supplier.id === updatedSupplier.id) {
            return updatedSupplier;
          }
          return supplier;
        });
      
        return {
          ...state,
          suppliers: updatedSuppliers,
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
        const updatedProduct = payload;
        const updatedProducts = state.products.map((product) => {
          if (product.id === updatedProduct.id) {
            return updatedProduct;
          }
          return product;
        });
      
        return {
          ...state,
          products: updatedProducts,
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
