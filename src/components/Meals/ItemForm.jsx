import { useRef, useState } from 'react'
import Input from '../UI/Input';
import styles from './ItemForm.module.css';
const ItemForm = (props) => {
    const [amountValid, setAmountValid] = useState(true);
    const amountRef = useRef();
    const submitHandler = (event) => {
        event.preventDefault();
        const enteredAmount = amountRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setAmountValid(false);
            return;
        }
        props.onAddToCart(enteredAmountNumber);
    }
    return (
        <form action="" className={styles.form} onSubmit={submitHandler}>
            <Input ref={amountRef } label="Amount" input={{
                id: 'amount_'+props.id,
                type: 'number',
                min: '1',
                max: '5',
                defaultValue: '1',
                step:'1'
            }} />
            <button>+ Add</button>
            {!amountValid && <p>Please enter a valid amount.</p>}
        </form>
    )
}
export default ItemForm;