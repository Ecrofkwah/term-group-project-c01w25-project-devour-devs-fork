import Meal from '../models/mealModel.js';
import Favourite from '../models/favouriteModel.js';
import MealRating from '../models/ratingModel.js';
import mealController from '../controllers/mealController.js';
import axios from 'axios';

jest.mock('axios');
jest.mock('../models/mealModel.js');
jest.mock('../models/favouriteModel.js');
jest.mock('../models/ratingModel.js');

const mockRequest = ({body = {}, query = {}, params = {}} = {}) => ({
    body,
    query,
    params,
    headers: {},
});
  
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn().mockReturnThis();
    return res;
};

beforeEach(async () => {
    await Meal.deleteMany({});
    jest.clearAllMocks();
});

afterEach(() => {
    jest.resetAllMocks();
})

describe('getMealDetails', () => {
    test('should return 400 if no meal ID is provided', async () => {
        // mock request with empty query
        const req = mockRequest({ query: {} });
        const res = mockResponse();

        await mealController.getMealDetails(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Missing meal ID" });
    });

    test('should return 201 with meal data if meal exists in the database', async () => {
        // mock request has meal ID in query
        const req = mockRequest({query: {id: '123'}});
        const res = mockResponse();

        // mock the database query to return the meal
        jest.spyOn(Meal, 'findOne').mockResolvedValue({ data: { id: '123', name: 'Pasta' } });

        await mealController.getMealDetails(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ meal: { id: '123', name: 'Pasta' } });
    });

    test('should return 500 if there is an error fetching meal details from Spoonacular', async () => {
        // mock request has meal ID in query
        const req = mockRequest({ query: { id: '123' } });
        const res = mockResponse();

        // mock axios call to return an error when calling spoonacular api
        axios.get = jest.fn().mockRejectedValue(new Error('error'));

        await mealController.getMealDetails(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
    });

    test('should return 201 and meal details if meal is fetched successfully from the Spoonacular API', async () => {
        const req = mockRequest({
            query: { id: '12345' },
        });
        const res = mockResponse();

        const mockApiResponse = {
            data: {
                id: '12345',
                title: 'test meal',
                image: 'https://test.com/image.jpg',
                instructions: 'test instructions',
            },
        };

        axios.get = jest.fn().mockResolvedValue(mockApiResponse);

        await mealController.getMealDetails(req, res);

        expect(axios.get).toHaveBeenCalledWith(
            `https://api.spoonacular.com/recipes/${req.query.id}/information`,
            { params: { apiKey: process.env.SPOONACULAR_API_KEY } }
        );

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ meal: mockApiResponse.data });
    });

    test('should return 201 and message when no meal details are found', async () => {
        const req = mockRequest({
            query: { id: '12345' },
        });
        const res = mockResponse();

        const mockApiResponse = { data: null };

        axios.get = jest.fn().mockResolvedValue(mockApiResponse);

        await mealController.getMealDetails(req, res);

        expect(axios.get).toHaveBeenCalledWith(
            `https://api.spoonacular.com/recipes/${req.query.id}/information`,
            { params: { apiKey: process.env.SPOONACULAR_API_KEY } }
        );

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: `No meal details available for meal with id ${req.query.id}`,
        });
    });
});

describe('addMealToFavourites', () => {
    test('should return 400 if no user ID and no meal ID is provided', async () => {
        const req = mockRequest({ body: {} });
        const res = mockResponse();

        await mealController.addMealToFavourites(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Missing user or meal ID" });
    });

    test('should return 400 if no user ID is provided', async () => {
        const req = mockRequest({ body: {mealId: '123'} });
        const res = mockResponse();

        await mealController.addMealToFavourites(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Missing user or meal ID" });
    });

    test('should return 400 if no meal ID is provided', async () => {
        const req = mockRequest({ body: {userId: 'user1'} });
        const res = mockResponse();

        await mealController.addMealToFavourites(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Missing user or meal ID" });
    });

    test('should return 400 if meal is already favourited', async () => {
        const req = mockRequest({ body: { userId: 'user1', mealId: '123'} });
        const res = mockResponse();

        // mock database query to return existing favourite
        jest.spyOn(Favourite, 'findOne').mockResolvedValueOnce({ userId: 'user1', mealId: '123' });
        await mealController.addMealToFavourites(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Meal already favourited" });
    });

    test('should add meal to favourites and return 201', async () => {
        const req = mockRequest({ body: { userId: 'user1', mealId: '123' } });
        const res = mockResponse();

        // mock the database query to return null for existing favourite
        jest.spyOn(Favourite, 'findOne').mockResolvedValueOnce(null);
        jest.spyOn(Favourite.prototype, 'save').mockResolvedValueOnce({});

        await mealController.addMealToFavourites(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: "Meal added to favourites" });
    });

    test('should return 500 if an error occurs while adding the meal', async () => {
        const req = mockRequest({ body: { userId: 'user1', mealId: '123' } });
        const res = mockResponse();

        // mock to throw an error
        jest.spyOn(Favourite, 'findOne').mockRejectedValueOnce(new Error('server error'));

        await mealController.addMealToFavourites(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
    });
});


describe('getFavouritedMeals', () => {
    test('should return 400 if no user ID provided', async () => {
        const req = mockRequest({ query: {} });
        const res = mockResponse();

        await mealController.getFavouritedMeals(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Missing user ID" });
    });

    test('should return 200 with meals data if favourites exist', async () => {
        const req = mockRequest({ query: { userId: 'user1' } });
        const res = mockResponse();

        const favouriteData = [
            {userId: 'user1', mealId: '123'},
            {userId: 'user1', mealId: '456'}
        ];
        const mealData = [
            {id: '123', data: { name: 'Meal 1' }},
            {id: '456', data: { name: 'Meal 2' }}
        ];

        jest.spyOn(Favourite, 'find').mockResolvedValueOnce(favouriteData);
        jest.spyOn(Meal, 'find').mockResolvedValueOnce(mealData);

        await mealController.getFavouritedMeals(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ meals: mealData.map(meal => meal.data) });
    });

    test('should return 500 if there is internal error', async () => {
        const req = mockRequest({ query: { userId: 'user1' } });
        const res = mockResponse();

        // mock to throw an error
        jest.spyOn(Favourite, 'find').mockRejectedValueOnce(new Error('server error'));

        await mealController.getFavouritedMeals(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
    });
});

describe('removeMealFromFavourites', () => {
    test('should return 400 if no user ID or meal ID provided', async () => {
        const req = mockRequest({ body: {} });
        const res = mockResponse();

        await mealController.removeMealFromFavourites(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Missing user or meal ID" });
    });

    test('should return 400 if no user ID provided', async () => {
        const req = mockRequest({ body: { mealId: '123' } });
        const res = mockResponse();

        await mealController.removeMealFromFavourites(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Missing user or meal ID" });
    });

    test('should return 400 if no meal ID provided', async () => {
        const req = mockRequest({ body: {userId: 'user1'} });
        const res = mockResponse();

        await mealController.removeMealFromFavourites(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Missing user or meal ID" });
    });

    test('should return 404 if the favourite is not found', async () => {
        const req = mockRequest({ body: {userId: 'user1', mealId: '123'} });
        const res = mockResponse();

        // mock Favourite.findOneAndDelete to return null
        jest.spyOn(Favourite, 'findOneAndDelete').mockResolvedValueOnce(null);

        await mealController.removeMealFromFavourites(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Favourite not found" });
    });

    test('should remove the meal from favourites and return 200', async () => {
        const req = mockRequest({ body: { userId: 'user1', mealId: '123' } });
        const res = mockResponse();

        // mock Favourite.findOneAndDelete to return the deleted favourite
        jest.spyOn(Favourite, 'findOneAndDelete').mockResolvedValueOnce({ userId: 'user1', mealId: '123' });

        await mealController.removeMealFromFavourites(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "Favourite removed successfully" });
    });

    test('should return 500 if an error occurs during deletion', async () => {
        const req = mockRequest({ body: { userId: 'user1', mealId: '123' } });
        const res = mockResponse();

        // mock to throw an error
        jest.spyOn(Favourite, 'findOneAndDelete').mockRejectedValueOnce(new Error('server error'));

        await mealController.removeMealFromFavourites(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
    });
});

describe('rateMeal', () => {
    test('should return 400 if no user ID or meal ID or rating point provided', async () => {
        const req = mockRequest({ body: {} });
        const res = mockResponse();

        await mealController.rateMeal(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Missing user or meal ID or rating point" });
    });

    test('should return 400 if no user ID provided', async () => {
        const req = mockRequest({ body: { mealId: '123', point: 5 } });
        const res = mockResponse();

        await mealController.rateMeal(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Missing user or meal ID or rating point" });
    });

    test('should return 400 if no meal ID provided', async () => {
        const req = mockRequest({ body: {userId: 'user1', point: 5} });
        const res = mockResponse();

        await mealController.rateMeal(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Missing user or meal ID or rating point" });
    });

    test('should return 400 if no rating point provided', async () => {
        const req = mockRequest({ body: {userId: 'user1', mealId: '123'} });
        const res = mockResponse();

        await mealController.rateMeal(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Missing user or meal ID or rating point" });
    });

    test('should update rating successfully and return 200', async () => {
        const req = mockRequest({ body: { userId: 'user1', mealId: '123', point: 5 } });
        const res = mockResponse();

        // mock the query to be a successful update
        jest.spyOn(MealRating, 'findOneAndUpdate').mockResolvedValueOnce({});

        await mealController.rateMeal(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "Rating updated successfully" });
    });

    test('should return 500 if an error occurs while updating rating', async () => {
        const req = mockRequest({ body: {userId: 'user1', mealId: '123', point: 5} });
        const res = mockResponse();

        // mock to throw an error
        jest.spyOn(MealRating, 'findOneAndUpdate').mockRejectedValueOnce(new Error('server error'));

        await mealController.rateMeal(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
    });
});

describe('getMealRate', () => {
    test('should return 400 if no meal ID provided', async () => {
        const req = mockRequest({ query: {} });
        const res = mockResponse();

        await mealController.getMealRate(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Missing meal ID" });
    });

    test('should return avgRating 0 and numRatings 0 if meal rating not found', async () => {
        const req = mockRequest({ query: { mealId: '123' } });
        const res = mockResponse();

        MealRating.findOne.mockResolvedValueOnce(null);

        await mealController.getMealRate(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ avgRating: 0, numRatings: 0 });
    });

    test('should return avgRating 0 and numRatings 0 if userRatings is empty', async () => {
        const req = mockRequest({ query: {mealId: '123'} });
        const res = mockResponse();

        MealRating.findOne.mockResolvedValueOnce({ userRatings: {} });

        await mealController.getMealRate(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ avgRating: 0, numRatings: 0 });
    });

    test('should return avgRating and numRatings if userRatings exists', async () => {
        const req = mockRequest({ query: {mealId: '123'} });
        const res = mockResponse();

        MealRating.findOne.mockResolvedValueOnce({
            userRatings: {'user1': 5, 'user2': 4, 'user3': 3}
        });

        await mealController.getMealRate(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ avgRating: 4, numRatings: 3 });
    });

    test('should return 500 if an error occurs while getting meal rating', async () => {
        const req = mockRequest({ query: {mealId: '123'} });
        const res = mockResponse();

        MealRating.findOne.mockRejectedValueOnce(new Error('server error'));

        await mealController.getMealRate(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
    });
});

describe('getUserRating', () => {
    test('should return 400 if no meal ID provided', async () => {
        const req = mockRequest({ query: {} });
        const res = mockResponse();

        await mealController.getUserRating(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Missing meal ID" });
    });

    test('should return rating 0 if meal rating is not found', async () => {
        const req = mockRequest({ query: { mealId: '123', userId: 'user1' } });
        const res = mockResponse();

        MealRating.findOne.mockResolvedValueOnce(null);

        await mealController.getUserRating(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ rating: 0 });
    });

    test('should return rating 0 if userRatings is null', async () => {
        const req = mockRequest({ query: { mealId: '123', userId: 'user1' } });
        const res = mockResponse();

        MealRating.findOne.mockResolvedValueOnce({});

        await mealController.getUserRating(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ rating: 0 });
    });

    test('should return the rating for the specific user if found', async () => {
        const req = mockRequest({ query: { mealId: '123', userId: 'user1' } });
        const res = mockResponse();

        MealRating.findOne.mockResolvedValueOnce({
            userRatings: { 'user1': 5, 'user2': 4, 'user3': 3 }
        });

        await mealController.getUserRating(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ rating: 5 });
    });

    test('should return 500 if an error occurs while getting meal rating', async () => {
        const req = mockRequest({ query: { mealId: '123', userId: 'user1' } });
        const res = mockResponse();

        MealRating.findOne.mockRejectedValueOnce(new Error('Database error'));

        await mealController.getUserRating(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
    });
});


describe('searchMeal', () => {
    test('should return 400 if search query is missing', async () => {
        const req = mockRequest({ query: {} });
        const res = mockResponse();

        await mealController.searchMeal(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Search query is missing" });
    });

    test('should return 201 with meals if search query matches', async () => {
        const req = mockRequest({ query: { query: 'pizza' } });
        const res = mockResponse();

        const mockMeals = [
            { data: { title: 'Pizza Margherita', extendedIngredients: [{ name: 'tomato' }], cuisines: ['Italian'] } },
            { data: { title: 'Pepperoni Pizza', extendedIngredients: [{ name: 'pepperoni' }], cuisines: ['Italian'] } }
        ];

        const findSpy = jest.spyOn(Meal, 'find').mockResolvedValue(mockMeals);

        await mealController.searchMeal(req, res);

        expect(findSpy).toHaveBeenCalledWith({
            $or: [
                { "data.title": { $regex: 'pizza', $options: "i" } },
                { "data.extendedIngredients.name": { $regex: 'pizza', $options: "i" } },
                { "data.cuisines": { $regex: 'pizza', $options: "i" } }
            ]
        });

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ meals: mockMeals.map(meal => meal.data) });
    });

    test('should return 500 if an error occurs while searching', async () => {
        const req = mockRequest({ query: { query: 'pizza' } });
        const res = mockResponse();

        jest.spyOn(Meal, 'find').mockRejectedValue(new Error('Server Error'));

        await mealController.searchMeal(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
    });
});


describe('recommendMealsByIngredients', () => {
    test('should return 400 if no ingredients provided', async () => {
        const req = mockRequest({ body: {} });
        const res = mockResponse();

        await mealController.recommendMealsByIngredients(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Require at least 1 ingredient" });
    });

    test('should return 400 if ingredients array is empty', async () => {
        const req = mockRequest({ body: { ingredients: [] } });
        const res = mockResponse();

        await mealController.recommendMealsByIngredients(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Require at least 1 ingredient" });
    });

    test('should return 201 and ranked meals when valid ingredients are provided', async () => {
        const req = mockRequest({ body: { ingredients: ['tomato', 'cheese'] } });
        const res = mockResponse();

        const mockMeals = [
            { data: { extendedIngredients: [{ name: 'tomato' }, { name: 'cheese' }] } },
            { data: { extendedIngredients: [{ name: 'tomato' }] } },
            { data: { extendedIngredients: [{ name: 'cheese' }] } }
        ];

        const findSpy = jest.spyOn(Meal, 'find').mockResolvedValue(mockMeals);

        await mealController.recommendMealsByIngredients(req, res);

        expect(findSpy).toHaveBeenCalledWith({
            "data.extendedIngredients.name": { $in: expect.arrayContaining([expect.any(RegExp)]) }
        });

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            topMeals: [
                { matchCount: 2, matchedIngredients: ['tomato', 'cheese'], missedIngredients: [], data: mockMeals[0].data },
                { matchCount: 1, matchedIngredients: ['tomato'], missedIngredients: ['cheese'], data: mockMeals[1].data },
                { matchCount: 1, matchedIngredients: ['cheese'], missedIngredients: ['tomato'], data: mockMeals[2].data }
            ]
        });
    });

    test('should return 500 if an error occurs during the meal search', async () => {
        const req = mockRequest({ body: { ingredients: ['tomato', 'cheese'] } });
        const res = mockResponse();

        jest.spyOn(Meal, 'find').mockRejectedValue(new Error('server error'));

        await mealController.recommendMealsByIngredients(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
    });
});


describe('getMeals', () => {
    test('should return 201 with meals from database if there are at least 50 meals', async () => {
        const req = mockRequest();
        const res = mockResponse();

        const mockMeals = Array.from({ length: 51 }, (_, i) => ({
            data: { id: i, title: `Meal ${i}` },
        }));

        Meal.find.mockResolvedValue(mockMeals);

        await mealController.getMeals(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ meals: mockMeals.map(meal => meal.data).slice(0, 49) });
    });

    test('should return 201 and fetch meals from API when fewer than 50 meals exist in the database', async () => {
        const req = mockRequest();
        const res = mockResponse();

        const mockExistingMeals = [{ id: 1, data: { title: 'Existing Meal' } }];
        const mockMealsFromAPI = [
            { id: 2, title: 'Meal 2' },
            { id: 3, title: 'Meal 3' },
        ];

        jest.spyOn(Meal, 'find').mockResolvedValueOnce(mockExistingMeals);
        jest.spyOn(Meal, 'insertMany').mockResolvedValueOnce(mockMealsFromAPI);
        jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: { recipes: mockMealsFromAPI } });

        await mealController.getMeals(req, res);

        expect(axios.get).toHaveBeenCalledWith(
            'https://api.spoonacular.com/recipes/random',
            expect.objectContaining({
                params: expect.objectContaining({
                    number: 50,
                    apiKey: expect.any(String),
                    includeNutrition: true,
                }),
            })
        );

        expect(Meal.insertMany).toHaveBeenCalledWith(
            mockMealsFromAPI.map(recipe => ({
                id: recipe.id,
                data: recipe,
            }))
        );

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ meals: mockMealsFromAPI });
    });

    test('should return 201 if meals exist in the database and no API call is made', async () => {
        const mockMeals = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            data: { title: `Meal ${i}` },
        }));

        jest.spyOn(Meal, 'find').mockResolvedValueOnce(mockMeals);

        const req = mockRequest();
        const res = mockResponse();

        await mealController.getMeals(req, res);

        expect(axios.get).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ meals: mockMeals.map(m => m.data).slice(0, 49) });
    });

    test('should return 201 if no meals are fetched from the API', async () => {
        const req = mockRequest();
        const res = mockResponse();

        jest.spyOn(Meal, 'find').mockResolvedValueOnce([]);
        jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: {} });

        await mealController.getMeals(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: "No meals to fetch" });
    });

    test('should return 500 if there is an error during the API request', async () => {
        const req = mockRequest();
        const res = mockResponse();

        jest.spyOn(Meal, 'find').mockResolvedValueOnce([]);
        jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('API error'));

        await mealController.getMeals(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
    });
});