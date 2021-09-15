import styles from "./MealItem.module.css";
import ItemForm from "./ItemForm";
import { useContext } from "react";
import CartContext from "../../store/cart-context";
const MealItem = props => {
    const price = `$${props.meal.price}`;
    const cartCtx = useContext(CartContext);
    const addToCartHandler = (totalAmount) => {
        cartCtx.addItem({
            id: props.meal.id,
            price: props.meal.price,
            name: props.meal.name,
            amount:totalAmount
        })
    }
	return (
		<li className={styles.meal}>
			<div>
                <h3>{props.meal.name}</h3>
                <div className={styles.description}>{props.meal.description}</div>
                <div className={styles.price}>{price}</div>
			</div>
            <div>
                <ItemForm onAddToCart={addToCartHandler} id={props.meal.id}/>
            </div>
		</li>
	);
};
export default MealItem;
