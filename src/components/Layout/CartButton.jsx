import styles from "./CartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import { useContext } from "react";
const CartButton = (props) => {
	const CartCtx = useContext(CartContext);
	const numItems = CartCtx.items.reduce((curr, item) => (curr + item.amount), 0);
	return (
		<button className={styles.button} onClick={props.onClick}>
			<span className={styles.icon}><CartIcon/></span>
			<span>YourCart</span>
			<span className={styles.badge}>{numItems}</span>
		</button>
	);
};
export default CartButton;
