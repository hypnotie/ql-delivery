import styles from "./ProductInShop.module.css";
import Modal from "../../common/Modal/Modal";
import { useState } from "react";

const ProductInShop = (props) => {
	const [modalActive, setModalActive] = useState(false);

	const product = {
		id: props.itemInfo.id,
		shop_id: props.itemInfo.shop_id,
		name: props.itemInfo.name,
		image: props.itemInfo.image,
		price: parseFloat(props.itemInfo.price),
		quantity: 1
	};

	const onAddToCart = () => {
		let differentShop = props.productsInCart.find((p) => (p.shop_id !== props.itemInfo.shop_id));

		if (!differentShop) {
			props.addProductToCart(product);
		} else {
			setModalActive(true);
		}
	};

	const onAddFromOtherStore = () => {
		props.clearLocalStorage();
		setModalActive(false);
		props.addProductToCart(product);
	};

	return (
		<>
			<div className={styles.product}>
				<img src={props.itemInfo.image} alt={props.itemInfo.name} />
				<h3 className={styles.productTitle}>{props.itemInfo.name}</h3>
				<div className={styles.productBottom}>
					<div className={styles.productPrice}>${props.itemInfo.price}</div>
					<button className={styles.addToCart} onClick={onAddToCart}>add to cart</button>
				</div>
			</div>

			<Modal active={modalActive} setActive={setModalActive}>
				<div className={styles.modal}>
					<p className={styles.modalLabel}>If you add an item from another store, your shopping cart will be cleared. Proceed?</p>
					<div className={styles.modalButtons}>
						<button className={styles.buttonYes} onClick={onAddFromOtherStore}>
							Yes
						</button>
						<button className={styles.buttonCancel} onClick={() => setModalActive(false)}>
							Cancel
						</button>
					</div>
				</div>
			</Modal>
		</>
	);
}

export default ProductInShop;