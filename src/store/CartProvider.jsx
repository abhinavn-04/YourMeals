import { useReducer } from "react";
import CartContext from "./cart-context";
const initialState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if (action.type == 'ADD_ITEM') {
        const findItemIdx = state.items.findIndex(item => item.id === action.item.id);
        const existingItem = state.items[findItemIdx];
        let updatedItem;
        let updatedItems;
        if (existingItem) {
            updatedItem = { ...existingItem, amount: existingItem.amount + action.item.amount };
            updatedItems = [ ...state.items ];
            updatedItems[findItemIdx] = updatedItem;
        }
        else {
             updatedItems = state.items.concat(action.item);
        }
        const newTotal = state.totalAmount + action.item.price * action.item.amount;
        console.log(updatedItems);
        return ({ items: updatedItems, totalAmount: newTotal });
    }
}
const CartProvider = props => {
    const [cartState, dispatchCart] = useReducer(cartReducer, initialState);

    const addItemHandler = (item) => {
        dispatchCart({ type: 'ADD_ITEM', item: item });
    }
    const removeItemHandler = (id) => {
        dispatchCart({ type: 'REMOVE_ITEM', id: id });
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem:addItemHandler,
        removeItem:removeItemHandler
    }
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}
export default CartProvider;