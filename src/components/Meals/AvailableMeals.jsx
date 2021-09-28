import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem";
import { useEffect, useState } from "react";
const AvailableMeals = () => {
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setError] = useState('');
	useEffect(() => {
		const fetchMeals = async () => {
			const response = await fetch('https://fir-287a3-default-rtdb.firebaseio.com/meals.json');
			if (!response.ok) {
				throw new Error("Some error...Can't Fetch Data!!");
			}
			const data = await response.json();
			const loadMeals = [];
			for (let key in data) {
				loadMeals.push({
					id: key,
					name: data[key].name,
					price: data[key].price,
					description: data[key].description
				})
			}
			setMeals(loadMeals)
			setIsLoading(false);
		}
		fetchMeals()
			.catch(error => {
				setError(error.message)
				setIsLoading(false);
			});
	}, []);
	if (isLoading) {
		return (
			<section className={styles.loading}>
				<p>Meals are Loading...</p>
			</section>
		)
	}
	if (hasError) {
		return (
			<section className={styles.error}>
				<p>{hasError}</p>
			</section>
		)
	}
	const dummyMeals = meals.map(meal => (
		<MealItem key={meal.id} meal={meal}/>
	));
	return (
		<section className={styles.meals}>
			<Card>
				<ul>{dummyMeals}</ul>
			</Card>
		</section>
	);
};
export default AvailableMeals;
