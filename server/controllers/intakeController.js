import Intake from '../models/intakeModel.js';

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

const getIntakes = async (req, res) => {
    const userId = req.userId;
    try{
        const intakes = await Intake.find({ userId });
        if (!intakes) {
            return res.status(404).json({ message: 'No intakes found for this user' });
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
    const intakeId = req.intakeId;
    const userId = req.userId;

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

const totalIntakesByDate = async (req, res) => {
    const {userId, date} = req.body;
    if(!date){
        return res.status(400).json({message: "Date is missing"})
    }

    try{
        const startOfDate = new Date(`${date}T00:00:00`);
        const endOfDate = new Date(`${date}T23:59:59`);

        const intakesForDate = await Intake.find({
            userId: userId,
            date: {$gte: startOfDate, $lt:endOfDate},
        })

        if(!intakesForDate || intakesForDate.length === 0){
            return res.status(404).json({message: `No intake data found for ${date}`})
        }

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

const intakeController = {
    saveIntake,
    getIntakes,
    deleteIntake,
    totalIntakesByDate
}

export default intakeController