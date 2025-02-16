# RecipeConnect by DevourDevs team

 > _Note:_ This document is meant to be written during (or shortly after) your review meeting, which should happen fairly close to the due date.      
 >      
 > _Suggestion:_ Have your review meeting a day or two before the due date. This way you will have some time to go over (and edit) this document, and all team members should have a chance to make their contribution.


## Iteration 01 - Review & Retrospect

 * When: Wednesday, February 12, 2025
 * Where: Online via Zoom

## Process - Reflection

In this review meeting, we reflected on the challenges encountered during the iteration, focusing on our decision-making process and what we have completed, and any improvements that should be made. 

#### Decisions that turned out well

 - <b>Prioritize completing authentication features first </b> (including authController and authMiddleware) as this directly impacts other parts of the app. Features like recipe creation/deletion/editing requires users to be logged in, therefore having authentication completed early ensures that these protected features could be built smoothly.

- <b>Setting up agreements before implementation:</b> Before implementation, we had a shared google docs to align on API endpoints, request and response bodies, database schema, and frontend components. This ensured clarity across the team and prevented misunderstandings.

#### Decisions that did not turn out as well as we hoped

- <b>Unclear division of tasks:</b> While we divided the work clearly among the team, the tasks were not specific enough, leading to overlapping work. We did not specify who was responsible for the frontend or backend tasks, which led to confusion and delays.

- <b>Starting the planning meeting late:</b> We had to start the planning meeting later than anticipated due to schedule conflicts (e.g. midterms), which resulted in less time for features implementation and testing. In the future, we should start planning and divide tasks early.

#### Planned changes
We should start the planning meeting and task division early so that everyone can have more time to work on their tasks.


## Product - Review

#### Goals and/or tasks that were met/completed:

- <b>Complete Authentication Feature (Frontend and Backend):</b> The authentication feature, including login, registration, and user session management, was fully implemented on frontend and backend. Artifacts: Frontend UI components for login/register, backend code for authController and authMiddleware.

- <b>Recipe Management features (Basic backend setup):</b>
The backend files for recipe management was set up, including creating the necessary models, routes, and controllers for recipes.
Artifacts: Backend code for recipe CRUD operations, API routes, database schema setup

- <b>Recipe Display on Homepage (Frontend):</b>
Displaying the list of all recipes from the home page, regardless of user's login status, was implemented.
Artifacts: Frontend code for home page and recipe card


#### Goals and/or tasks that were planned but not met/completed:

- <b>Handling JWT token expiration</b> (by redirecting users to the login page and clearing localStorage)
This task was not completed due to time constraints and the complexity of the tasks. We will continue working on this in the next iteration.

- <b>Frontend Protected Routes:</b> The implementation of protected routes (where logged-in users cannot access /login, /register; and non-login users cannot access the recipe management page through URL or search bar) was not completed. We had to focus on the implementation of our features and integration of backend and frontend. However, we did not get a chance to add protection to different frontend routes. We plan to prioritize this functionality in the next iteration to ensure correct user flow.

- <b>User Dashboard to Manage their Recipes:</b> While we planned to implement a user dashboard where users can manage their recipes, this task was not completed by the review meeting due to time limitations. We wanted to focus on backend implementation of recipe management first. We will continue working on the frontend and integrate with backend APIs.

## Meeting Highlights

Going into the next iteration, our main insights are:

- Prioritize handling token expiration and 401 status. Users should be redirected to the login page when users access protected features but are missing a valid token.

- Prioritize the frontend protected routes based on users’ login status

- Focus more on the frontend and UI of the home page and recipe management page to ensure smooth user experience.

- Focus more on mobile responsiveness and UI improvements.

- Implement the Recipe Search and Filtering functionality on home page since it is one of the core features.

- Ensure early planning meeting to maximize the time working on features
