// tests/setupTests.js
import { connect, close } from '../cypress/mongo-memory-server.js';
import dotenv from 'dotenv';

dotenv.config({ path: ".env.test" });

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await close();
});
