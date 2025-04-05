import mongoose, { mongo } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import dotenv from 'dotenv';
 
dotenv.config({path: ".env.test"});

beforeAll(async () => {
    const mongoURI = process.env.MONGODB_URI;
    await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    // supress console messages
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterAll(async() => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();

    // restore console messages
    console.error.mockRestore();
    console.warn.mockRestore();
    console.log.mockRestore();
});
