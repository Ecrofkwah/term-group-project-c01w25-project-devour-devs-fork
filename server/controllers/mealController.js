import axios from 'axios'

const getMealByFirstLetter = async(req, res) => {
    const { letter } = req.query;
    try{
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)

        if(response.data.meals) {
            res.status(201).json({meals: response.data.meals})
        } else {
            res.status(201).json({message: `No meals found starting with letter ${letter}`})
        }
    } catch (error){
        res.status(500).json({message: "Internal Server Error"})
    }
}

const getMealDetails = async(req, res) => {
    const { id } = req.query;

    if(!id){
        return res.status(400).json({message: "Missing meal ID"})
    }

    try{
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        if(response.data.meals && response.data.meals[0]) {
            res.status(201).json({meal: response.data.meals[0]})
        } else {
            res.status(201).json({message: `No meal details available for meal with id ${id}`})
        }
    } catch (error){
        res.status(500).json({message: "Internal Server Error"})
    }
}

const mealController = {
    getMealByFirstLetter,
    getMealDetails
}

export default mealController;