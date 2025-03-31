#Recipe Connect/Devour Devs

 > _Note:_ This document is meant to be written during (or shortly after) your initial planning meeting.     
 > It does not really make sense for you to edit this document much (if at all) while working on the project - Instead, at the end of the planning phase, you can refer back to this document and decide which parts of your plan you are happy with and which parts you would like to change.


## Iteration 02

 * Start date: February 23, 2025
 * End date: March 5, 2025

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

1. Filtering system feature\
Goal: Allow users to filter through recipes based on category, dietary preferences, difficulty level, etc. \
Priority: This is the most critical feature of this sprint as it will allow users to effortlessly look up recipes they want which is crucial for other features like the favourites list or meal planner.\
Tasks:\
Design the filtering system UI (dropdowns, checkboxes, tags, etc.).\
Implement backend filtering logic based on selected attributes.\
Ensure filtering works efficiently with large datasets.\
Add a search bar for keyword-based filtering.\
Implement multi-filter selection and ensure results update dynamically.

\
2. Ratings and comments feature\
Goal: Allow users to rate and comment on recipes to provide feedback and engage with the community.\
Priority: High – enhances community engagement and helps users make informed decisions.\
Tasks:\
Design and integrate a star-rating system (1-5 stars).\
Enable users to leave text-based comments on recipes.\
Implement backend logic for storing and retrieving ratings/comments.\
Ensure users can edit and delete their own comments.\
Display average rating and total number of reviews for each recipe.

\
3. Leftover meal suggestions feature\
Goal: Suggest recipes based on available leftover ingredients to minimize food waste.\
Priority: Medium – useful but not as critical as filtering or engagement features.\
Tasks:\
Create an input system for users to enter available ingredients.\
Develop an algorithm that matches ingredients to existing recipes.\
Implement a ranking system to prioritize best matches.\
Allow users to refine results (e.g., exclude certain ingredients).\
Test for accuracy and edge cases (e.g., rare ingredients).

\
4. Meal planning feature\
Goal: Allow users to create, view, and manage their weekly meal plans.\
Priority: Medium-High – enhances user experience and long-term engagement.\
Tasks:\
Design the UI for meal planning.\
Enable users to add recipes to specific days.\
Implement a backend system for storing and retrieving meal plans.

\
5. Favourites list feature\
Goal: Let users save recipes to a favorites list for easy access.\
Priority: Medium – supports user convenience.\
Tasks:\
Implement a “Save to Favorites” button on recipe pages.\
Create a dedicated favorites page for saved recipes.

\
6. Transcript-to-voice and vice versa for future AI chatbot implementation\
Goal: Develop a speech-to-text and text-to-speech system to assist with accessibility and future AI features.\
Priority: Low for this sprint, but foundational for future iterations.\
Tasks:\
Research and select a speech-to-text API.\
Research and select a text-to-speech API.\
Implement a basic prototype to convert text-based recipes into audio.\
Test accuracy and usability with different accents and speech patterns.

#### Artifacts

List/describe the artifacts you will produce in order to present your project idea.

 * Artifacts can be text, code, images, videos, interactive mock-ups and/or any other useful artifact you can think of.
 * Make sure to explain the purpose of each artifact (i.e. Why is it on your to-do list? Why is it useful for your team?)
 * Be concise, yet precise.         
   For example: "Build the website" is not precise at all, but "Build a static home page and upload it somewhere, so that it is publicly accessible" is much clearer.

Artifact 1: Build the favourites page for logged in users, so they can save recipes to easily access whenever they want.

Artifact 2: Build the filtering system for all users, so users can easily find the recipes they’re looking for.

Artifact 3: Build the leftover suggestions system for all users, so their food doesn’t go to waste.

Artifact 4: Build the meal planner tab for logged in users, so they can create, view, and manage weekly meal plans.

Artifact 5: Implement a rating system in which logged in can leave comments/ratings, and all users can view comments/ratings, so people know which recipes are good.

Artifact 6: Implement a transcript-to-voice and vice versa feature to build the foundation for a future AI chatbot feature.
