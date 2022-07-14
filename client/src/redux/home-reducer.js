import { homeAPI } from "../api/api";

const SET_BRANDS = "ql-delivery/home/SET_BRANDS";
const SET_PRODUCTS = "ql-delivery/home/SET_PRODUCTS";
const TOGGLE_IS_FETCHING = "ql-delivery/home/TOGGLE_IS_FETCHING";

let initialState = {
	brands: [],
	products: [],
	isFetching: false
};

const homeReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_BRANDS:
			return {
				...state,
				brands: action.brands
			}
			case SET_PRODUCTS:
				return {
					...state,
					products: action.products
				}
			case TOGGLE_IS_FETCHING:
				return {
					...state,
					isFetching: action.isFetching
				}
		default:
			return state;
	}
};

export const setBrands = (brands) => ({ type: SET_BRANDS, brands });
export const setProducts = (products) => ({ type: SET_PRODUCTS, products });
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });

export const requestShops = () => async (dispatch) => {
	let response = await homeAPI.getBrands();
	dispatch(setBrands(response));
};

export const requestProducts = (shopId) => async (dispatch) => {
	dispatch(toggleIsFetching(true));
	let response = await homeAPI.getProducts(shopId);
	dispatch(toggleIsFetching(false));
	dispatch(setProducts(response));
};

export default homeReducer;