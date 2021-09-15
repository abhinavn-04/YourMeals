import { Fragment } from "react/cjs/react.production.min";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from './store/CartProvider';

import { useState } from "react";
function App() {
	const [showCart, setShowCart] = useState(false);
	const clickCartHandler = () => {
		setShowCart(true);
	}
	const hideCartHandler = () => {
		setShowCart(false);
	}
	return (
		<CartProvider>
			{showCart && <Cart onClose={hideCartHandler}/>}
			<Header onClickCart={clickCartHandler} />
			<main>
				<Meals/>
			</main>
		</CartProvider>
	);
}

export default App;
