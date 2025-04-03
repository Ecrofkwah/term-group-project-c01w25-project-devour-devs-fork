import request from 'supertest';
import app from '../index.js';
import Meal from '../models/mealModel.js';
import Favourite from '../models/favouriteModel.js';
import MealRating from '../models/ratingModel.js';
import mongoose from 'mongoose';
import mealController from '../controllers/mealController.js';
import axios from 'axios';

jest.mock('axios');

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
        Meal.findOne = jest.fn().mockResolvedValue({ data: { id: '123', name: 'Pasta' } });

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
});
