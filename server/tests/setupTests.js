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
});

afterAll(async() => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});
