import { clientes } from "../assets/dataHardcodeoClients";
import { suppliers } from "../assets/dataHardcodeoSuppliers";
import { roles } from "../assets/dataHardcodeoRoles";
import { transportistas } from "../assets/dataHardcodeoTransportistas";
import { deposito } from "../assets/dataHardcodeoDeposito";
import { medidas } from "../assets/dataHardcodeoMesures";
import { categorias } from "../assets/dataHardcodeoCategorias";
import { metodo_de_pago } from "../assets/dataHardcodeoPayType";
import { ventas } from "../assets/dataHardcodeoSale";
import { ofertas } from "../assets/dataHardcodeoOffers";
import { cuentas } from "../assets/dataHardcodeoCuentas";
import { tipoCuenta } from "../assets/dataHardcodeoAccountType";
import { compras } from "../assets/dataHardcodeoCompras";
import { persona } from '../assets/dataHardcodeoPersona';
import { ubicacion } from '../assets/dataHardcodeoUbicacion';
import { marca } from '../assets/dataHardcodeoMarca';

const initialState = {
  products: [],
  users: [],
  cart: [],
  orders: [],
  brands:marca,
  clients: clientes,
  suppliers: suppliers,
  dispatchers: transportistas,
  deposits: deposito,
  productById: '',
  personas: persona,
  roles: roles,
  mesures: medidas,
  categories: categorias,
  payTypes: metodo_de_pago,
  sales: ventas,
  offers: ofertas,
  accounts: cuentas,
  accountTypes: tipoCuenta,
  purchases: compras,
  ubicaciones: ubicacion,
  accountTypeId: "",
  accountId: "",
  clientId: "",
  rolId: "",
  supplierId: "",
  showModal: false,
  showCreateModal: false,
  showModalMesure: false,
  showModalAccount: false,
  showModalCategories: false,
  showModalAccountType: false,
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, payload],
      };
    case "NEW_TRANSFER":
      return {
        ...state,
        transfers: [...state.transfers, payload],
      };
    case "NEW_PURCHASE":
      return {
        ...state,
        purchases: [...state.purchases, payload],
      };
    case "NEW_SALE":
      return {
        ...state,
        sales: [...state.sales, payload],
      };
    case "CREATE_ACCOUNT_TYPE":
      return {
        ...state,
        accountTypes: [...state.accountTypes, payload],
      };
    case "CREATE_OFFER":
      return {
        ...state,
        offers: [...state.offers, payload],
      };
    case "CREATE_MESURE":
      return {
        ...state,
        mesures: [...state.mesures, payload],
      };
    case "CREATE_DISPATCHER":
      return {
        ...state,
        dispatchers: [...state.dispatchers, payload],
      };
    case "CREATE_DEPOSIT":
      return {
        ...state,
        deposits: [...state.deposits, payload],
      };
    case "CREATE_USER":
      return {
        ...state,
        users: [...state.users, payload],
      };
    case "CREATE_ROL":
      return {
        ...state,
        roles: [...state.roles, payload],
      };
    case "CREATE_CATEGORY":
      return {
        ...state,
        categories: [...state.categories, payload],
      };
    case "CREATE_CLIENT":
      return {
        ...state,
        clients: [...state.clients, payload],
      };
    case "CREATE_ACCOUNT":
      return {
        ...state,
        accounts: [...state.accounts, payload],
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
    case "GET_DEPOSIT_ID":
      return {
        ...state,
        depositId: payload,
      };
    case "GET_ACCOUNT_TYPE_ID":
      return {
        ...state,
        accountTypeId: payload,
      };
    case "GET_PRODUCT_ID":
      return {
        ...state,
        productId: payload,
      };
    case "GET_MESURE_ID":
      return {
        ...state,
        mesureId: payload,
      };
    case "GET_ACCOUNT_ID":
      return {
        ...state,
        accountId: payload,
      };
    case "GET_USER_ID":
      return {
        ...state,
        userId: payload,
      };
    case "GET_CATEGORY_ID":
      return {
        ...state,
        categoryId: payload,
      };
    case "GET_OFFER_ID":
      return {
        ...state,
        offerId: payload,
      };
    case "GET_CLIENT_ID":
      return {
        ...state,
        clientId: payload,
      };
    case "GET_ROL_ID":
      return {
        ...state,
        rolId: payload,
      };
    case "GET_DISPATCHER_ID":
      return {
        ...state,
        dispatcherId: payload,
      };
    case "GET_SUPPLIER_ID":
      return {
        ...state,
        supplierId: payload,
      };
    case "EDIT_ACCOUNT_TYPE":
      const updatedAccountType = payload;
      const updatedAccountTypes = state.accountTypes.map((accountType) => {
        if (accountType.id === updatedAccountType.id) {
          return updatedAccountType;
        }
        return accountType;
      });

      return {
        ...state,
        accountTypes: updatedAccountTypes,
      };
    case "EDIT_ACCOUNT":
      const updatedAccount = payload;
      const updatedAccounts = state.accounts.map((account) => {
        if (account.id === updatedAccount.id) {
          return updatedAccount;
        }
        return account;
      });
      return {
        ...state,
        accounts: updatedAccounts,
      };
    case "EDIT_OFFER":
      const updatedOffer = payload;
      const updatedOffers = state.offers.map((offer) => {
        if (offer.id === updatedOffer.id) {
          return updatedOffer;
        }
        return offer;
      });

      return {
        ...state,
        offers: updatedOffers,
      };
    case "EDIT_CATEGORY":
      const updatedCategory = payload;
      const updatedCategories = state.categories.map((category) => {
        if (category.id === updatedCategory.id) {
          return updatedCategory;
        }
        return category;
      });

      return {
        ...state,
        categories: updatedCategories,
      };
    case "EDIT_MESURE":
      const updatedMesure = payload;
      const updatedMesures = state.mesures.map((mesure) => {
        if (mesure.id === updatedMesure.id) {
          return updatedMesure;
        }
        return mesure;
      });

      return {
        ...state,
        mesures: updatedMesures,
      };
    case "EDIT_DEPOSIT":
      const updatedDeposit = payload;
      const updatedDeposits = state.deposits.map((deposit) => {
        if (deposit.id === updatedDeposit.id) {
          return updatedDeposit;
        }
        return deposit;
      });

      return {
        ...state,
        deposits: updatedDeposits,
      };
    case "EDIT_USER_ROL":
      const updatedUserRol = payload;
      const updatedUserRoles = state.roles.map((rol) => {
        if (rol.id === updatedUserRol.id) {
          return updatedUserRol;
        }
        return rol;
      });

      return {
        ...state,
        roles: updatedUserRoles,
      };
    case "EDIT_DISPATCHER":
      const updatedDispatcher = payload;
      const updatedDispatchers = state.dispatchers.map((dispatcher) => {
        if (dispatcher.id === updatedDispatcher.id) {
          return updatedDispatcher;
        }
        return dispatcher;
      });

      return {
        ...state,
        dispatchers: updatedDispatchers,
      };
    case "EDIT_CLIENT":
      const updatedClient = payload;
      const updatedClients = state.clients.map((client) => {
        if (client.id === updatedClient.id) {
          return updatedClient;
        }
        return client;
      });

      return {
        ...state,
        clients: updatedClients,
      };
    case "EDIT_USER":
      const updatedUser = payload;
      const updatedUsers = state.users.map((user) => {
        if (user.id === updatedUser.id) {
          return updatedUser;
        }
        return user;
      });

      return {
        ...state,
        users: updatedUsers,
      };
    case "EDIT_PRODUCT":
      const updatedProduct = payload;
      const updatedProducts = state.products.map((product) => {
        if (product.ID_PRODUCTO === updatedProduct.ID_PRODUCTO) {
          return updatedProduct;
        }
        return product;
      });
      return {
        ...state,
        products: updatedProducts,
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
    case "SHOW_MODAL":
      return {
        ...state,
        showModal: true,
      };
    case "SHOW_CREATE_MODAL":
      return {
        ...state,
        showCreateModal: true,
      };
    case "SHOW_MODAL_CATEGORIES":
      return {
        ...state,
        showModalCategories: true,
      };
    case "SHOW_MODAL_MESURE":
      return {
        ...state,
        showModalMesure: true,
      };
    case "SHOW_MODAL_ACCOUNT_TYPE":
      return {
        ...state,
        showModalAccountType: true,
      };
    case "HIDE_MODAL":
      return {
        ...state,
        showModal: false,
      };
    case "HIDE_CREATE_MODAL":
      return {
        ...state,
        showCreateModal: false,
      };
    case "HIDE_MODAL_CATEGORIES":
      return {
        ...state,
        showModalCategories: false,
      };
    case "HIDE_MODAL_MESURE":
      return {
        ...state,
        showModalMesure: false,
      };
    case "HIDE_MODAL_ACCOUNT_TYPE":
      return {
        ...state,
        showModalAccountType: false,
      };
    case 'GET_ALL_USERS':
      return {
        ...state,
        users: payload,
      };
    case 'CLEAN_PRODUCTS':
      return {
        ...state,
        products: payload,
      };
    case 'CLEAN_USERS':
      return {
        ...state,
        users: payload,
      };
    //   };
    case 'GET_PRODUCTS_BY_ID':
      return {
        ...state,
        productById: payload,
      };
    case 'GET_ALL_PRODUCTS':
      return {
        ...state,
        products: payload,
      };
    default:
      return { ...state };
  }
}
