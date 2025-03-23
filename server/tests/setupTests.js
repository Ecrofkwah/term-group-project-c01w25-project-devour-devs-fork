import { connect, close } from 'mongodb-memory-server';
import dotenv from 'dotenv';

dotenv.config({ path: ".env.test" });

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await close();
});
