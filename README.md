# RecipeConnect
By team: Devour Devs

## Description:
RecipeConnect is an innovative recipe-sharing application designed to simplify the cooking experience for everyone, from beginners to culinary enthusiasts. Our mission is to be the go-to platform for finding and sharing recipes, addressing a wide array of user needs and preferences. However, we also offer numerous features that students would appreciate regarding budgeting, difficulty, and a focus on nutrition.

###### Key Features (Description):
- <b>Advanced Search Options:</b> Users can search for recipes by name, ingredients, one-pot dishes, cuisine type, and more. This comprehensive search capability enables users to pinpoint exactly what they want without sifting through endless unsuitable options.
- <b>Budget-Friendly Cooking:</b> For those mindful of their finances, our app provides cost-effective shopping suggestions, budget-conscious meal plans, and a search filter focused on recipe cost.
- <b>Recipe Creation and Sharing:</b> Recipe writers can easily create and save their recipes with our user-friendly builder, which automatically calculates nutritional information, cost, and difficulty.
- <b>Virtual Pantry and Ingredient Substitution:</b> Users can manage a virtual pantry to track ingredients, find matching recipes, and receive ingredient buying suggestions. We also offer substitution options for limited ingredient scenarios.
- <b>Healthy Eating Support:</b> To encourage healthier eating habits, RecipeConnect includes nutritional information for each recipe, customizable serving sizes, healthier ingredient alternatives, and calorie-based filtering.

## Motivation:
Our project RecipeConnect is a recipe sharing platform designed specifically for students. Many students struggle with eating proper three meals a day due to limited time, tight budgets and inexperienced in cooking. Our platform provides easy, affordable and quick recipes options tailored to student needs, where students can share their own recipe, discover new dishes to cook, interact and learn with one another. By simplifying home cooking, we hope to promote healthier eating habits, reduce reliance on takeouts and make cooking more accessible and enjoyable for our peers.

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

MVC Structure:
- Model: `/server/models` defines the data structure (ex, User schema in User.js)
- View: front end react app
- Controller: `/server/controllers` handles the logic between model and view. (ex signUserUp. logUserIn)

## Contribution:
1. Git Flow: We will use git flow for managing branches and releases.
2. Branches naming: `main`, `develop`, `feature/feature-name`, `bugfix/bug-name`, `release/release-version`, `hotfix/hotfix-name`
3. We will use Jira for tracking issues.
4. Pull request: All changes to the `main` and `develop` branches should be via pull requests, which should be reviewed by at least 2 other people before merging, unless specified otherwise.



