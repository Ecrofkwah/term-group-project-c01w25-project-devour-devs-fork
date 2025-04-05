import cypress, { defineConfig } from "cypress";
import mongoose from 'mongoose';
import { MONGODB_URI } from "./cypress-constants.js";
import User from "./server/models/userModel.js";
//import { connect, clear, close, findUserEntry } from './cypress/e2e/mongodb-test-db.js'
// import dotenv from 'dotenv';

// dotenv.config({path: ".env.test-cy"});

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173/',
    setupNodeEvents(on, config) {
      on('task', {
        async connect() {
          await mongoose.connect(MONGODB_URI)
            .then(() => { console.log("Connected") })
            .catch((error) => console.log(`Error connecting to DB: ${error}`))
          //cy.log(mongoose.connection.readyState);
          return mongoose.connection.readyState;
        },
        async disconnect() {
          await mongoose.connection.close();
          return null;
        },
        async clearUsers(){
          await mongoose.connection.collection('users').deleteMany({});
          //cy.log(mongoose.connection.readyState);
          return null;
          // await User.deleteMany();
          // return null;
        },
        async clearFavourites(){
          await mongoose.connection.collection('favourites').deleteMany({});
          return null;
        },
        async clearRatings(){
          await mongoose.connection.collection('mealRatings').deleteMany({});
          return null;
        },
        async findUser(email){
          const user = await mongoose.connection.collection('users').findOne({email: email});
          //cy.log(mongoose.connection.readyState);
          return user;
        },
        async checkConnection(){
          return mongoose.connection.readyState;
        }
      });
      return config;
    },
  },
});
