import styles from "./Home.module.css";
import BrandInHome from "./BrandInHome/BrandInHome";
import { connect } from "react-redux";
import { requestShops } from "../../redux/home-reducer";
import { useEffect } from "react";

const Home = (props) => {
	useEffect(() => {
		document.title = "QL Delivery";
		props.requestShops();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	let brandsElements = props.brands.map(b => <BrandInHome key={b.id} id={b.id} name={b.name} logo={b.logo} />);

	return (
		<div className={styles.shop}>
			<h2 className={styles.storesTitle}>choose a shop</h2>
			<div className={styles.shops}>
				{brandsElements}
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	brands: state.homePage.brands
});

export default connect(mapStateToProps, { requestShops })(Home);