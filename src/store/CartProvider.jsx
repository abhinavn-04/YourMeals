import { useReducer } from "react";
import CartContext from "./cart-context";
const initialState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD_ITEM') {
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
        return ({ items: updatedItems, totalAmount: newTotal });
    }
    if (action.type === 'REMOVE_ITEM') {
        const findItemIdx = state.items.findIndex(item => item.id === action.id);
        const existingItem = state.items[findItemIdx];
        console.log(existingItem);
        const newTotal = state.totalAmount - existingItem.price;
        let updatedItems;
        if (existingItem.amount===1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            let updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
            updatedItems = [...state.items];
            updatedItems[findItemIdx] = updatedItem;
        }
        return ({ items: updatedItems, totalAmount: newTotal });

    }
    return initialState;
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