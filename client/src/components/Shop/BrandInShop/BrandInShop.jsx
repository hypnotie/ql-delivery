import styles from "./BrandInShop.module.css";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

const BrandInShop = (props) => {
	return (
		<NavLink className={({ isActive }) => isActive ? `${classNames(styles.brand, styles.active)}` : `${styles.brand}`} to={`/shop/${props.id}`}>
			<img src={props.logo} alt={props.name} />
			<div className={styles.title}>{props.name}</div>
		</NavLink>
	);
}

export default BrandInShop;