import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem";
import { useEffect, useState } from "react";
// const DUMMY_MEALS = [
// 	{
// 		id: "m1",
// 		name: "Sushi",
// 		description: "Finest fish and veggies",
// 		price: 22.99,
// 	},
// 	{
// 		id: "m2",
// 		name: "Schnitzel",
// 		description: "A german specialty!",
// 		price: 16.5,
// 	},
// 	{
// 		id: "m3",
// 		name: "Barbecue Burger",
// 		description: "American, raw, meaty",
// 		price: 12.99,
// 	},
// 	{
// 		id: "m4",
// 		name: "Green Bowl",
// 		description: "Healthy...and green...",
// 		price: 18.99,
// 	},
// ];
const AvailableMeals = () => {
	const [meals, setMeals] = useState([]);
	useEffect(() => {
		const fetchMeals = async () => {
			const response = await fetch('https://fir-287a3-default-rtdb.firebaseio.com/meals.json');
			const data = await response.json();
			const loadMeals = [];
			for (let key in data) {
				loadMeals.push({
					id: key,
					name: data[key].name,
					price: data[key].price,
					description:data[key].description
				})
			}
			setMeals(loadMeals)

		}
		fetchMeals();
	},[])
	const dummyMeals = meals.map(meal => (
		<MealItem key={meal.id}S11dH11 meal={meal}/>
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
