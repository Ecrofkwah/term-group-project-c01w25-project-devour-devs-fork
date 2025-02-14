# Recipe Connect by Devour Devs

 > _Note:_ This document is meant to be written during (or shortly after) your initial planning meeting.     
 > It does not really make sense for you to edit this document much (if at all) while working on the project - Instead, at the end of the planning phase, you can refer back to this document and decide which parts of your plan you are happy with and which parts you would like to change.


## Iteration XX

 * Start date: February 5, 2025
 * End date: February 12, 2025

## Process

_This entire section is optional. Note that you will have to fill it out and more for the next 3 deliverables so it's good to start soon and get feedback._ 

#### Roles & responsibilities

Describe the different roles on the team and the responsibilities associated with each role.

Scrum Master: Kushal\
As the Scrum Master, Kushal helps the product owner manage the backlog and helps them plan the work with the team. Additionally, Kushal helps the developers focus on outcomes, and manage blockers. In addition, Kushal also works on developing new features, testing, and participating in code reviews.

Product Owner: William\
As the Product Owner, William understands the product needs and vision allowing him to create and manage the product backlog. Additionally, William manages the release of new features. In addition, William also works on developing new features, testing, and participating in code reviews.

Development Team: Ivy, Michael, Daniyal\
The development team focuses on implementing new features, testing, and participating in code reviews.

#### Events

Describe meetings (and other events) you are planning to have:

 * When and where? In-person or online?

We have meetings online on Zoom. We have standup meetings on Monday at 9pm, Tuesday at 1pm, Thursday at 12pm, and Friday at 3pm. Additionally we have planning/review meetings Wednesday at 8:15pm.

 * What's the purpose of each meeting?

The purpose of the standup meetings is to share general updates with the team. This includes things like what we have accomplished since our last meeting, what we will work on next, and if there is anything impeding our ability to get work done. The purpose of the review/planning meetings are to create a plan for the upcoming sprint; this can include things like dividing the work, creating some documents as a team, and coming up with a rough deadline for completing tasks. Additionally, at the end of the sprint we discuss the work completed in the sprint, and look forward to the next sprint.

 * Other events could be coding sessions, code reviews, quick weekly sync' meeting online, etc.

We engage in code reviews. Before merging on github, we review each other's code to limit faulty code in the develop branch.

#### Artifacts

List/describe the artifacts you will produce in order to organize your team.       

 * Artifacts can be To-do lists, Task boards, schedule(s), etc.
 * We want to understand:
   * How do you keep track of what needs to get done?
   * How do you prioritize tasks?
   * How do tasks get assigned to team members?

In order to keep track of what needs to get done, we record and assign user stories on Jira. Additionally, we have a shared google doc with critical information including our team contract, our technology stack, and overall plan for the project. We prioritize tasks, and assign work fairly during our meetings.


## Product

_This entire section is mandatory._

#### Goals and tasks

 * Describe your goals for this iteration and the tasks that you will have to complete in order to achieve these goals.
 * Order the items from most to least important.
 * Feel free (but not obligated) to specify some/all tasks as user stories.

For Iteration 01, the main goal is to implement key user authentication features (Login and Password Reset) and ensure that they work properly.


 1. Register/Login feature:
 
 Goal: Allow users to log in with their email and password.
 
 Priority: This is the most critical feature to start with, as it enables users to access the system.
 
 - Task 1: Design the login/register form (front-end).
 - Task 2: Create the API for login/register (back-end).
 - Task 3: Handle error messages on front-end.
 - Task 4: Validate user input/password and send error messages.
 - Task 5: Integrate front-end with back-end API.


2. User dashboard where users can create recipe:

Goal: Allow logged-in users to create, edit and delete recipes. 

Priority: This is the second most critical feature, as this is the main focus of our app; the main purpose of our app is to share recipes. 

- Task 1: Design the dashboard where users can create recipes (My Recipes page)(front-end).
  - Task 1a) Display a list of the user’s recipes.
  - Task 1b) Add a “create new recipe” button.
  - Task 1c) Implement an intuitive UI for users to manage their recipes.
- Task 2: Design the Create Recipe Form Page (front-end).
  - Design a user-friendly form for creating a new recipe.
  - Fields: Title, Description, Ingredients, Instructions, Category, and Image Upload.
  - Implement input validation (e.g., required fields, character limits).
  - Add real-time feedback (e.g., success/error messages).
- Task 3: Edit Recipe Page (front-end):
  - Pre-fill the form with the recipe’s existing data.
  - Allow users to update any field and save changes.
- Task 4: Delete Recipe Functionality (front-end):
  - Add a "Delete" button on each recipe card.
  - Implement a confirmation dialog before deletion.
- Task 5: Create API Endpoints (back-end)
- Task 6: Database Model (back-end):
  - Recipes collections (Simplified Ver.)
  - {
  - authorID: string
  - name: string
  - ingredients: []
  - Instructions: []
  - category: []
  - }
- Task 7: Middleware & Validation (back-end)
  - Ensure only authenticated users can create/edit/delete recipes.
  - Validate user input (e.g., prevent empty fields, limit text length).
  - Handle file uploads for recipe images
- Task 8: Connect front-end to back-end
3. Design the landing page for the app (for non-logged in user and first-time visitor): should be able to see all recipe posts.

Goal: Gives user a visually attractive overview of the app and what it does.

Priority: This feature is the least critical as it does not add to the functionality of the app. This landing page is simply for aesthetic reasons. However, it is still important as it will be the first thing users will see in the app.

Tasks:

- Create Layout: Design the structure of the dashboard with sections for welcome message, CTAs, and app highlights.
- Implement CTAs: Add clear and visually appealing Sign Up and Log In buttons.
- Style the Page: Ensure the page is visually appealing with brand colors, images, and responsive design.
- Display App Features: Create sections showcasing app features (e.g., benefits, descriptions).
- Add Navigation: Implement a simple navigation bar with links to Sign Up and Log In.


#### Artifacts

List/describe the artifacts you will produce in order to present your project idea.

 * Artifacts can be text, code, images, videos, interactive mock-ups and/or any other useful artifact you can think of.
 * Make sure to explain the purpose of each artifact (i.e. Why is it on your to-do list? Why is it useful for your team?)
 * Be concise, yet precise.         
   For example: "Build the website" is not precise at all, but "Build a static home page and upload it somewhere, so that it is publicly accessible" is much clearer.

Artifact 1: Build the user dashboard where users can create recipes, so that logged in users can create, edit and delete recipes.


Artifact 2: Build the landing page for non-logged in users and first time visitors, so they can see all recipe posts and it gives them a visually attractive overview of the app.

