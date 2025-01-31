**1. User Story**

**As a user, I want to be able to create and save a recipe so that I can reference it later.**

**Acceptance Criteria**

- **Given** the user is logged in
    
    **When** they navigate to the recipe creation page
    
    **Then** they should see a “Create New Recipe” button or link.
    
- **Given** the user clicks on “Create New Recipe”
    
    **When** they fill in all required fields (e.g., title, ingredients, steps)
    
    **Then** they should be able to save the recipe.
    
- **Given** the user does not complete required fields
    
    **When** they attempt to save recipe
    
    **Then** they should see an error message indicating inability to save
    
- **Given** a recipe is saved
    
    **When** the user navigates back to their list of recipes
    
    **Then** they should see the newly created recipe listed.
    

**2. User Story**

**As a user, I want to be able to sign in to my account so that I can access my saved recipes, preferences, and settings.**

**Acceptance Criteria**

- **Given** the user has registered
    
    **When** they enter the correct username/email and password
    
    **Then** they should be granted access to their dashboard (logged-in state).
    
- **Given** the user enters incorrect credentials
    
    **When** they attempt to sign in
    
    **Then** they should see an error message indicating invalid login credentials.
    
- **Given** the user is logged in
    
    **When** they navigate to any protected page (e.g., saved recipes)
    
    **Then** they should be able to view their personalized content.
    

**3. User Story**

**As a user, I want to be able to share my saved recipes so that others can view them.**

**Acceptance Criteria**

- **Given** the user is logged in and has at least one saved recipe
    
    **When** they open a specific saved recipe
    
    **Then** they should see a “Share” button.
    
- **Given** the user clicks the “Share” button
    
    **When** the system processes the share request (in-app, facebook, instagram, etc)
    
    **Then** content should be shared (or generate a link to the recipe)
    
- **Given** a recipe has been shared
    
    **When** another user clicks the shared link
    
    **Then** they should be able to view the recipe details (public view) without needing an account (if public sharing is enabled).
    

**4. User Story**

**As a user, I want a filtering system that allows me to search recipes based on specific attributes (e.g., cuisine, dietary preferences, cravings, difficulty level) so that I can narrow down my options effectively.**

**Acceptance Criteria**

- **Given** any user is on the main dashboard
    
    **When** they type in the search bar
    
    **Then** results best matching their input should show (e.g., cuisine, dietary preferences, difficulty level, cooking time).
    
- **Given** the user selects filters (e.g., vegan, difficulty = easy)
    
    **When** they confirm their filter selections
    
    **Then** the recipe results should update to only display recipes matching those criteria.
    
- **Given** the user changes or removes selected filters
    
    **When** they reapply or remove the filters
    
    **Then** the recipe results should update to reflect the new filter set.
    

**5. User Story**

**As a homecook, I want suggestions for ingredient substitutions so I can adapt recipes to my preferences or available ingredients.**

**Acceptance Criteria**

- **Given** the user is viewing a recipe
    
    **When** they click or select a “Substitutions” or “Ingredient Alternatives” option
    
    **Then** the system should list appropriate substitutions for each ingredient (e.g., “Replace sour cream with Greek yogurt”).
    
- **Given** the user applies specific filters (e.g., dietary preference: vegetarian)
    
    **When** they click or select “Substitutions”
    
    **Then** the system should provide substitution options that align with that dietary preference (e.g., tofu instead of chicken).
    
- **Given** the user wants to lower calorie content
    
    **When** they opt to see low-calorie substitutions
    
    **Then** the system should suggest alternatives like “light cheese instead of full-fat cheese.”
    

**6. User Story**

**As a user, I want to rate and comment on posted recipes so that I can provide feedback and engage with the community.**

**Acceptance Criteria**

- **Given** a user is logged in and viewing a published recipe
    
    **When** they go to the review section
    
    **Then** they should see a rating section (e.g., stars, numeric) and a comment box.
    
- **Given** the user submits a review
    
    **When** the system receives it
    
    **Then** the recipe’s feedback section should update to display the new review.
    

**7. User Story**

**As someone who likes trying new things, I want to see the ratings of a recipe so I know I’m not wasting my time trying it.**

**Acceptance Criteria**

- **Given** any user is viewing a recipe
    
    **When** they navigate to the rating section
    
    **Then** they should see an average rating and/or total number of ratings displayed.
    
- **Given** a recipe has no ratings yet
    
    **When** a user views it
    
    **Then** the rating display should indicate “No ratings yet” or similar message.
    

**8. User Story**

**As a beginner cook, I want step-by-step guidance or an AI assistant to help me learn how to cook.**

**Acceptance Criteria**

- **Given** any user is viewing a recipe
    
    **When** they click “Step-by-Step Mode”
    
    **Then** an AI assistant or interactive guide should break down the recipe process into clear, sequential steps.
    
- **Given** a user is in the step-by-step mode
    
    **When** they complete a step and press “complete”
    
    **Then** the guide should prompt the next step.
    
- **Given** the user wants to ask clarifying questions
    
    **When** they interact with the AI assistant
    
    **Then** the AI assistant should provide context-specific cooking tips or clarifications.
    

**9. User Story**

**As a meal prepper, I want to adjust serving sizes dynamically so that the ingredient quantities update automatically, ensuring I get the exact amounts I need without manual calculations.**

**Acceptance Criteria**

- **Given** any user is viewing a recipe
    
    **When** they see a serving size slider or input field
    
    **Then** the user can adjust the number of servings.
    
- **Given** the user adjusts the serving size
    
    **When** the system recalculates the ingredient quantities
    
    **Then** the updated measurements should reflect the new serving size proportionally.
    

**10. User Story**

**As a busy person, I want a button that generates a to-do list with all recipe ingredients, which can integrate with a third-party app or display in a separate tab.**

**Acceptance Criteria**

- **Given** any user is viewing a recipe
    
    **When** they click the “Generate To-Do List” button
    
    **Then** a list of all required ingredients should be displayed.
    

**11. User Story**

**As someone who often has leftovers, I want recipe suggestions based on my leftovers so that food doesn’t go to waste.**

**Acceptance Criteria**

- **Given** any user is on the dashboard
    
    **When** they input the leftover ingredients
    
    **Then** the system should generate recipes that match those leftover ingredients.
    
- **Given** leftover ingredients are entered
    
    **When** no recipes are available
    
    **Then** the system should display a message or suggestion (e.g., “Try adding more items”.
    

**12. User Story**

**As a user, I want to reset my password if I forget it so that I can regain access to my account.**

**Acceptance Criteria**

- **Given** the user is on the login page
    
    **When** they click the “Forgot Password” link
    
    **Then** they should be redirected to the password reset request page.
    
- **Given** the user is on the password reset request page
    
    **When** they enter a valid registered email address
    
    **Then** the system should send a password reset email with a secure link.
    
- **Given** the user enters an unregistered email address
    
    **When** they submit the reset request
    
    **Then** the system should display an error message e.g. “This email is not registered.”
    
- **Given** the user has received a password reset email
    
    **When** they click the reset link
    
    **Then** they should be taken to a page where they can enter a new password.
    
- **Given** the user is on the password reset page
    
    **When** they enter a new password and confirm it
    
    **Then** the system should update their password and allow them to log in with the new credentials.
    
- **Given** the user has successfully reset their password
    
    **When** they try to log in using the new password
    
    **Then** they should be able to access their account.
    

**13. User Story**

**As a user, I want the ability to save recipes to a favorites list so that I can easily access the recipes I love without searching again.**

**Acceptance Criteria**

- **Given** the user is logged in and viewing a recipe
    
    **When** they click the “Favorite” button
    
    **Then** that recipe should be added to their favorites list.
    
- **Given** the user has one or more favorited recipes
    
    **When** they navigate to the “Favorites” tab
    
    **Then** they should see a list of their favorited recipes.
    
- **Given** the user has no favorited recipes
    
    **When** they navigate to the “Favorites” tab
    
    **Then** they should see a message stating “You have no saved recipes yet. Start favoriting your favorite ones!”
    

**14. User Story**

**As a homecook, I want the app to show the difficulty of a recipe based on its ingredients, steps, and required skills so that I can choose recipes that match my abilities.**

**Acceptance Criteria**

- **Given** the user is creating or editing a recipe
    
    **When** they input details of the recipe (such as ingredients, steps, time, etc)
    
    **Then** the user should also add a difficulty rating.
    
- **Given** the difficulty is not mentioned
    
    **When** the user is done creating/editing the recipe
    
    **Then** there should be an assigned difficulty based on some algorithm ( generate a rating based on number of ingredients needed, time taken, if using pan or oven, etc)
    

**15. User Story**

**As a university student, I want to find cheap ingredient suggestions (deals) in nearby stores so that I can stay within my budget.**

**Acceptance Criteria**

- **Given** the user has enabled location services or entered a location
    
    **When** they type in an ingredient
    
    **Then** the system should suggest stores within a radius of the given location with competitive pricing or deals.
    
- **Given** an ingredient to be searched
    
    **When** the user searches for options
    
    **Then** the options should be presented in an ascending order by price.
    
- **Given** there exist multiple store options for a particular item,
    
    **When** the system displays search or comparison results to the user,
    
    **Then** each store option should clearly show; store name, price and distance from user.
    

**16. User Story**

**As a student I want to enter a given budget and I want the app to curate a meal plan for me that will help me stay under budget.**

**Acceptance Criteria**

- **Given** the user enters a budget limit (e.g., $100 for the whole week)
    
    **When** they initiate a “Generate Meal Plan” function
    
    **Then** the system should propose recipes and meal combinations that fit within that budget.
    
- **Given** the user wants to refine the meal plan
    
    **When** they adjust filters (e.g., remove certain ingredients or switch out recipes)
    
    **Then** the system should recalculate and update the meal plan cost.
    

**17. User Story**

**As a user, I want to be able to add items to my virtual pantry so that I can keep track of exactly which ingredients I have on hand.**

**Acceptance Criteria:**

- **Given** the user is on the ‘Virtual Pantry’ page,
    
    **When** they click an “Add Item” button,
    
    **Then** a form appears where they can specify the ingredient name, quantity, and expiration date.
    
- **Given** the user fills in required fields,
    
    **When** they click “Save,”
    
    **Then** the item should appear in the pantry list with the correct details.
    

**18. User Story**

**As a user, When I click a ‘make the recipe’ button, the app should check my Virtual Pantry for the required ingredients and suggest which ones I need to buy, so I can efficiently plan my meals and shopping.**

**Acceptance Criteria**

- **Given** the user is logged in and has populated their virtual pantry
    
    **When** they click “Virtual Pantry”
    
    **Then** they should see a list of all stored ingredients and how much they have
    
- **Given** the user selects a recipe
    
    **When** they click “Make this recipe”
    
    **Then** the system should compare the recipe’s ingredient list with the user’s pantry and highlight which ingredients are missing or insufficient.
    
- **Given** the user sees the “missing/insufficient” list
    
    **When** they decide to proceed
    
    **Then** the system should offer to add those items to a shopping list or a to-do list.
    
- **Given** the user sees the “missing/insufficient” list
    
    **When** they decide to proceed
    
    **Then** the system should offer to add those items to a shopping list or a to-do list.
    

**19. User Story**

**As a user, I want to follow other users to easily access their recipes.**

**Acceptance Criteria**

- **Given** the user is logged in
    
    **When** they visit another user’s profile or recipe page
    
    **Then** they should see a “Follow” button.
    
- **Given** the user clicks “Follow”
    
    **When** the action is confirmed
    
    **Then** the system should add that user to their “Following” list.
    
- **Given** the user has followed someone
    
    **When** they navigate to their own dashboard
    
    **Then** they should see all the new recipes or updates from followed users.
    
- **Given** the user chooses to unfollow
    
    **When** they click “Unfollow”
    
    **Then** the system should remove that user from their “Following” list.
    

**20. User Story**

**As a user, I want to be able to edit or delete a saved recipe so that I can keep my recipe list accurate and up to date.**

**Acceptance Criteria**

- **Given** the user is logged in and has at least one **saved recipe**,
    
    **When** they navigate to their recipe page
    
    **Then** they should see an **“Edit”** button.
    
- **Given** the user clicks the “Edit” button,
    
    **When** they **modify** recipe fields (e.g., title, description, difficulty, etc.),
    
    **Then** they should be able to **save** those changes.
    
- **Given** the user has an **existing** saved recipe,
    
    **When** they see a “Delete” or “Remove” button,
    
    **Then** they can click it to **delete** the recipe.
    
- **Given** the user **confirms** the deletion,
    
    **When** the deletion is **processed**,
    
    **Then** the recipe should be **removed** from the user’s recipe list and no longer be visible.
    

**21. User Story**

**As a user, I want a “Meal Planner” tab so that I can create, view, and manage my weekly meal plans.**

- **Given** the user is logged in,
    
    **When** they click on the “Meal Planner” tab
    
    **Then** they should see all the meals for their week
    
- **Given** the user is on “Meal Planner” tab,
    
    **When** they look at the recipes,
    
    **Then** they should see all the calories and macronutrients for their week and for each individual meal
    
- Given the user is on the “Meal Planner” tab,
    
    When they click on “add meal” or “add recipe” ,
    
    Then the meal/recipe should be added and visible to the user on the planner. The calories and macronutrients should also be updated.
    
- **Given** the user has no saved meal plan yet,
    
    **When** they open the “Meal Planner” tab,
    
    **Then** they should see a prompt or button labelled “Create New Meal Plan.”
    
- **Given** the user has been using the meal planner for one or more weeks,
    
    **When** they click on the “Choose week” drop down,
    
    **Then** they should be able to see all the meals and macronutrients for the selected week
    
- **Given** the user has populated their meal plan,
    
    **When** the they click on a day of the week (e.g. Monday)
    
    **Then** they should be able to see all the meals and macronutrients for that day