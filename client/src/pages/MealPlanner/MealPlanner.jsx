import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config/config';
import './MealPlanner.css';
import MealCardMP from '../../components/MealCardMP/MealCardMP';

function MealPlanner() {
    const [date, setDate] = useState("");
    const [mealPlan, setMealPlan] = useState(null);
    const [mealOptions, setMealOptions] = useState([]);
    const [selectedBreakfast, setSelectedBreakfast] = useState("");
    const [selectedLunch, setSelectedLunch] = useState("");
    const [selectedDinner, setSelectedDinner] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [mealDetails, setMealDetails] = useState({});
    const token = localStorage.getItem("jwt");

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

    useEffect(() => {
        if (!mealPlan) {
            setSelectedBreakfast("");
            setSelectedLunch("");
            setSelectedDinner("");
            return;
        }
        setSelectedBreakfast(mealPlan.meals.breakfast);
        setSelectedLunch(mealPlan.meals.lunch);
        setSelectedDinner(mealPlan.meals.dinner);
    }, [mealPlan]);

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

    const fetchMealDetails = async (meals) => {
        try {
            setLoading(true);
            let fetchedMeals = { breakfast: null, lunch: null, dinner: null };

            const response = await axios.get(`${config.BASE_URL}/api/planner/MPMeals`);

            if (response.data.meals) {
                const allMeals = response.data.meals;

                ['breakfast', 'lunch', 'dinner'].forEach(mealType => {
                    const mealId = Number(meals[mealType]);
                    const match = allMeals.find(m => {
                        const flatId = m.id;
                        const nestedId = m.data?.id;
                        return Number(flatId) === mealId || Number(nestedId) === mealId;
                    });

                    if (match) {
                        const mealData = match.data?.id ? match.data : match;
                        fetchedMeals[mealType] = mealData;
                    } else {
                        console.warn(`No match found for ${mealType} ID:`, mealId);
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

    const randomizeMealPlan = async () => {
        if (mealPlan) return; // Prevent randomizing if a meal plan already exists

        try {
            if (!date) {
                setError("Please select a date to randomize meals.");
                return;
            }

            setLoading(true);
            setError(null);

            const getRandomMealId = (mealType) => {
                const filtered = mealOptions.filter(m => m.dishTypes?.some(dt => dt.toLowerCase().includes(mealType)));
                const picked = filtered[Math.floor(Math.random() * filtered.length)];
                return picked?.id || null;
            };

            const breakfast = getRandomMealId("breakfast");
            const lunch = getRandomMealId("lunch");
            const dinner = getRandomMealId("dinner");

            if (!breakfast || !lunch || !dinner) {
                setError("Could not find valid meals for all categories.");
                return;
            }

            const response = await axios.post(`${config.BASE_URL}/api/planner/create`, {
                date,
                breakfast,
                lunch,
                dinner
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            setMealPlan(response.data.planner);
            setSelectedBreakfast(breakfast);
            setSelectedLunch(lunch);
            setSelectedDinner(dinner);
            await fetchMealDetails({ breakfast, lunch, dinner });
            alert("Meals randomized and saved!");
        } catch (error) {
            setError("Failed to randomize meal plan.");
        } finally {
            setLoading(false);
        }
    };

    const updateMealPlan = async () => {
        if (!mealPlan || !mealPlan._id) {
            setError("No meal plan selected to update.");
            return;
        }

        try {
            setLoading(true);
            await axios.put(
                `${config.BASE_URL}/api/planner/update/${mealPlan._id}`,
                { breakfast: selectedBreakfast, lunch: selectedLunch, dinner: selectedDinner },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );

            alert("Meal Plan Updated Successfully!");
            fetchMealPlan();
        } catch (error) {
            setError("Failed to update meal plan.");
        } finally {
            setLoading(false);
        }
    };

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
            setMealPlan(null);
            setMealDetails({});
            setSelectedBreakfast("");
            setSelectedLunch("");
            setSelectedDinner("");
        } catch (error) {
            setError("Failed to delete meal plan.");
        } finally {
            setLoading(false);
        }
    };

    const generateGroceryList = async () => {
        if (!mealDetails.breakfast && !mealDetails.lunch && !meals.mealDetails.dinner) {
            setError("No Meal Details avalible to generate grocery list");
            return;
        }

        const sections = [];

        const formatIngredients = (meal, type) => {
            if (!meal) return "";
            const title = meal.title || "Untitled";
            const ingredients = meal.extendedIngredients?.map(ing => `- ${ing.original}`) || [];
            return `${type.charAt(0).toUpperCase() + type.slice(1)}: ${title}\n${ingredients.join("\n")}\n`;
        };

        sections.push(formatIngredients(mealDetails.breakfast, "breakfast"));
        sections.push(formatIngredients(mealDetails.lunch, "lunch"));
        sections.push(formatIngredients(mealDetails.dinner, "dinner"));

        const groceryText = `🛒 Grocery List for ${date}\n\n${sections.join("\n")}`;

        const blob = new Blob([groceryText], { type: 'text/plain;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Grocery_List_${date}.txt`;
        link.click();

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
                {!mealPlan && <button className="create-btn" onClick={createMealPlan}>Create Meal Plan</button>}
                {!mealPlan && <button className="randomize-btn" onClick={randomizeMealPlan}>Randomize Meals</button>}
                {mealPlan && <button className="update-btn" onClick={updateMealPlan}>Update Meal Plan</button>}
                {mealPlan && <button className="delete-btn" onClick={deleteMealPlan}>Delete Meal Plan</button>}
                {mealPlan && <button className="grocery-btn" onClick={generateGroceryList}>Export Grocery List</button>}
            </div>

            {loading ? (
                <p className="loading-message">Loading meal options...</p>
            ) : mealPlan ? (
                <div className="meal-plan-display">
                    <h3>📅 Meal Plan for {date}</h3>

                    {['breakfast', 'lunch', 'dinner'].map((mealType) => (
                        <div className="meal-category" key={mealType}>
                            <label>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}:</label>
                            <select
                                value={
                                    mealType === 'breakfast' ? selectedBreakfast :
                                        mealType === 'lunch' ? selectedLunch :
                                            selectedDinner
                                }
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (mealType === 'breakfast') setSelectedBreakfast(value);
                                    else if (mealType === 'lunch') setSelectedLunch(value);
                                    else setSelectedDinner(value);
                                }}
                            >
                                <option value="">Select {mealType.charAt(0).toUpperCase() + mealType.slice(1)}</option>
                                {mealOptions.map(meal => (
                                    <option key={meal.id} value={meal.id}>{meal.title}</option>
                                ))}
                            </select>

                            {mealDetails[mealType] && <MealCardMP meal={mealDetails[mealType]} />}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="meal-inputs">
                    <p>No meal plan found. Select meals to create one:</p>

                    {['breakfast', 'lunch', 'dinner'].map((mealType) => (
                        <div className="meal-category" key={mealType}>
                            <label>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}:</label>
                            <select
                                value={
                                    mealType === 'breakfast' ? selectedBreakfast :
                                        mealType === 'lunch' ? selectedLunch :
                                            selectedDinner
                                }
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (mealType === 'breakfast') setSelectedBreakfast(value);
                                    else if (mealType === 'lunch') setSelectedLunch(value);
                                    else setSelectedDinner(value);
                                }}
                            >
                                <option value="">Select {mealType.charAt(0).toUpperCase() + mealType.slice(1)}</option>
                                {mealOptions.map(meal => (
                                    <option key={meal.id} value={meal.id}>{meal.title}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MealPlanner;
