const initialState = {
  products: [],
  allProducts: [],
  detail: {},
  cart: [],
  user: [],
  users: [],
  order: {},
  orders: [],
  reviews: [],
  category: [],
  brand: [],
  loading: false,
  error: null,
  success: false,
  message: null,
  token: null,
  logged: false,
  admin: false,
  search: "",
  fil:[],
  fol:[],
  filterCat: "",
  filterBra: "",
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    // case to get all products
    case "GET_PRODUCTS":
      let productsFilter = action.payload.filter(ele=>ele.deleted===false)
      const marcas = productsFilter
        .map((e) => e.brand)
        .sort(function (a, b) {
          if (a < b) return -1;
          else return 1;
        });
      const uniqueBrands = [...new Set(marcas)];
      return {
        ...state,
        products: productsFilter,
        allProducts: productsFilter,
        brand: uniqueBrands,
      };
    // case to create a new product
    case "POST_PRODUCT":
      return {
        ...state,
      };
    // case to modify a product
    case "PUT_PRODUCT":
      return {
        ...state,
      };
    // case to delete a product
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: action.payload,
      };
    case "GET_CATEGORIES":
      return {
        ...state,
        category: action.payload,
      };
    case "FILTER_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "ORDER_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
    case "ADD_PRODUCT":
      return {
        ...state,
        products: state.products.concat(action.payload),
      };
    case "REMOVE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
      };
    case "GET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "GET_NAME_PRODUCT":
      return {
        ...state,
        products: action.payload,
      };
    case "PUT_USER":
      return {
        ...state,
      };
    case "FILTER_CATEGORY":
      let filtrados = []
      state.filterCat= action.payload
      if(state.filterBra!==0 && state.fol.length!==0){
        filtrados = state.fol.filter((e) =>
          e.categories.includes(action.payload)
        );
          return {
          ...state,
          products: filtrados,
          fil:filtrados
        };
      }else if(state.filterCat.length!== 0 && state.filterBra.length===0){
        filtrados = state.allProducts.filter((e) =>
          e.categories.includes(action.payload)
        );
          return {
          ...state,
          products: filtrados,
          fil:filtrados
        };
      }else if (action.payload === "Category") {
        return {
          ...state,
          products: state.products,
          fil:filtrados
        };
      } else {
        
       filtrados = state.products.filter((e) =>
          e.categories.includes(action.payload)
        );

        return {
          ...state,
          products: filtrados,
          fil:filtrados
        };
      }
    case "FILTER_BRAND":
      let filtrado= []
      state.filterBra = action.payload
      state.fol= state.allProducts.filter(
        (e) => e.brand === action.payload
      );
      if(state.filterBra.length!==0 && state.filterBra !== "Brand"){
        if(state.fil.length==0){
          filtrado = state.allProducts.filter(
            (e) => e.brand === action.payload
          );
        }else{
          filtrado = state.fil.filter(
            (e) => e.brand === action.payload
          );
        }
          return {
            ...state,
            products: filtrado,
          
          }
      }else if (action.payload === "Brand") {
        return {
          ...state,
          products: state.products,
 
        };
      } else {
        filtrado = state.products.filter(
          (e) => e.brand === action.payload
        );
        return {
          ...state,
          products: filtrado,
  
        };
      }
    // case register
    case "SIGN_UP":
      return {
        ...state,
      };
    // case login
    case "SIGN_IN":
      const userEmail = state.users.find(
        (u) => u.email === action.payload.email
      );
      if (!userEmail) {
        return {
          ...state,
          user: [],
          logged: false,
        };
      } else {
        return {
          ...state,
          user: action.payload,
          cart: action.payload.cart,
          logged: true,
        };
      }
    // case logout
    case "LOG_OUT":
      return {
        ...state,
        user: [],
        cart:[],
        logged: false,
      };
    case "SEARCH_BAR":
      let busqueda = state.allProducts.filter((e) =>
        e.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        products: busqueda,
      };
    case "CLEAN_FILTER":
      return {
        ...state,
        products: state.allProducts,
      };
    case "FILTER_PRICE":
      console.log(action.payload)
      let sorted = state.products;
      if (action.payload === "Price") {
        return {
          ...state,
          products: sorted,
        };
      }
      if (action.payload === "Menor") {
        sorted.sort(function (a, b) {
          return a.price - b.price;
        });
      }
      if (action.payload === "Mayor") {
        sorted.sort(function (a, b) {
          return b.price - a.price;
        });
      }
      return {
        ...state,
        products: sorted,
      };
    // }
    case "PUT_RATING":
      return {
        ...state,
      };
    default:
      return state;
  }
}
