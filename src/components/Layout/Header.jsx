import { Fragment } from 'react'
import styles from './Header.module.css'
import CartButton from './CartButton';
import backgroundImg from '../../assets/background.jpg'
const Header = (props) => {

    return (
		<Fragment>
			<header className={`${styles.header} my-auto`}>
				<h1>YourMeals</h1>
				<CartButton onClick={props.onClickCart} />
			</header>
            <div className={styles["back-image"]}>
                <img src={backgroundImg} alt="" />
            </div>
		</Fragment>
	);
};
export default Header;