# Release Plan


Release Name: Sprint 3 Demo


## Release Objectives
### Specific Goals:
- <b>Meal Planning System:</b>
  - Enable users to create, view, and manage daily meal plans with nutritional breakdowns and a user friendly interface.


- <b>AI Step-by-Step Cooking Guidance:</b>
  - Guide users through recipes with interactive steps and an AI assistant.



- <b>Meal Image Upload & Nutritional Analysis:</b>
  - Allow users to upload meal images of cooked dishes for ingredient and nutrition estimation using AI model.


- <b>Leftover Meal Suggestions:</b>
  - Help users reduce food waste by suggesting recipes based on available leftovers ingredients.


### Metrics for Measurement:
- <b>Meal Planner KPI:</b>
  - Number of new meal planners created.
  - Accurately fetch the right meal planner for the user.
  - Users are able to edit their meal plans and it will update in the database.
  - Users can delete meal plans.


- <b>AI Step-by-Step Cooking Guidance KPI:</b>
  - The user is able to launch the AI Cooking Guidance assistant.
  - The AI Cooking assistant accurately get the right instruction for the recipe.
  - AI assistant makes clear and context specific cooking tips and answer user questions in real time.


- <b>Meal Image Upload & Nutritional Analysis KPI:</b>
  - The AI model accurately identifies the dish.
  - The AI model is able to provide ingredients and  nutrition information about the dish.

- <b>Leftover Meal Suggestions KPI:</b>
  - The meals suggested are relevant to the ingredients given.
  - Able to quickly fetch recipes after inputting leftover ingredients.




## Release Scope
### Included Features:


- <b>Meal Planner Feature:</b>
  - Meal Planner Tab that is only accessible to users that are logged in.
  - Monthly Calendar UI.
  - “Fetch Meal Plan” and “Create Meal Plan” for users.
  - Additional “Edit Meal Plan” and “Delete Meal Plan” button only available for users who have already created a meal plan.
  - Nutritional Insights under meal cards that include calories and macronutrient information.




- <b>AI Step-by-Step Cooking Guidance Feature:</b>
  - “Step-by-Step Mode” on recipe pages.
  - Sequential step display with “Complete” progression.
  - Embedded AI assistant for tips & clarifications.
  - Usability tested for beginner friendliness.


- <b>Meal Image Upload & Nutritional Analysis Feature:</b>
  - Add 'Save to Favorites' button on recipe pages.
  - Create a dedicated favorites page displaying saved recipes.


- <b>Ratings and Comments Feature:</b>
  - Image upload button for users to upload a picture of their meal for nutritional analysis.
  - AI model (FoodNet)  that helps identify ingredients and estimates nutritional values.
  - Users can modify serving sizes for accuracy.
  - Nutrients are automatically logged in the user’s daily intake summary.

- <b>Leftover Meal Suggestions Feature:</b>
  - A user-friendly section on the dashboard to input leftover ingredients.
  - Recipe Matching Algorithm that helps to identify the best recipes using leftover ingredients.
  - Suggests meals instantly based on entered leftovers.
  - Dynamic Messaging, the feature will provide prompts like “Try adding more items” when no matches are found.



### Excluded Features:
- <b>Virtual Pantry Feature:</b>
  - “Virtual Pantry” tab with stored ingredients and quantities.
  - Auto-check against recipe ingredients when “Make this Recipe” is clicked.
  - Highlight missing or insufficient items.
  - Add missing ingredients to shopping or to-do lists.

This feature could not be completed fully due to time constraints and the complexity of the tasks. As a result, this feature will not be included in the current release. We plan to continue working on it in the next iteration.
  


### Bug Fixes:
- N/A


### Non-Functional Requirements:
- <b>Performance:</b>
  - Meal planner is fetched  < 1s
  - Leftover Meal Suggestion < 1s
  - Image prediction < 3s
  - AI replies < 3s

- <b>Security:</b>
  - Users must login to access Meal Planner feature, AI Cooking Guidance feature,  Meal Image Upload & Nutritional Analysis Feature And Leftover Meal Suggestions Feature.


- <b>Useability:</b>
  - Focused on Developing user friendly UI for all the features.
  - Filter is optimized so that the user does not have to wait while after they enter leftover ingredients.

 
### Dependencies and Limitations:

- <b>Meal Planner Feature:</b>
  - Please delete the “meals” directory on the MongoDB database on your local machine so that the recipe platform can refetch recipes with included nutrition information for the meal planner’s meal cards to include calories and macronutrients information.


- <b>Meal Planner Feature:</b>
   - To enable the Spoonacular API and AI Stepp-by-Step Cooking assistant, will need to update .env file to:
    - PORT="3000"
    - MONGODB_URI="mongodb://127.0.0.1:27017/recipeconnect"
    - JWT_SECRET="ds9u2f383hf839"
    - NODE_ENV = "development"
    - SPOONACULAR_API_KEY= “{put your Spoonacular api key here}”
    - GEMINI_API_KEY = “{Your API key}”


- <b>Meal Image Upload & Nutritional Analysis Feature:</b>
  - The AI model used is only able to recognize 101 dishes.
  - To enable the Spoonacular API and Meal Image Upload & Nutritional Analysis Feature, will need to update .env file to:
    - PORT="3000"
    - MONGODB_URI="mongodb://127.0.0.1:27017/recipeconnect"
    - JWT_SECRET="ds9u2f383hf839"
    - NODE_ENV = "development"
    - SPOONACULAR_API_KEY= “{put your Spoonacular api key here}”
    - GEMINI_API_KEY = “{Your API key}”
    - ROBOFLOW_API_KEY = "{put your roboflow api key here}"





