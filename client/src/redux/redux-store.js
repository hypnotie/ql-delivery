import { applyMiddleware, combineReducers, compose, legacy_createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import cartReducer from "./cart-reducer";
import homeReducer from "./home-reducer";

let reducers = combineReducers({
	homePage: homeReducer,
	cartPage: cartReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

window.__store__ = store;

export default store;