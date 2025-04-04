#Recipe Connect/Devour Devs

 > _Note:_ This document is meant to be written during (or shortly after) your initial planning meeting.     
 > It does not really make sense for you to edit this document much (if at all) while working on the project - Instead, at the end of the planning phase, you can refer back to this document and decide which parts of your plan you are happy with and which parts you would like to change.


## Iteration 04

 * Start date: March 26, 2025
 * End date: April 2, 2025

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

1. Grocery List\
Goal: Allow users to export the ingredients of a particular recipe or meal plan to a grocery list. \
Priority: Medium – Streamlines meal preparation by making the grocery shopping process easier.\
Tasks:\
Implement a “Generate Grocery List” button within the meal planner for a selected day.\
Ensure that clicking the button exports a .txt file containing the required ingredients for all recipes in that day’s plan.

\
2. Commenting\
Goal: Enable users to create, view, and manage comments under recipe details.\
Priority: Medium – Enhances engagement by allowing users to interact with the community and share their thoughts.\
Tasks:\
Implement a commenting feature that allows users to leave comments under recipe details.\
Design a UI component for displaying existing comments in a clear and structured format.\
Add functionality for users to edit and delete their own comments.\
Ensure that comments are stored and retrieved efficiently for smooth performance.

\
3.Improved UI\
Goal: Improve the UI so it is visually appealing to users.\
Priority: Low - Does not add to functionality, but makes the user experience better.\
Tasks:\
Review and analyze current UI elements to identify areas for aesthetic improvement.\
Redesign key visual components (icons, typography, color schemes) to create a modern and cohesive look.\
Ensure the new design is responsive and maintains visual appeal across different devices and screen sizes.

\
4. Testing\
Goal: Add unit tests for backend controllers and integration tests.\
Priority: High - The test cases will limit the number of bugs in our application, ensuring our application remains robust.\
Tasks:\
Review backend controllers and key integration points to determine which parts require thorough testing.\
Write unit tests for each controller using appropriate testing frameworks to verify core functionalities, error handling, and input validation.\
Build integration tests to validate end-to-end interactions between different components of the application.

\
5.Voice Assistant Chat History Integration\ 
Goal: Enable seamless integration of voice interactions with the chat history so that every user-initiated voice input and corresponding voice assistant response is recorded and displayed in the AI chat, ensuring context continuity for more informed responses.\
Priority: High – Maintaining a complete and accurate chat history is critical for context-aware interactions and significantly enhances the overall user experience.\
Tasks:\
Ensure that both the transcribed user message and the voice assistant’s generated response are appended to the existing chat history.\
Integrate the full chat history into the voice assistant’s context during response generation to improve accuracy and relevance.\
Update the chat interface to clearly display voice interactions alongside text messages, maintaining a consistent conversation flow.

#### Artifacts

List/describe the artifacts you will produce in order to present your project idea.

 * Artifacts can be text, code, images, videos, interactive mock-ups and/or any other useful artifact you can think of.
 * Make sure to explain the purpose of each artifact (i.e. Why is it on your to-do list? Why is it useful for your team?)
 * Be concise, yet precise.         
   For example: "Build the website" is not precise at all, but "Build a static home page and upload it somewhere, so that it is publicly accessible" is much clearer.

Artifact 1: Develop a grocery list export feature that offers users the ability to export the ingredients of their favourite recipes to a grocery list.

Artifact 2: Build a comment section under each recipe so users can interact with one another, and share their thoughts.

Artifact 3: Develop a more visually appealing and user friendly UI to further enhance the user experience.
