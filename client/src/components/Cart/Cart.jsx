import styles from "./Cart.module.css";
import { connect } from "react-redux";
import { updateOrder, removeProductFromCart, addProductToCart, decreaseProductQuantity, createOrder } from "../../redux/cart-reducer";
import ProductInCart from "./ProductInCart/ProductInCart";
import { useEffect, useState } from "react";

const Cart = (props) => {
	const [orderCompleted, setOrderCompleted] = useState(false);

	useEffect(() => {
		document.title = "Cart";
		setOrderCompleted(false);
	}, []);

	const changeHandler = (event) => {
		props.updateOrder({
			field: event.target.name,
			value: event.target.value
		});
	};

	const createOrder = () => {
		const orderData = {
			name: props.name,
			email: props.email,
			phone: props.phone,
			address: props.address,
			totalPrice: props.totalPrice,
			products: props.productsInCart
		};

		props.createOrder(orderData);
		setOrderCompleted(true);
	};

	let productsElements = props.productsInCart.map(p =>
		<ProductInCart
			key={p.id} itemInfo={p}
			productsInCart={props.productsInCart}
			removeProductFromCart={props.removeProductFromCart}
			addProductToCart={props.addProductToCart}
			decreaseProductQuantity={props.decreaseProductQuantity}
			changeHandler={changeHandler} />);

	return (
		<div>
			{props.productsInCart.length > 0
				? <>
					<h2 className={styles.formTitle}>order details</h2>
					<form className={styles.form}>
						<div className={styles.formLeft}>
							<div className={styles.products}>
								{productsElements}
							</div>
						</div>
						<div className={styles.formRight}>
							<input type="text" name="name" placeholder="your name" onChange={changeHandler} />
							<input type="email" name="email" placeholder="e-mail" onChange={changeHandler} />
							<input type="tel" name="phone" placeholder="phone number" onChange={changeHandler} />
							<input type="text" name="address" placeholder="address" onChange={changeHandler} />
							<div className={styles.totalPrice}>
								total price: ${props.totalPrice}
							</div>
							<div className={styles.line} />
							<div className={styles.formBottom}>
								<button type="button" onClick={createOrder}>submit</button>
							</div>
						</div>
					</form>
				</>
				: <>
					{orderCompleted
						? <div className={styles.thankYou}>thank you for tHe order!</div>
						: <div className={styles.emptyCart}>cart is empty</div>
					}
				</>
			}
		</div>
	);
}

const mapStateToProps = (state) => ({
	productsInCart: state.cartPage.productsInCart,
	name: state.cartPage.order.name,
	email: state.cartPage.order.email,
	phone: state.cartPage.order.phone,
	address: state.cartPage.order.address,
	totalPrice: state.cartPage.totalPrice
});

export default connect(mapStateToProps, {
	updateOrder, removeProductFromCart,
	addProductToCart, decreaseProductQuantity,
	createOrder
})(Cart);