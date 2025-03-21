import request from 'supertest'
import app from '../index.js'
import User from '../models/userModel.js'
import mongoose from 'mongoose'

describe("Auth Controller", () => {
    beforeEach(async () => {
        await User.deleteMany(); // clear db before each test
    });

    test("should register new user", async () => {
        const username = "testuser";
        const email = "test@something.com";
        const password = "testpassword"

        const res = await request(app).post("/api/auth/register").send({
            username, email, password
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("message", "User register successfully");

        const user = await User.findOne({email});
        expect(user).toBeDefined();
        expect(user.username).toBe(username);
        expect(user.password).not.toBe(password); // password should be hased
    });

    test("should not register with existing email", async () => {
        await User.create({
            username: "testuser",
            email: "test@something.com",
            password: "testpassword123"
        });
        const res = await request(app).post("/api/auth/register").send({
            username: "newuser",
            email: "test@something.com",
            password: "newpassword123"
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("message", "Email already existed");
    })

    test("should not register with existing username", async () => {
        await User.create({
            username: "testuser",
            email: "test@something.com",
            password: "testpassword123"
        });
        const res = await request(app).post("/api/auth/register").send({
            username: "testuser",
            email: "new@something.com",
            password: "newpassword123"
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("message", "Username already existed");
    })

    test("should login with correct credentials", async () =>{
        await User.create({
            username: "testuser",
            email: "test@something.com",
            password: "testpassword123"
        });

        const res = await request(app).post("/api/auth/login").send({
            email: "test@something.com",
            password: "testpassword123"
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("token"); // should send token to frontend
        expect(res.body).toHaveProperty("userId");
    })

    test("should return user info if logged in", async () => {
        const user = await User.create({
            username: "testuser",
            email: "test@something.com",
            password: "testpassword123"
        })

        const loginRes = await request(app).post("/api/auth/login").send({
            email: "test@something.com",
            password: "testpassword123"
        });

        const token = loginRes.body.token;
        const res = await request(app).get("/api/auth/me").set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("userId", user._id.toString());
        expect(res.body).toHaveProperty("username", user.username)
    })

    test("should return 401 if missing token", async() => {
        const res = await request(app).get("/api/auth/me"); // no token sent in header
        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty("message", "Unauthorized: Missing token");
    });

    test("should return 401 if invalid token", async() =>{
        const invalidToken = "abc"
        const res = await request(app).get("/api/auth/me").set("Authorization", `Bearer ${invalidToken}`);
        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty("message", "Unauthorized: Invalid token");
    });

});