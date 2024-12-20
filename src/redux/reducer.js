import { transportistas } from "../assets/dataHardcodeoTransportistas";
import { ventas } from "../assets/dataHardcodeoSale";
import { compras } from "../assets/dataHardcodeoCompras";

const initialState = {
  user: null,
  products: [],
  users: [],
  cart: [],
  orders: [],
  suppliers: [],
  persons: [],
  clients: [],
  accounts: [],
  accountTypes: [],
  deposits: [],
  ubications: [],
  brands: [],
  userTypes: [],
  categories: [],
  mesures: [],
  offers: [],
  payTypes: [],
  dispatchers: transportistas,
  sales: ventas,
  purchases: compras,
  productById: null,
  accountTypeId: null,
  personId: null,
  brandId: null,
  ubicationId: null,
  accountId: null,
  clientId: null,
  rolId: null,
  supplierId: null,
  showModal: false,
  showCreateModal: false,
  showImportModal: false,
  showModalEditMesure: false,
  showModalEditUbication: false,
  showModalEditAccount: false,
  showModalEditCategories: false,
  showModalEditBrand: false,
  showModalEditUserType: false,
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        user: payload
      };
    case "GET_ALL_OFFERS":
      return {
        ...state,
        offers: payload
      };
    case "GET_ALL_CATEGORIES":
      return {
        ...state,
        categories: payload
      };
    case "GET_ALL_ACCOUNTS":
      return {
        ...state,
        accounts: payload
      };
    case 'GET_ALL_DEPOSITS':
      return {
        ...state,
        deposits: payload,
      };
    case 'GET_ALL_PAY_TYPES':
      return {
        ...state,
        payTypes: payload,
      };
    case 'GET_ALL_USER_TYPES':
      return {
        ...state,
        userTypes: payload,
      };
    case 'GET_ALL_USERS':
      return {
        ...state,
        users: payload,
      };
    case "GET_ALL_UBUCATIONS":
      return {
        ...state,
        ubications: payload
      };
    case "GET_ALL_BRANDS":
      return {
        ...state,
        brands: payload
      };
    case "GET_ALL_ACCOUNT_TYPES":
      return {
        ...state,
        accountTypes: payload
      }
    case "GET_ALL_PRODUCTS":
      const allProducts = payload.map(e => {
        e.PRODUCTO.STOCK = e.STOCK
        return e.PRODUCTO
      })
      return {
        ...state,
        products: allProducts,
      };
    case "GET_ALL_USERS":
      return {
        ...state,
        users: payload,

      };
    case "GET_ALL_CLIENTS":
      return {
        ...state,
        clients: payload,
      };
    case "GET_ALL_MESURES":
      return {
        ...state,
        mesures: payload,
      };
    case "GET_ALL_PERSONS":
      return {
        ...state,
        persons: payload,
      };
    case "GET_ALL_SUPPPLIERS":
      return {
        ...state,
        suppliers: payload,
      };
    case "GET_PRODUCT_BY_ID":
      return {
        ...state,
        productById: payload,
      };
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
    case "GET_UBICATION_ID":
      return {
        ...state,
        ubicationId: payload,
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
    case "GET_BRAND_ID":
      return {
        ...state,
        brandId: payload,
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
    case "GET_PERSON_ID":
      return {
        ...state,
        personId: payload,
      };
    case "GET_PAY_TYPE_ID":
      return {
        ...state,
        payTypeId: payload,
      };
    case "GET_SUPPLIER_ID":
      return {
        ...state,
        supplierId: payload,
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
    case "SHOW_IMPORT_MODAL":
      return {
        ...state,
        showImportModal: true,
      };
    case "SHOW_MODAL_EDIT_MESURE":
      return {
        ...state,
        showModalEditMesure: true,
      };
    case "SHOW_MODAL_EDIT_CATEGORIES":
      return {
        ...state,
        showModalEditCategories: true,
      };
    case "SHOW_MODAL_EDIT_ACCOUNT_TYPE":
      return {
        ...state,
        showModalEditAccountType: true,
      };
    case "SHOW_MODAL_EDIT_UBICATION":
      return {
        ...state,
        showModalEditUbication: true,
      };
    case "SHOW_MODAL_EDIT_BRAND":
      return {
        ...state,
        showModalEditBrand: true,
      };
    case "SHOW_MODAL_EDIT_PAY_TYPE":
      return {
        ...state,
        showModalEditPayType: true,
      };
    case "SHOW_MODAL_EDIT_USER_TYPE":
      return {
        ...state,
        showModalEditUserType: true,
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
    case "HIDE_IMPORT_MODAL":
      return {
        ...state,
        showImportModal: false,
      };
    case "HIDE_MODAL_EDIT_MESURE":
      return {
        ...state,
        showModalEditMesure: false,
      };
    case "HIDE_MODAL_EDIT_CATEGORIES":
      return {
        ...state,
        showModalEditCategories: false,
      };
    case "HIDE_MODAL_EDIT_ACCOUNT_TYPE":
      return {
        ...state,
        showModalEditAccountType: false,
      };

    case "HIDE_MODAL_EDIT_UBICATION":
      return {
        ...state,
        showModalEditUbication: false,
      };
    case "HIDE_MODAL_EDIT_BRAND":
      return {
        ...state,
        showModalEditBrand: false,
      };
    case "HIDE_MODAL_EDIT_PAY_TYPE":
      return {
        ...state,
        showModalEditPayType: false,
      };
    case "HIDE_MODAL_EDIT_USER_TYPE":
      return {
        ...state,
        showModalEditUserType: false,
      };
    case 'CLEAN_UBICATION':
      return {
        ...state,
        ubications: payload,
      };
    case 'CLEAN_MESURES':
      return {
        ...state,
        mesures: payload,
      };
    case 'CLEAN_USER_TYPES':
      return {
        ...state,
        userTypes: payload,
      };
    case 'CLEAN_DISPATCHER':
      return {
        ...state,
        dispatchers: payload,
      };
    case 'CLEAN_CATEGORIES':
      return {
        ...state,
        categories: payload,
      };
    case 'CLEAN_OFFERS':
      return {
        ...state,
        offers: payload,
      };
    case 'CLEAN_SUPPLIERS':
      return {
        ...state,
        suppliers: payload,
      };
    case 'CLEAN_BRANDS':
      return {
        ...state,
        brands: payload,
      };
    case 'CLEAN_DEPOSITS':
      return {
        ...state,
        deposits: payload,
      };
    case 'CLEAN_CLIENT':
      return {
        ...state,
        clients: payload,
      };
    case 'CLEAN_ACCOUNT_TYPES':
      return {
        ...state,
        accountTypes: payload,
      };
    case 'CLEAN_ACCOUNT':
      return {
        ...state,
        accounts: payload,
      };
    case 'CLEAN_PRODUCTS':
      return {
        ...state,
        products: payload,

      };
    case "CLEAN_CLIENTS":
      return {
        ...state,
        clients: payload,
      };
    case "CLEAN_PERSONS":
      return {
        ...state,
        persons: payload,
      };
    case "CLEAN_PAY_TYPES":
      return {
        ...state,
        payTypes: payload,
      };
    case "CLEAN_USERS":
      return {
        ...state,
        users: payload,
      };
    default:
      return { ...state };
  }
}
