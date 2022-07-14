import styles from "./BrandInHome.module.css";
import { NavLink } from "react-router-dom";

const BrandInHome = (props) => {
	return (
		<NavLink className={styles.storeMain} to={`/shop/${props.id}`}>
			<img src={props.logo} alt={props.name} />
			<div className={styles.title}>{props.name}</div>
		</NavLink>
	);
}

export default BrandInHome;