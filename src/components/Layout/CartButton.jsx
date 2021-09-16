import styles from "./CartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import { useContext, useEffect, useState } from "react";
const CartButton = (props) => {
	const [btnHighlight, setBtnHighlight] = useState(false);
	const CartCtx = useContext(CartContext);
	const numItems = CartCtx.items.reduce((curr, item) => (curr + item.amount), 0);
	const buttonClass = `${styles.button} ${btnHighlight?styles.bump:''}`;
	useEffect(() => {
		if (CartCtx.items.length === 0) return;
		setBtnHighlight(true);
		const timer=setTimeout(() => {
			setBtnHighlight(false);
		}, 300)
		return () => {
			clearTimeout(timer);
		}
	},[CartCtx.items])
	return (
		<button className={buttonClass} onClick={props.onClick}>
			<span className={styles.icon}><CartIcon/></span>
			<span>YourCart</span>
			<span className={styles.badge}>{numItems}</span>
		</button>
	);
};
export default CartButton;
