#Recipe Connect/Devour Devs

 > _Note:_ This document is meant to be written during (or shortly after) your initial planning meeting.     
 > It does not really make sense for you to edit this document much (if at all) while working on the project - Instead, at the end of the planning phase, you can refer back to this document and decide which parts of your plan you are happy with and which parts you would like to change.


## Iteration 03

 * Start date: March 12, 2025
 * End date: March 19, 2025

## Process

_This entire section is optional. Note that you will have to fill it out and more for the next 3 deliverables so it's good to start soon and get feedback._ 

#### Roles & responsibilities

Describe the different roles on the team and the responsibilities associated with each role.

Scrum Master: Kushal
As the Scrum Master, Kushal helps the product owner manage the backlog and helps them plan the work with the team. Additionally, Kushal helps the developers focus on outcomes, and manage blockers. In addition, Kushal also works on developing new features, testing, and participating in code reviews.

Product Owner: William
As the Product Owner, William understands the product needs and vision allowing him to create and manage the product backlog. Additionally, William manages the release of new features. In addition, William also works on developing new features, testing, and participating in code reviews.

Development Team: Ivy, Michael, Daniyal
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

1. Virtual Pantry\
Goal: Allow users to check their virtual pantry when preparing a recipe, automatically highlighting any missing or insufficient ingredients. \
Priority: Medium – Streamlines meal preparation by integrating inventory checks and shopping list creation.\
Tasks:\
Develop a “Virtual Pantry” view that lists all stored ingredients along with their quantities.\
Integrate a check that triggers when the user clicks the “Make this Recipe” button, comparing the recipe’s ingredients with the pantry contents.\
Highlight any missing or insufficient ingredients.\
Provide an option to add these items to a shopping or to-do list.

\
2. Meal Planning Enhancement\
Goal: Enable users to create, view, and manage their weekly meal plans with detailed nutritional insights.\
Priority: High – Enhances engagement by facilitating meal planning and providing key information such as calories and macronutrients.\
Tasks:\
Develop and integrate a dedicated “Meal Planner” tab accessible upon login.\
Design a clear and interactive UI for creating and managing weekly meal plans.\
Prompt new users with a “Create New Meal Plan” button when no plan is saved.\
Allow users to add recipes to specific days with auto-calculation and display of calories and macronutrients.\
Implement a drop-down menu for users to review meal plans from previous weeks and view day-specific details.

\
3. Leftover meal suggestions feature\
Goal: Provide personalized recipe suggestions based on user-input leftover ingredients to reduce food waste.\
Priority: Highest – Directly addresses a common user need by helping them make the most of available ingredients.\
Tasks:\
Implement a user-friendly input interface on the dashboard for entering leftover ingredients.\
Develop an algorithm that matches the entered ingredients to available recipes.\
Display matching recipes in real time.\
Create dynamic messaging (e.g., “Try adding more items”) when no matching recipes are found.

\
4. Step-by-Step Guidance / AI Assistant\
Goal: Provide an interactive, AI-driven guide to help beginner cooks follow recipes step-by-step with clarity and ease.\
Priority: Medium-Low – Enhances user experience and supports learning, though it is not critical for core functionality.\
Tasks:\
Add a “Step-by-Step Mode” button on recipe pages to launch the interactive guide.\
Develop a sequential process where each step is clearly explained and followed by a “complete” button to move to the next step.\
Integrate an AI assistant that provides context-specific cooking tips and answers clarifying questions in real time.\
Conduct testing to ensure the guide is effective and easy to follow.

\
5. CI/CD Pipeline\
Goal: Set up a continuous integration and deployment pipeline to streamline updates and maintenance.\
Priority: Low – Focuses on development and operational efficiency for future iterations.\
Tasks:\
Set up automated testing for frontend and backend.\
Implement a staging environment for testing new features.\
Deploy using a CI/CD tool (e.g., GitHub Actions, Jenkins, GitLab CI/CD).\
Monitor deployments and automate rollback in case of failures.


#### Artifacts

List/describe the artifacts you will produce in order to present your project idea.

 * Artifacts can be text, code, images, videos, interactive mock-ups and/or any other useful artifact you can think of.
 * Make sure to explain the purpose of each artifact (i.e. Why is it on your to-do list? Why is it useful for your team?)
 * Be concise, yet precise.         
   For example: "Build the website" is not precise at all, but "Build a static home page and upload it somewhere, so that it is publicly accessible" is much clearer.

Artifact 1: Develop an interactive Virtual Pantry UI that allows users to add, update, and manage their ingredients, including tracking expiration dates.

Artifact 2: Build an improved meal planning interface with capabilities for adding, modifying, and duplicating weekly meal plans, including detailed calorie and macronutrient breakdowns.

Artifact 3: Develop a step-by-step cooking assistant that offers interactive guidance, voice-activated instructions, and context-specific cooking tips.

Artifact 4: Create a system that automatically generates shopping lists by comparing a user’s Virtual Pantry with their planned meals, highlighting missing or insufficient ingredients.

