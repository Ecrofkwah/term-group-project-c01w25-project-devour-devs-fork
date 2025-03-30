# RecipeConnect
By team: Devour Devs

## Description:
RecipeConnect is a dynamic recipe and meal planning application designed to enhance the cooking experience for individuals at all levels. With a focus on simplicity and utility, RecipeConnect offers a range of features that empower users to discover recipes, plan their meals, and stay on track with their nutritional goals.

#### Key Features:
- <b>User Authentication & Personalization:</b> Register and log in to save favorite recipes, meal plans, and track nutritional progress.
- <b>Recipe Discovery & Search:</b> Browse and search recipes based on ingredients, dietary preferences, and cooking time, with suggestions based on what ingredients you have at home.
- <b>Meal Planning:</b> Plan and manage weekly meals, ensuring a well-organized cooking schedule that aligns with dietary needs.
- <b>AI Cooking Assistant:</b> Receive step-by-step cooking guidance and answers to your culinary questions, making meal prep easier.
- <b>Nutritional Analysis:</b> Upload meal photos for instant nutritional breakdowns, helping you track calories and nutrients for healthier eating.


## Motivation:
RecipeConnect is designed to help home cooks, beginners, and anyone looking to adopt a healthier eating style. The app offers a user-friendly platform to discover new recipes, plan meals, and track nutrition.
Whether you're new to cooking, seeking fresh meal ideas, or aiming for healthier eating habits, RecipeConnect provides the tools to make meal planning easy and enjoyable, even on a busy schedule.


## Installation:
### <b>Prerequisites:</b>
- Node.js (v22.13.1 LTS)
- MongoDB: (v 8.0.4)
  - Go to https://www.mongodb.com/try/download/community and download the MongoDB Community Edition
  - During installation, ensure you select the <b>Complete</b> option, which includes both MongoDB Server and MongoDB Compass (the MongoDB GUI).
- Git

### <u><b>Set Up Steps:</b></u>

<b>1. Clone the repo</b>

<b>2. Connect to MongoDB:</b>
- Open MongoDB Compass.
- To create a new connection, click the + button next to CONNECTIONS.
- Enter the following URI: mongodb://localhost:27017 and click Save & Connect.
- Create a new database named `recipeconnect`.
- If you don't see the database, refresh by clicking the three dots next to localhost:27017 and selecting Refresh Databases.

<b>3. Sign up for API keys used by the app:</b>

Sign Up for Spoonacular API key:
- Go to https://spoonacular.com/food-api and sign up for a free api key

Sign Up for Gemini API Key:
- Go to https://aistudio.google.com/app/apikey and click "Create API key"

Sign Up for Roboflow API Key:
- Go to https://universe.roboflow.com/ and sign up for an account
- After logged in, go to your project. Create one if you don't have any project
- Then, go to Settings > API Keys to access your api key
  
<b>4. Set Up `.env` File:</b>
- Create a `.env` file in the `server` folder.
- Add the following to the file:
```bash
PORT="3000"
MONGODB_URI="mongodb://127.0.0.1:27017/recipeconnect"
JWT_SECRET="ds9u2f383hf839"
NODE_ENV = "development"
SPOONACULAR_API_KEY="put your spoonacular api key here"
GEMINI_API_KEY = "put your gemini api key here"
ROBOFLOW_API_KEY = "put your roboflow api key here"
```

<b>5. Install Packages:</b>

Frontend: Navigate to the `client` folder and install dependencies:
```
cd client
npm install
```

Backend: Navigate to the `server` folder and install dependencies:
```
cd server
npm install
```

Root: Navigate to the root of the project and install dependencies:
```
cd ..
npm install
```

<b>6. Run the app:</b>

Navigate to `client` folder, start the frontend:
```
cd client
npm run dev
```

On another terminal, navigate to `server` folder, start the backend:
```
cd server
npm start
```

Make sure both client and server are running at the same time for the app to function properly.


## File setup explanation:

Frontend (`client` folder): 
  Within the `/src` folder:
- `/components`: contains reusable elements like login, signup, dashboard
- `/pages`: contains main pages for the app
- `App.jsx`: handles routing and rendering other components
- `/config`: contains config.js to store base URL and other necessary variables

Backend (server folder):

- `/models`: contains files that define database schema. Ex: User.js defines the database schema for users
- `/routes`: handle routing and map the endpoints to controllers. Ex: /sign up, /login
- `/controllers`: contain logic for each route (e.g authController.js contains logic for user sign up / log in)
- `index.js`: entry point for server, set up express app, connect to database, handle requests.
- `/tests`: contains backend test cases

MVC Structure:
- Model: `/server/models` defines the data structure.
- View: front end react app
- Controller: `/server/controllers` handles the logic between model and view.

## Contribution:
1. Git Flow: We will use git flow for managing branches and releases.
2. Branches naming: `main`, `develop`, `feature/feature-name`, `bugfix/bug-name`, `release/release-version`, `hotfix/hotfix-name`
3. We will use Jira for tracking issues.
4. Pull request: All changes to the `main` branch should be via pull requests, which should be reviewed by at least 2 other people before merging, unless specified otherwise.



