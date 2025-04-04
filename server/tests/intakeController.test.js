import Intake from "../models/intakeModel";
import intakeController from "../controllers/intakeController";
import mongoose from "mongoose";

jest.mock('../models/intakeModel.js');

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
    await Intake.deleteMany({});
    jest.clearAllMocks();
});

afterEach(() => {
    jest.resetAllMocks();
})

describe('saveIntake', () => {
    test("should return 201 and save intake when valid data is provided", async () => {
        const req = mockRequest({
          body: {
            category: "Lunch",
            portion: 250,
            calories: 500,
            protein: 30,
            carbs: 40,
            fat: 20,
            userId: "user123",
          },
        });
        const res = mockResponse();
    
        const mockIntakeData = {
          category: "Lunch",
          portion: 250,
          calories: 500,
          protein: 30,
          carbs: 40,
          fat: 20,
          userId: "user123",
        };
    
        // mock the save operation
        const mockSave = jest.fn().mockResolvedValueOnce(mockIntakeData);
    
        // mock constructor of intake
        Intake.mockImplementationOnce(() => ({
          ...mockIntakeData,
          save: mockSave,
        }));
    
        await intakeController.saveIntake(req, res);
    
        expect(Intake).toHaveBeenCalledTimes(1);
        expect(Intake).toHaveBeenCalledWith(mockIntakeData);
        expect(mockSave).toHaveBeenCalledTimes(1);
    
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
          message: "Intake saved successfully",
          intake: {
            ...mockIntakeData,
            save: mockSave,
          },
          success: true,
        });
    });
    
    test("should return 500 if save throws an error", async () => {
        const req = mockRequest({
          body: {
            category: "Dinner",
            portion: 300,
            calories: 700,
            protein: 40,
            carbs: 50,
            fat: 25,
            userId: "user456",
          },
        });
        const res = mockResponse();
    
        const mockError = new Error("Failed to save intake");
    
        const mockSave = jest.fn().mockRejectedValueOnce(mockError);
    
        Intake.mockImplementationOnce(() => ({
          ...req.body,
          save: mockSave,
        }));
    
        await intakeController.saveIntake(req, res);
    
        expect(Intake).toHaveBeenCalledTimes(1);
        expect(mockSave).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
          message: "Error saving intake",
          error: "Failed to save intake",
        });
    });
});


describe('getIntakes', () => {
    test('should return 400 if date is missing', async () => {
        const req = mockRequest();
        const res = mockResponse();
        req.query.date = undefined;

        await intakeController.getIntakes(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Date is missing' });
    });

    test('should return 201 and list intakes for a specific date', async () => {
        const req = mockRequest();
        const res = mockResponse();
        req.query.date = '2025-04-04';
        req.user = { userId: '12345' };

        const mockIntakes = [
            {
                _id: '61b2b8d5a45b8c5b7d6e6ed7',
                category: 'Breakfast',
                portion: 200,
                calories: 300,
                protein: 15,
                carbs: 40,
                fat: 10,
                userId: '12345',
                date: '2025-04-04T08:00:00.000Z',
            },
            {
                _id: '61b2b8d5a45b8c5b7d6e6ed8',
                category: 'Lunch',
                portion: 250,
                calories: 450,
                protein: 20,
                carbs: 60,
                fat: 15,
                userId: '12345',
                date: '2025-04-04T12:00:00.000Z',
            },
        ];

        jest.spyOn(Intake, 'find').mockReturnValueOnce({
            sort: jest.fn().mockResolvedValueOnce(mockIntakes),
            exec: jest.fn().mockResolvedValueOnce(mockIntakes),
        });

        await intakeController.getIntakes(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ intakes: mockIntakes });
    });

    test('should return 404 if no intakes found for given date', async () => {
        const req = mockRequest();
        const res = mockResponse();
        req.query.date = '2025-04-04';
        req.user = { userId: '12345' };

        jest.spyOn(Intake, 'find').mockReturnValueOnce({
            sort: jest.fn().mockResolvedValueOnce(null),
            exec: jest.fn().mockResolvedValueOnce(null),
        });

        await intakeController.getIntakes(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Error finding intakes for this user' });
    });

    test('should return 500 if there is a server error', async () => {
        const req = mockRequest();
        const res = mockResponse();
        req.query.date = '2025-04-04';
        req.user = { userId: '12345' };

        jest.spyOn(Intake, 'find').mockReturnValueOnce({
            sort: jest.fn().mockRejectedValueOnce(new Error('server error')),
            exec: jest.fn().mockRejectedValueOnce(new Error('server error')),
        });

        await intakeController.getIntakes(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Error retrieving intakes', error: 'server error' });
    });
});

describe("deleteIntake", () => {

    test("should return 201 and delete intake successfully", async () => {
        const mockIntakeId = "987";
        const mockUserId = "12345";
        const mockIntake = { _id: mockIntakeId, userId: mockUserId };

        const req = mockRequest({
            query: { intakeId: mockIntakeId },
            user: { userId: mockUserId }
        })
        const res = mockResponse();
        // mock the delete query
        Intake.findOneAndDelete.mockResolvedValue(mockIntake);

        await intakeController.deleteIntake(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: "Intake deleted successfully" });
    });

    test("should return 404 if intake not found", async () => {
        const mockIntakeId = "987";
        const mockUserId = "12345";

        const req = mockRequest({
            query: { intakeId: mockIntakeId },
            user: { userId: mockUserId }
        })
        const res = mockResponse();

        Intake.findOneAndDelete.mockResolvedValue(null);

        await intakeController.deleteIntake(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Intake not found" });
    });

    test("should return 500 if there is a server error", async () => {
        const mockIntakeId = "987";
        const mockUserId = "12345";

        const req = mockRequest({
            query: { intakeId: mockIntakeId },
            user: { userId: mockUserId }
        })
        const res = mockResponse();
        Intake.findOneAndDelete.mockRejectedValue(new Error("server error"));

        await intakeController.deleteIntake(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "Error deleting intake",
            error: "server error"
        });
    });

});


describe("totalIntakesByDate", () => {

    test("should return 200 and total intakes summary for a specific date", async () => {
        const mockDate = "2025-04-04";
        const mockUserId = "12345";
        const mockIntakes = [
            { calories: 300, protein: 15, carbs: 40, fat: 10 },
            { calories: 450, protein: 20, carbs: 60, fat: 15 },
        ];

        const req = mockRequest({
            query: { date: mockDate },
            user: { userId: mockUserId }
        });

        const res = mockResponse();

        Intake.find.mockResolvedValue(mockIntakes);

        await intakeController.totalIntakesByDate(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            date: mockDate,
            totalCalories: 750,
            totalProtein: 35,
            totalCarbs: 100,
            totalFat: 25
        });
    });

    test("should return 400 if date is missing", async () => {
        const req = mockRequest();
        const res = mockResponse();

        await intakeController.totalIntakesByDate(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Date is missing" });
    });

    test("should return 404 if no intakes found for the given date", async () => {
        const mockDate = "2025-04-04";
        const mockUserId = "12345";

        const req = mockRequest({
            query: { date: mockDate },
            user: { userId: mockUserId }
        });

        const res = mockResponse();

        Intake.find.mockResolvedValue(null);

        await intakeController.totalIntakesByDate(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: `Error retrieving intake data for ${mockDate}` });
    });

    test("should return 500 if there is a server error", async () => {
        const mockDate = "2025-04-04";
        const mockUserId = "12345";

        const req = mockRequest({
            query: { date: mockDate },
            user: { userId: mockUserId }
        });

        const res = mockResponse();

        Intake.find.mockRejectedValue(new Error("server error"));

        await intakeController.totalIntakesByDate(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "error retrieving intake data for given date",
            error: "server error"
        });
    });
});


describe('lastNDaysIntake', () => {
    test('should return 200 and the total intake for the last 5 days', async () => {
        const mockUserId = new mongoose.Types.ObjectId();
        const mockIntakes = [
            { _id: '2025-04-01', totalCalories: 500, totalProtein: 30, totalCarbs: 60, totalFat: 20 },
            { _id: '2025-04-02', totalCalories: 600, totalProtein: 35, totalCarbs: 70, totalFat: 25 },
            { _id: '2025-04-03', totalCalories: 550, totalProtein: 32, totalCarbs: 65, totalFat: 22 },
            { _id: '2025-04-04', totalCalories: 700, totalProtein: 40, totalCarbs: 80, totalFat: 30 },
            { _id: '2025-04-05', totalCalories: 650, totalProtein: 38, totalCarbs: 75, totalFat: 28 },
        ];

        const req = mockRequest({
            user: { userId: mockUserId }
        });
        const res = mockResponse();

        jest.spyOn(Intake, 'aggregate').mockResolvedValue(mockIntakes);

        await intakeController.lastNDaysIntake(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ intakes: mockIntakes });
    });

    test('should return 500 if there is a server error', async () => {
        const req = mockRequest({
            user: {userId: new mongoose.Types.ObjectId()}
        });
        const res = mockResponse();

        jest.spyOn(Intake, 'aggregate').mockRejectedValue(new Error('server error'));

        await intakeController.lastNDaysIntake(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Error retrieving intake data for the last 5 days',
            error: 'server error'
        });
    });
});


