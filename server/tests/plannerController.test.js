import Meal from "../models/mealModel";
import Planner from "../models/plannerModel";
import axios from 'axios';
import plannerController from "../controllers/plannerController";

jest.mock('axios');
jest.mock('../models/mealModel.js');
jest.mock('../models/plannerModel');

const mockRequest = ({body = {}, query = {}, params = {}, user={}} = {}) => ({
    body,
    query,
    params,
    headers: {},
    user,
});
  
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn().mockReturnThis();
    return res;
};

beforeEach(async () => {
    await Planner.deleteMany({});
    jest.clearAllMocks();
});

afterEach(() => {
    jest.resetAllMocks();
})

describe("getMealsMP", () => {
    test("should return 201 with meals from the database if at least 50 meals exist", async () => {
        const req = mockRequest();
        const res = mockResponse();

        // mock query to return 50  meals
        Meal.find.mockResolvedValue(Array.from({ length: 50 }, (_, index) => ({
                data: { id: index + 1, name: `Meal ${index + 1}` }
            })));

        await plannerController.getMealsMP(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ meals: expect.any(Array) });
    });

    test("should return 201 and fetch meals from Spoonacular API when not enough meals in DB", async () => {
        const req = mockRequest();
        const res = mockResponse();

        // mock to return no meals
        Meal.find.mockResolvedValue([]);

        // mock axios response
        axios.get.mockResolvedValue({
            data: { recipes: [{ id: 1, title: "Pasta" }, { id: 2, title: "Pizza" }] },
        });

        await plannerController.getMealsMP(req, res);

        expect(Meal.insertMany).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ meals: expect.any(Array) });
    });

    test('should return 201 and message if no meals are available in the response', async () => {
        const req = mockRequest();
        const res = mockResponse();

        Meal.find = jest.fn().mockResolvedValue([]);

        const response = {
            data: {}, // no recipes
        };

        axios.get = jest.fn().mockResolvedValue(response);

        await plannerController.getMealsMP(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: "No meals to fetch" });
    });

    test("should return 500 on API failure", async () => {
        const req = mockRequest();
        const res = mockResponse();

        // mock query to return no meals
        Meal.find.mockResolvedValue([]);

        // mock axios return with error
        axios.get.mockRejectedValue(new Error("API error"));

        await plannerController.getMealsMP(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
    });
});


describe("getMealPlan", () => {
    test("should return 400 if userId is missing", async () => {
        // no user id
        const req = mockRequest({ query: { date: "2025-04-03" } });
        const res = mockResponse();

        await plannerController.getMealPlan(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Missing userId" });
    });

    test("should return 404 if no meal plan is found", async () => {
        const req = mockRequest({ query: { date: "2025-04-03" }, user: { userId: "12345" } });
        const res = mockResponse();

        //  mock to return no meal plans
        Planner.findOne.mockResolvedValue(null);

        await plannerController.getMealPlan(req, res);

        expect(Planner.findOne).toHaveBeenCalledWith({ userId: "12345", date: "2025-04-03" });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Meal Plan not found" });
    });

    test("should return 200 and the meal plan if found", async () => {
        const req = mockRequest({ query: { date: "2025-04-03" }, user: { userId: "12345" } });
        const res = mockResponse();

        // mock to return a plan
        const mockPlanner = { _id: "plan123", userId: "12345", date: "2025-04-03", meals: {} };
        Planner.findOne.mockResolvedValue(mockPlanner);

        await plannerController.getMealPlan(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ planner: mockPlanner });
    });

    test("should return 500 if an error occurs", async () => {
        const req = mockRequest({ query: { date: "2025-04-03" }, user: { userId: "12345" } });
        const res = mockResponse();

        Planner.findOne.mockRejectedValue(new Error("server error"));

        await plannerController.getMealPlan(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "Internal Server Error",
            error: "server error",
        });
    });
});


describe('createMealPlan', () => {
    test('should return 201 and create a new meal plan when valid data is provided', async () => {
        const req = mockRequest({
            user: { userId: '12345' },
            body: {
                date: '2025-04-03',
                breakfast: 'Pancakes',
                lunch: 'Burger',
                dinner: 'Pizza',
            },
        });
        const res = mockResponse();
    
        const mockPlannerData = {
            userId: '12345',
            date: '2025-04-03',
            meals: { breakfast: 'Pancakes', lunch: 'Burger', dinner: 'Pizza' },
        };
    
        const mockSave = jest.fn().mockResolvedValue(mockPlannerData);
    
        Planner.mockImplementationOnce(() => {
            return {...mockPlannerData, save: mockSave};
        });
    
        await plannerController.createMealPlan(req, res);
    
        expect(Planner).toHaveBeenCalledTimes(1);
        expect(mockSave).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(201);
    
        const responseData = {
            message: 'Meal planner successfully created',
            planner: {
                userId: '12345',
                date: '2025-04-03',
                meals: { breakfast: 'Pancakes', lunch: 'Burger', dinner: 'Pizza' },
                save: mockSave
            },
        };
        
        expect(res.json).toHaveBeenCalledWith(responseData);
    });
    
    test('should return 400 if breakfast is missing', async () => {
        const req = mockRequest({
            user: { userId: '12345' },
            body: {
                date: '2025-04-03',
                lunch: 'Burger', dinner: 'Pizza'
            },
        });
        const res = mockResponse();

        await plannerController.createMealPlan(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'All meals required',
        });
    });

    test('should return 400 if lunch is missing', async () => {
        const req = mockRequest({
            user: { userId: '12345' },
            body: {
                date: '2025-04-03',
                breakfast: 'Pancakes', dinner: 'Pizza' 
            },
        });
        const res = mockResponse();

        await plannerController.createMealPlan(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'All meals required',
        });
    });

    test('should return 400 if dinner is missing', async () => {
        const req = mockRequest({
            user: { userId: '12345' },
            body: {
                date: '2025-04-03',
                breakfast: 'Pancakes', lunch: 'Burger'
            },
        });
        const res = mockResponse();

        await plannerController.createMealPlan(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'All meals required',
        });
    });

    test('should return 500 if an error occurs while creating a meal plan', async () => {
        const req = mockRequest({
            user: { userId: '12345' },
            body: {
                date: '2025-04-03',
                breakfast: 'Pancakes',
                lunch: 'Burger',
                dinner: 'Pizza',
            },
        });
        const res = mockResponse();

        Planner.prototype.save = jest.fn().mockRejectedValue(new Error('server error'));

        await plannerController.createMealPlan(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
    });
});


describe('updateMealPlan', () => {
    test('should update meal plan successfully if the user is authorized', async () => {
        const req = mockRequest({
            user: { userId: '12345' },
            body: {
                breakfast: 'Waffles',
                lunch: 'Pasta',
                dinner: 'Salad',
            },
            params: { plannerId: '1234567890' },
        });
        const res = mockResponse();

        const mockSave = jest.fn().mockResolvedValue({
            _id: '1234567890',
            userId: '12345',
            meals: {
                breakfast: 'Waffles',
                lunch: 'Pasta',
                dinner: 'Salad',
            },
        });

        const mockPlanner = {
            _id: '1234567890',
            userId: '12345',
            meals: {
                breakfast: 'Pancakes',
                lunch: 'Burger',
                dinner: 'Pizza',
            },
            save: mockSave,
        };

        Planner.findById = jest.fn().mockResolvedValue(mockPlanner);

        await plannerController.updateMealPlan(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Meal plan updated successfully',
            planner: {
                _id: '1234567890',
                userId: '12345',
                meals: {
                    breakfast: 'Waffles',
                    lunch: 'Pasta',
                    dinner: 'Salad',
                },
                save: mockSave
            },
        });

        expect(mockPlanner.save).toHaveBeenCalledTimes(1);
    });

    test('should return 403 if the user is unauthorized to update the meal plan', async () => {
        const req = mockRequest({
            user: { userId: '67890' },
            body: {
                breakfast: 'Waffles',
                lunch: 'Pasta',
                dinner: 'Salad',
            },
            params: { plannerId: '1234567890' },
        });
        const res = mockResponse();

        const mockPlanner = {
            _id: '1234567890',
            userId: '12345',
            meals: {
                breakfast: 'Pancakes',
                lunch: 'Burger',
                dinner: 'Pizza',
            },
        };

        Planner.findById = jest.fn().mockResolvedValue(mockPlanner);

        await plannerController.updateMealPlan(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Unauthorized to update this meal plan',
        });
    });

    test('should return 500 if there is an internal server error', async () => {
        const req = mockRequest({
            user: { userId: '12345' },
            params: { plannerId: '1234567890' },
            body: { breakfast: 'Pancakes', lunch: 'Burger', dinner: 'Pizza' },
        });
        const res = mockResponse();

        const errorMessage = 'Something went wrong';
        Planner.findById = jest.fn().mockRejectedValue(new Error(errorMessage));

        await plannerController.updateMealPlan(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Internal Server Error',
            error: expect.objectContaining({ message: errorMessage }),
        });
    });
});


describe('deleteMealPlan', () => {
    test('should return 200 and delete the meal plan if the user is authorized', async () => {
        const req = mockRequest({
            user: { userId: '12345' },
            params: { plannerId: '1234567890' },
        });
        const res = mockResponse();

        const mockPlanner = {
            _id: '1234567890',
            userId: '12345',
            meals: {
                breakfast: 'Pancakes',
                lunch: 'Burger',
                dinner: 'Pizza',
            },
        };

        Planner.findById = jest.fn().mockResolvedValue(mockPlanner);
        Planner.findByIdAndDelete = jest.fn().mockResolvedValue(mockPlanner);

        await plannerController.deleteMealPlan(req, res);

        expect(Planner.findById).toHaveBeenCalledWith('1234567890');
        expect(Planner.findByIdAndDelete).toHaveBeenCalledWith('1234567890');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Meal Plan successfully deleted',
        });
    });

    test('should return 404 if the meal plan is not found', async () => {
        const req = mockRequest({
            user: { userId: '12345' },
            params: { plannerId: '1234567890' },
        });
        const res = mockResponse();

        Planner.findById = jest.fn().mockResolvedValue(null);

        await plannerController.deleteMealPlan(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Meal Plan not found',
        });
    });

    test('should return 403 if the user is unauthorized to delete the meal plan', async () => {
        const req = mockRequest({
            user: { userId: '67890' },
            params: { plannerId: '1234567890' },
        });
        const res = mockResponse();

        const mockPlanner = {
            _id: '1234567890',
            userId: '12345',
            meals: {
                breakfast: 'Pancakes',
                lunch: 'Burger',
                dinner: 'Pizza',
            },
        };

        Planner.findById = jest.fn().mockResolvedValue(mockPlanner);

        await plannerController.deleteMealPlan(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Unauthorized to delete this meal plan',
        });
    });

    test('should return 500 if there is an internal server error', async () => {
        const req = mockRequest({
            user: { userId: '12345' },
            params: { plannerId: '1234567890' },
        });
        const res = mockResponse();

        const errorMessage = 'Something went wrong';
        Planner.findById = jest.fn().mockRejectedValue(new Error(errorMessage));

        await plannerController.deleteMealPlan(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Internal Server Error',
            error: expect.objectContaining({ message: errorMessage }),
        });
    });
});