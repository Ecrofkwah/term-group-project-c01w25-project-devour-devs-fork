# Release Plan


Release Name: Sprint 2 Demo


## Release Objectives
### Specific Goals:
- <b>Filtering System:</b>
  - Implement a Filtering System to enable users to refine recipe searches based on categories, dietary preferences, and difficulty levels. 


- <b>Favourite List:</b>
  - Develop a Favorites List feature allowing users to save recipes that they like and quickly access for later. 


- <b>Ratings and Comment:</b>
  - Introduce a Ratings and Comments system to foster user engagement and feedback for each recipe.


### Metrics for Measurement:
- <b>Filtering System KPI:</b>
  - Number of searches that accurately provide user with results
  - The accuracy of the filtering for recipes based on different category, difficulty level and dietary preferences


- <b>Favorites List KPI:</b>
  - Number of users saving recipes, and retrieval accuracy.


- <b>Ratings and Comments KPI:</b>
  - Users are able to comment and rate each recipe.
  - Users are able to edit, delete their own comment
  - Each recipe has their average rating shown


## Release Scope
### Included Features:


- <b>Spoonacular API:</b>
  - UI of recipe platform greatly improved by using Spoonacular API to fetch recipes and images


- <b>Filtering System Feature:</b>
  - Design UI (dropdowns, checkboxes, search bar, tags, etc.).
  - Implement backend filtering logic.
  - Ensure performance optimization for large datasets.
  - Enable multi-filter selection and dynamic updates.


- <b>Favorites List Feature:</b>
  - Add 'Save to Favorites' button on recipe pages.
  - Create a dedicated favorites page displaying saved recipes.


- <b>Ratings and Comments Feature:</b>
  - Integrate a star-rating system (1-5 stars).
  - Allow users to leave, edit, and delete text-based comments.
  - Implement backend logic for storing and retrieving ratings/comments.
  - Display average rating and total reviews for each recipe.


### Excluded Features:
- <b>Meal Planning Feature (Basic Frontend and Backend Completed: view and create meal planner):</b>
  - Design the UI for meal planning.
  - Enable users to add recipes to specific days.
  - Implement a backend system for storing and retrieving meal plans.
This feature could not be completed fully due to time constraints and the complexity of the tasks. As a result, this feature will not be included in the current release. We plan to continue working on it in the next iteration.
- <b>Transcript-to-Voice and Vice Versa for Future AI Chatbot Implementation</b>
  - Research and select a speech-to-text API.
  - Research and select a text-to-speech API.
  - Implement a basic prototype to convert text-based recipes into audio.
  - Test accuracy and usability with different accents and speech patterns
This feature could not be completed fully due to time constraints and the complexity of the tasks. As a result, this feature will not be included in the current release. We plan to continue working on it in the next iteration.


### Bug Fixes:
None


### Non-Functional Requirements:
None
 
### Dependencies and Limitations:
- To enable the Spoonacular API, will need to update .env file to:
    PORT="3000"
    MONGODB_URI="mongodb://127.0.0.1:27017/recipeconnect"
    JWT_SECRET="ds9u2f383hf839"
    NODE_ENV = "development"
    SPOONACULAR_API_KEY= “put your Spoonacular api key here”
