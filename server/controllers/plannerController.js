import Planner from "../models/plannerModel.js";

// GET: Fetch meal plan for authenticated user
export const getMealPlan = async (req, res) => {
    try {

        const userId = req.user.userId;

        // Find the user's meal plan for the given week
        const mealPlan = await Planner.findOne({ userId })
            .populate('meals.Monday.breakfast meals.Monday.lunch meals.Monday.dinner')
            .populate('meals.Tuesday.breakfast meals.Tuesday.lunch meals.Tuesday.dinner')
            .populate('meals.Wednesday.breakfast meals.Wednesday.lunch meals.Wednesday.dinner')
            .populate('meals.Thursday.breakfast meals.Thursday.lunch meals.Thursday.dinner')
            .populate('meals.Friday.breakfast meals.Friday.lunch meals.Friday.dinner')
            .populate('meals.Saturday.breakfast meals.Saturday.lunch meals.Saturday.dinner')
            .populate('meals.Sunday.breakfast meals.Sunday.lunch meals.Sunday.dinner');

        if (!mealPlan) {
            return res.status(404).json({ message: "Meal plan not found. Please create one first." });
        }

        res.status(200).json(mealPlan);
    } catch (error) {
        res.status(500).json({ message: "Error fetching meal plan", error });
    }
};


// POST: Create a new meal plan for the authenticated user
const createMealPlan = async (req, res) => {
    try {
        const userId = req.user.userId;
        const {weekStartDate} = req.body;

        if (!userId || !weekStartDate) {
            return res.status(400).json({ message: "Missing userId or weekStartDate" });
        }

        // Check if the meal planner already exists
        const existingPlanner = await Planner.findOne({ userId, weekStartDate });

        if (existingPlanner) {
            return res.status(400).json({ message: "Meal planner for this week already exists." });
        }

        // Create an empty meal planner
        const newPlanner = new Planner({
            userId,
            weekStartDate,
            meals: {
                Monday: { breakfast: null, lunch: null, dinner: null },
                Tuesday: { breakfast: null, lunch: null, dinner: null },
                Wednesday: { breakfast: null, lunch: null, dinner: null },
                Thursday: { breakfast: null, lunch: null, dinner: null },
                Friday: { breakfast: null, lunch: null, dinner: null },
                Saturday: { breakfast: null, lunch: null, dinner: null },
                Sunday: { breakfast: null, lunch: null, dinner: null }
            }
        });

        await newPlanner.save();
        res.status(201).json({ message: "Meal planner created successfully", mealPlan: newPlanner });
    } catch (error) {
        res.status(500).json({ message: "Error creating meal planner", error });
    }
};

const plannerController = {
    getMealPlan,
    createMealPlan
}

export default plannerController;
