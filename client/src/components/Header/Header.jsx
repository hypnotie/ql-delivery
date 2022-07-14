import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { connect } from "react-redux";

const Header = (props) => {
	return (
		<header className={styles.header}>
			<div className={styles.headerContainer}>
				<NavLink to="/">
					<h1>Ql Delivery</h1>
				</NavLink>
				<div className={styles.cartContainer}>
					<div className={styles.totalPrice}>${props.totalPrice}</div>
					<NavLink to="/cart" className={styles.cart}>
						cart
					</NavLink>
				</div>
			</div>
		</header>
	);
}

const mapStateToProps = (state) => ({
	totalPrice: state.cartPage.totalPrice
});

export default connect(mapStateToProps, {})(Header);