import { useRef, useState } from 'react';
import styles from './CheckoutForm.module.css'
const isEmpty = (value) => value.trim() === '';
const isValid = (code) => code.length === 6;
const CheckoutForm = props => {
    const [formValidation, setFormValidation] = useState({
        name: true,
        street: true,
        city: true,
        postalCode:true
    })
    const nameRef = useRef();
    const streetRef = useRef();
    const postalCodeRef = useRef();
    const cityRef = useRef();
	const submitHandler = event => {
        event.preventDefault();
        const name = nameRef.current.value;
        const street = streetRef.current.value;
        const postalCode = postalCodeRef.current.value;
        const city = cityRef.current.value;
        
        const nameIsValid = !isEmpty(name);
        const streetIsValid = !isEmpty(street);
        const cityIsValid = !isEmpty(city);
        const postalCodeIsValid = isValid(postalCode);
        
        setFormValidation({
            name: nameIsValid,
            street: streetIsValid,
            city: cityIsValid,
            postalCode:postalCodeIsValid
        })

        let formIsValid = false;
        if (nameIsValid && streetIsValid && cityIsValid && postalCodeIsValid) formIsValid = true;

        if (!formIsValid) return;

        props.onConfirm({ name, street, city, postalCode });


    };
    const nameClasses=`${styles.control} ${!formValidation.name?styles.invalid:''}`
    const streetClasses=`${styles.control} ${!formValidation.street?styles.invalid:''}`
    const cityClasses=`${styles.control} ${!formValidation.city?styles.invalid:''}`
    const postalCodeClasses=`${styles.control} ${!formValidation.postalCode?styles.invalid:''}`
	return (
		<form className={styles.form} onSubmit={submitHandler}>
			<div className={nameClasses}>
				<label htmlFor="name">Name</label>
				<input type="text" id="name" ref={nameRef} />
				{!formValidation.name && <p>Name is not valid</p>}
			</div>
			<div className={streetClasses}>
				<label htmlFor="street">Street</label>
				<input type="text" id="street" ref={streetRef} />
				{!formValidation.street && <p>Street is not valid</p>}
			</div>
			<div className={postalCodeClasses}>
				<label htmlFor="postal">Postal Code</label>
				<input type="text" id="postal" ref={postalCodeRef} />
				{!formValidation.postalCode && <p>Postal Code is not valid</p>}
			</div>
			<div className={cityClasses}>
				<label htmlFor="city">City</label>
				<input type="text" id="city" ref={cityRef} />
				{!formValidation.city && <p>City is not valid</p>}
			</div>
			<div className={styles.actions}>
				<button type="button" onClick={props.onCancel}>
					Cancel
				</button>
				<button className={styles.submit}>Confirm</button>
			</div>
		</form>
	);
};
export default CheckoutForm;
