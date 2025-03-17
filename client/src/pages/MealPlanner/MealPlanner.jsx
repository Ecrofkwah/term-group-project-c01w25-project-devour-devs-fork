import React, { useState, useEffect } from 'react';

import axios from 'axios';

import config from '../../config/config';

import './MealPlanner.css';

import MealCard from '../../components/MealCard/MealCard';



function MealPlanner() {

    const [date, setDate] = useState(""); // Holds the selected date

    const [mealPlan, setMealPlan] = useState(null);

    const [mealOptions, setMealOptions] = useState([]); // Stores fetched meal options

    const [selectedBreakfast, setSelectedBreakfast] = useState("");

    const [selectedLunch, setSelectedLunch] = useState("");

    const [selectedDinner, setSelectedDinner] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    const [mealDetails, setMealDetails] = useState({}); // Stores fetched meal objects



    const token = localStorage.getItem("jwt");



    // Fetch meal options from `/api/planner/MPMeals`

    useEffect(() => {

        async function fetchMeals() {

            try {

                setLoading(true);

                const response = await axios.get(`${config.BASE_URL}/api/planner/MPMeals`, {

                    headers: { 'Authorization': `Bearer ${token}` }

                });



                if (response.data.meals && response.data.meals.length > 0) {

                    setMealOptions(response.data.meals);

                } else {

                    setMealOptions([]);

                }

            } catch (error) {

                setError("Failed to fetch meal options.");

            } finally {

                setLoading(false);

            }

        }

        fetchMeals();

    }, []);



    // Fetch meal plan for selected date

    const fetchMealPlan = async () => {

        try {

            if (!date) {

                setError("Please select a date.");

                return;

            }



            setLoading(true);

            setError(null);



            const response = await axios.get(`${config.BASE_URL}/api/planner`, {

                headers: { 'Authorization': `Bearer ${token}` },

                params: { date }

            });



            if (response.data.planner) {

                setMealPlan(response.data.planner);

                await fetchMealDetails(response.data.planner.meals);

            } else {

                setMealPlan(null);

                setMealDetails({});

                setError("Meal plan not found. You may need to create one.");

            }

        } catch (error) {

            setError("Meal plan not found. You may need to create one.");

            setMealPlan(null);

            setMealDetails({});

        } finally {

            setLoading(false);

        }

    };



    // Fetch full meal details and ensure UI updates

    const fetchMealDetails = async (meals) => {

        try {

            setLoading(true);

            let fetchedMeals = {

                breakfast: null,

                lunch: null,

                dinner: null

            };



            let mealIds = Object.entries(meals).filter(([mealType, id]) => id !== null);

            if (mealIds.length === 0) {

                setMealDetails({});

                return;

            }



            const response = await axios.get(`${config.BASE_URL}/api/meals/all`);



            if (response.data.meals) {

                mealIds.forEach(([mealType, mealId]) => {

                    const meal = response.data.meals.find(m => m.id === mealId);

                    if (meal) {

                        fetchedMeals[mealType] = meal;

                    }

                });

                setMealDetails(fetchedMeals);

            } else {

                setMealDetails({});

            }

        } catch (error) {

            setError("Failed to fetch meal details.");

            setMealDetails({});

        } finally {

            setLoading(false);

        }

    };



    // Create a new meal plan

    const createMealPlan = async () => {

        try {

            if (!date || !selectedBreakfast || !selectedLunch || !selectedDinner) {

                setError("Please select a date and all meals.");

                return;

            }



            setLoading(true);

            setError(null);



            const response = await axios.post(

                `${config.BASE_URL}/api/planner/create`,

                {

                    date,

                    breakfast: selectedBreakfast,

                    lunch: selectedLunch,

                    dinner: selectedDinner

                },

                {

                    headers: { 'Authorization': `Bearer ${token}` }

                }

            );



            alert("Meal Plan Created Successfully!");

            setMealPlan(response.data.planner);

            await fetchMealDetails(response.data.planner.meals);

        } catch (error) {

            setError("Failed to create meal plan.");

        } finally {

            setLoading(false);

        }

    };



    // Delete a meal plan & Reset UI

    const deleteMealPlan = async () => {

        if (!mealPlan || !mealPlan._id) {

            setError("No meal plan selected to delete.");

            return;

        }



        try {

            setLoading(true);

            await axios.delete(`${config.BASE_URL}/api/planner/delete/${mealPlan._id}`, {

                headers: { 'Authorization': `Bearer ${token}` }

            });



            alert("Meal Plan Deleted Successfully!");



            // Reset state properly after deletion

            setMealPlan(null);

            setMealDetails({});

            setSelectedBreakfast("");

            setSelectedLunch("");

            setSelectedDinner("");

        } catch (error) {

            console.error("Error deleting meal plan:", error);

            setError("Failed to delete meal plan.");

        } finally {

            setLoading(false);

        }

    };



    // Format date to display only YYYY-MM-DD

    const formatDate = (isoDate) => {

        return new Date(isoDate).toISOString().split("T")[0]; // Extract only `YYYY-MM-DD`

    };



    return (

        <div className="meal-planner-container">

            <h2>🍽️ Weekly Meal Planner</h2>



            <div className="date-input">

                <label>Select Date:</label>

                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

            </div>



            <div className="button-container">

                <button className="fetch-btn" onClick={fetchMealPlan}>Fetch Meal Plan</button>

                <button className="create-btn" onClick={createMealPlan}>Create Meal Plan</button>

                {mealPlan && <button className="delete-btn" onClick={deleteMealPlan}> Delete Meal Plan</button>}

            </div>



            {loading ? (

                <p className="loading-message">Loading meal options...</p>

            ) : mealPlan ? (

                <div className="meal-plan-display">

                    <h3>📅 Meal Plan for {formatDate(mealPlan.date)}</h3>



                    <div className="meal-card-container">

                        <h4>🍳 Breakfast</h4>

                        {mealDetails.breakfast ? <MealCard meal={mealDetails.breakfast} /> : <p>No meal selected</p>}



                        <h4>🥗 Lunch</h4>

                        {mealDetails.lunch ? <MealCard meal={mealDetails.lunch} /> : <p>No meal selected</p>}



                        <h4>🍽️ Dinner</h4>

                        {mealDetails.dinner ? <MealCard meal={mealDetails.dinner} /> : <p>No meal selected</p>}

                    </div>

                </div>

            ) : (

                <div className="meal-inputs">

                    <p>No meal plan found. Select meals to create one:</p>



                    <label>Breakfast:</label>

                    <select value={selectedBreakfast} onChange={(e) => setSelectedBreakfast(e.target.value)}>

                        <option value="">Select Breakfast</option>

                        {mealOptions.map(meal => (

                            <option key={meal.id} value={meal.id}>{meal.title}</option>

                        ))}

                    </select>



                    <label>Lunch:</label>

                    <select value={selectedLunch} onChange={(e) => setSelectedLunch(e.target.value)}>

                        <option value="">Select Lunch</option>

                        {mealOptions.map(meal => (

                            <option key={meal.id} value={meal.id}>{meal.title}</option>

                        ))}

                    </select>



                    <label>Dinner:</label>

                    <select value={selectedDinner} onChange={(e) => setSelectedDinner(e.target.value)}>

                        <option value="">Select Dinner</option>

                        {mealOptions.map(meal => (

                            <option key={meal.id} value={meal.id}>{meal.title}</option>

                        ))}

                    </select>

                </div>

            )}

        </div>

    );

}



export default MealPlanner;