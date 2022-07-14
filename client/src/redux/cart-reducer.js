import { cartAPI } from "../api/api";

const ADD_PRODUCT_TO_CART = "ql-delivery/cart/ADD_PRODUCT_TO_CART";
const DECREASE_PRODUCT_QUANTITY = "ql-delivery/cart/DECREASE_PRODUCT_QUANTITY";
const REMOVE_PRODUCT_FROM_CART = "ql-delivery/cart/REMOVE_PRODUCT_FROM_CART";
const UPDATE_ORDER = "ql-delivery/cart/UPDATE_ORDER";
const CLEAR_LOCAL_STORAGE = "ql-delivery/cart/CLEAR_LOCAL_STORAGE";

const calculateTotal = (products) => {
	let total = 0;
	for (let item of products) {
		total += item.price * item.quantity;
	}
	return Math.round(total * 100) / 100;
};

let initialState = {
	productsInCart: (() => {
		let cart = JSON.parse(localStorage.getItem("cart")) || [];
		return cart;
	})(),
	totalPrice: calculateTotal(JSON.parse(localStorage.getItem("cart")) || []),
	order: {
		name: "",
		email: "",
		phone: "",
		address: ""
	}
};

const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_PRODUCT_TO_CART:
			let updatedProductsInCart = [];
			let item = state.productsInCart.find((e) => (e.id === action.payload.id));
			if (item) {
				updatedProductsInCart = state.productsInCart.map(e => {
					if (e.id === item.id) {
						e.quantity += 1;
					}
					return e;
				});
			} else {
				updatedProductsInCart = [...state.productsInCart, action.payload];
			}
			localStorage.setItem("cart", JSON.stringify(updatedProductsInCart));

			return {
				...state,
				productsInCart: [...updatedProductsInCart],
				totalPrice: calculateTotal(updatedProductsInCart)
			}
		case REMOVE_PRODUCT_FROM_CART:
			let newCart = [...state.productsInCart].filter(product => product.id !== action.id);
			localStorage.setItem("cart", JSON.stringify(newCart));

			return {
				...state,
				productsInCart: [...newCart],
				totalPrice: calculateTotal(newCart)
			}
		case DECREASE_PRODUCT_QUANTITY:
			let cartAfterQuantityDecrease = [...state.productsInCart].map(product => {
				if (product.id === action.productId) {
					product.quantity -= 1;
				}
				return product;
			});

			localStorage.setItem("cart", JSON.stringify(cartAfterQuantityDecrease));

			return {
				...state,
				productsInCart: [...cartAfterQuantityDecrease],
				totalPrice: calculateTotal(cartAfterQuantityDecrease)
			}
		case UPDATE_ORDER:
			return {
				...state,
				order: {
					...state.order,
					[action.payload.field]: action.payload.value
				}
			}
		case CLEAR_LOCAL_STORAGE:
			localStorage.clear();
			let emptyCart = [];

			return {
				...state,
				productsInCart: [...emptyCart],
				totalPrice: 0
			}
		default:
			return state;
	}
};

export const addProductToCart = (payload) => ({
	type: ADD_PRODUCT_TO_CART,
	payload
});

export const decreaseProductQuantity = (productId) => ({
	type: DECREASE_PRODUCT_QUANTITY,
	productId
});

export const removeProductFromCart = (id) => ({
	type: REMOVE_PRODUCT_FROM_CART,
	id
});

export const updateOrder = (payload) => ({
	type: UPDATE_ORDER,
	payload
});

export const clearLocalStorage = () => ({
	type: CLEAR_LOCAL_STORAGE,
});

export const createOrder = (order) => async (dispatch) => {
	dispatch(clearLocalStorage());
	await cartAPI.createOrder(order);
};

export default cartReducer;