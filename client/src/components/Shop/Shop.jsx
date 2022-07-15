import styles from "./Shop.module.css";
import { useEffect } from "react";
import { connect } from "react-redux";
import { requestShops, requestProducts } from "../../redux/home-reducer";
import { addProductToCart, clearLocalStorage } from "../../redux/cart-reducer";
import { useParams } from "react-router-dom";
import BrandInShop from "./BrandInShop/BrandInShop";
import ProductInShop from "./ProductInShop/ProductInShop";

const Shop = (props) => {
	const { shopId } = useParams();

	useEffect(() => {
		props.requestShops();
		props.requestProducts(shopId);
	}, [shopId]); // eslint-disable-line react-hooks/exhaustive-deps

	let brandsElements = props.brands.map(b => <BrandInShop key={b.id} id={b.id} name={b.name} logo={b.logo} />);
	let productsElements = props.products.map(p =>
		<ProductInShop key={p.id} itemInfo={p}
			clearLocalStorage={props.clearLocalStorage}
			addProductToCart={props.addProductToCart}
			productsInCart={props.productsInCart}
		/>);

	return (
		<div>
			<h2 className={styles.title}>shops</h2>
			<div className={styles.shop}>
				<div className={styles.brandsPanel}>
					{brandsElements}
				</div>
				<div className={styles.products}>
					{props.isFetching ? "" : productsElements}
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	brands: state.homePage.brands,
	products: state.homePage.products,
	productsInCart: state.cartPage.productsInCart,
	isFetching: state.homePage.isFetching
});

export default connect(mapStateToProps, { requestShops, requestProducts, addProductToCart, clearLocalStorage })(Shop);