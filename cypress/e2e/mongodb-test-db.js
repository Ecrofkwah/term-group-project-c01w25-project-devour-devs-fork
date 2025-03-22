// cypress/mongo-memory-server.js

import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import User from '../../server/models/userModel.js';

let mongoServer;

export const connect = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  process.env.MONGO_URI = 1;
  await mongoose.connect(uri);
  return uri;
};

export const close = async () => {
  if (mongoServer) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  }
};

export const clear = async () => {
    // console.log('MongoServer:');
    // console.log(mongoServer);
    // console.log('mongoose ready state (1 = ready):');
    // console.log(mongoose.connection.readyState);
    //return mongoose.connection.db.collection('users').deleteMany({});
    return User.deleteMany();
};

export const findUserEntry = async (query) => {
    const user = await mongoose.connection.db.collection('users').findOne(query);
    return user ? user.toObject() : null;
};
