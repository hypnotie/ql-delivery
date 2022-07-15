import { BrowserRouter, Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import { Provider } from "react-redux";
import store from "./redux/redux-store";
import Shop from "./components/Shop/Shop";

const QLDeliveryApp = () => {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<div>
					<Header />
					<div className={styles.container}>
						<Routes>
							<Route path="/"
								element={<Home />} />

							<Route path="/shop/:shopId"
								element={<Shop />} />

							<Route path="/cart"
								element={<Cart />} />
						</Routes>
					</div>
				</div>
			</Provider>
		</BrowserRouter>
	);
};

export default QLDeliveryApp;