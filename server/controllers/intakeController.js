import Intake from '../models/intakeModel.js';
import mongoose from 'mongoose';

const saveIntake = async (req, res) => {
    const {category, portion, calories, protein, carbs, fat, userId} = req.body;

    try{
        const newIntake = new Intake({
            category, portion, calories, protein, carbs, fat, userId,
        });

        await newIntake.save();
        return res.status(201).json({message: "Intake saved successfully", intake: newIntake, success: true})
    } catch(error) {
        res.status(500).json({message: "Error saving intake", error: error.message})
        console.log(error)
    }
}

// get a list of intakes info by date
const getIntakes = async (req, res) => {
    const userId = req.user.userId;
    const { date } = req.query;

    if(!date){
        return res.status(400).json({message: "Date is missing"})
    }
    
    try{
        console.log(date)
        const startOfDate = new Date(`${date}T00:00:00.000Z`);
        const endOfDate = new Date(`${date}T23:59:59.999Z`);

        const intakes = await Intake.find({
            userId: userId,
            date: {$gte: startOfDate, $lt:endOfDate},
        }).sort({ date: -1 }); // sort by newest

        if (!intakes) {
            return res.status(404).json({ message: 'Error finding intakes for this user' });
        }
        return res.status(201).json({intakes});
    } catch(error) {
        return res.status(500).json({
            message: "Error retrieving intakes",
            error: error.message
        })
    }
}

const deleteIntake = async (req, res) => {
    const {intakeId} = req.query;
    const userId = req.user.userId;

    try{
        const intake = await Intake.findOneAndDelete({_id: intakeId, userId: userId});
        if(!intake){
            return res.status(404).json({message: "Intake not found"});
        }

        return res.status(201).json({message: "Intake deleted successfully"});
    } catch(error){
        return res.status(500).json({message: "Error deleting intake", error: error.message});
    }
}


// get the summary of total intakes by date
const totalIntakesByDate = async (req, res) => {
    const {date} = req.query;
    const userId = req.user.userId;
    if(!date){
        return res.status(400).json({message: "Date is missing"})
    }

    try{
        const startOfDate = new Date(`${date}T00:00:00.000Z`);
        const endOfDate = new Date(`${date}T23:59:59.999Z`);

        const intakesForDate = await Intake.find({
            userId: userId,
            date: {$gte: startOfDate, $lt:endOfDate},
        })

        if(!intakesForDate){
            return res.status(404).json({message: `Error retriving intake data for ${date}`})
        }

        // if(intakesForDate.length === 0){
        //     return res.status(201).json({message: `No intake data found for ${date}`})
        // }

        const totalCalories = intakesForDate.reduce((total, intake) => total + intake.calories, 0);
        const totalProtein = intakesForDate.reduce((total, intake) => total + intake.protein, 0);
        const totalCarbs = intakesForDate.reduce((total, intake) => total + intake.carbs, 0);
        const totalFat = intakesForDate.reduce((total, intake) => total + intake.fat, 0);

        res.status(200).json({
            date,
            totalCalories,
            totalProtein,
            totalCarbs,
            totalFat,
          });
    } catch(error){
        return res.status(500).json({message: "error retriving intake data for given date", error: error.message})
    }
}

const lastNDaysIntake = async (req, res) => {
    const userId = req.user.userId;

    try {
        const today = new Date();
        const nDaysAgo = new Date();
        nDaysAgo.setDate(today.getDate() - 4); // last 5 days including today

        const intakesForLastNDays = await Intake.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId),
                    date: { $gte: nDaysAgo, $lte: today },
                },
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    totalCalories: { $sum: "$calories" },
                    totalProtein: { $sum: "$protein" },
                    totalCarbs: { $sum: "$carbs" },
                    totalFat: { $sum: "$fat" },
                },
            },
            { $sort: { _id: 1 } }, // sort by date (oldest to newest)
        ]);

        res.status(200).json({ intakes: intakesForLastNDays });
    } catch (error) {
        return res.status(500).json({
            message: "Error retrieving intake data for the last 5 days",
            error: error.message,
        });
    }
};

const intakeController = {
    saveIntake,
    getIntakes,
    deleteIntake,
    totalIntakesByDate,
    lastNDaysIntake
}

export default intakeController