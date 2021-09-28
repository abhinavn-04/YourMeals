import styles from "./Cart.module.css";
import Modal from "./Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import CheckoutForm from "./CheckoutForm";
import { useContext, useState } from "react";
const Cart = props => {
	const [showCheckoutForm, setShowCheckoutForm] = useState(false);
	const cartCtx = useContext(CartContext);
	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

	const hasItems = cartCtx.items.length > 0;

	const addItemHandler = item => {
		cartCtx.addItem({ ...item, amount: 1 });
	};
	const removeItemHandler = id => {
		cartCtx.removeItem(id);
	};
	const orderHandler = () => {
		setShowCheckoutForm(true);
	};
	const confirmHandler = (userData) => {
		fetch("https://fir-287a3-default-rtdb.firebaseio.com/orders.json", {
			method: 'POST',
			body: JSON.stringify({
				user: userData,
				orderedItems: cartCtx.items
			})
		});	
	};
	const cartItems = (
		<ul className={styles["cart-items"]}>
			{cartCtx.items.map(item => (
				<CartItem
					key={item.id}
					name={item.name}
					price={item.price}
					amount={item.amount}
					onRemove={removeItemHandler.bind(null, item.id)}
					onAdd={addItemHandler.bind(null, item)}
				/>
			))}
		</ul>
	);
	const buttonAction = (
		<div className={styles.actions}>
			<button className={styles["button--alt"]} onClick={props.onClose}>
				Close
			</button>
			{hasItems && (
				<button className={styles.button} onClick={orderHandler}>
					Order
				</button>
			)}
		</div>
	);

	return (
		<Modal onClose={props.onClose}>
			{cartItems}
			<div className={styles.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{showCheckoutForm && <CheckoutForm onCancel={props.onClose} onConfirm={confirmHandler} />}
			{!showCheckoutForm && buttonAction}
		</Modal>
	);
};
export default Cart;
