import styles from "./ProductInCart.module.css";
import deleteIcon from "../../../img/icons/delete.svg";

const ProductInCart = (props) => {
	const onRemoveFromCart = () => {
		props.removeProductFromCart(props.itemInfo.id);
	};

	const changeQuantity = (e) => {
		let currentQuantity = props.productsInCart.find(p => p.id === props.itemInfo.id).quantity;

		if (currentQuantity < parseInt(e.target.value)) {
			let product = {
				id: props.itemInfo.id,
				name: props.itemInfo.name,
				image: props.itemInfo.image,
				price: parseFloat(props.itemInfo.price),
				quantity: e.target.value
			};
			props.addProductToCart(product);
		} else {
			props.decreaseProductQuantity(props.itemInfo.id);
		}
	};

	const onKeyDown = (e) => {
		if (e.keyCode !== 38 && e.keyCode !== 40 && e.keyCode !== 116)
			e.preventDefault();
	};

	const overallProductPrice = Math.round(props.itemInfo.price * props.itemInfo.quantity * 100) / 100;

	return (
		<div className={styles.product}>
			<img className={styles.productImage} src={props.itemInfo.image} alt="Product" />
			<div className={styles.productDescription}>
				<div className={styles.productTop}>
					<h3 className={styles.productTitle}>{props.itemInfo.name}</h3>
					<button type="button" onClick={onRemoveFromCart}>
						<img className={styles.removeProductIcon} src={deleteIcon} alt="Delete Product" />
					</button>
				</div>
				<div className={styles.productBottom}>
					<input type="number" name="quantity" min="1" value={props.itemInfo.quantity} onKeyDown={onKeyDown} onChange={changeQuantity} />
					<div className={styles.productPrice}>${overallProductPrice}</div>
				</div>
			</div>
		</div>);
}

export default ProductInCart;