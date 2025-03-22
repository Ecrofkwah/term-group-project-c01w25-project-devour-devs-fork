import { defineConfig } from "cypress";
//import { connect, clear, close, findUserEntry } from './cypress/e2e/mongodb-test-db.js'
// import dotenv from 'dotenv';

// dotenv.config({path: ".env.test-cy"});

export default defineConfig({
  e2e: {
    //baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      // dotenv.config({path: ".env.test-cy"});
      // //process.env.NODE_ENV='test-cy';
      // /*on('before:run', async () => {
      //   console.log("WE CONNECTED");
      //   await connect();
      //   //mongoServer = await MongoMemoryServer.create();
      //   const mongoURI = mongoServer.getURI();
      //   await mongoose.connect(mongoURI);
        
      //   config.env.MONGO_URI = mongoURI;
      //   process.env.CYPRESS_MONGO_URI = mongoURI;
      //   await import ('./server');
      // });*/
      
      // on('task', {
      //   async resetDatabase() {
      //     await clear();
      //     /*if (!mongoServer) {
      //       console.log('Did not connect');
      //       mongoServer = await MongoMemoryServer.create();
      //     }
      //     await mongoose.connection.dropDatabase();*/
      //     return null;
      //   },
      //   async connectToDB(){
      //     await connect();
      //     console.log("WE CONNECTED");
      //     return null;
      //   },
      //   async findUser(query) {
      //     return await findUserEntry(query);
      //   },
      //   async closeDB(){
      //     close();
      //     return null;
      //   }
      // });
      
      /*on('after:run', async () => {
        await clear();
      });*/
      
      return config;
    },
  },
});
