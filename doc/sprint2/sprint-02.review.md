# DEVOUR DEVS/RECIPECONNECT

## Iteration 02 - Review & Retrospect

 * When: Wednesday, March 5, 2024
 * Where: Online via Zoom
 * Participants: Michael, Ivy, Daniyal, Kushal, William

## Process - Reflection

In this meeting we discussed the strategies that worked, the ones that didn’t, and how to move forward efficiently for the next few weeks to successfully complete our project.

#### Decisions that turned out well

- Shifting our focus to unique and higher-level features and away from CRUD:
  - For this sprint, we replaced a lot of our userstories/planned features by simply using the Spoonacular API, which is going great so far.
  - As a result, we will be able to focus in more impressive features for our next sprint now that most of the CRUD features covered by the API.
- Breaking down the userstories/tasks into subtasks:
  - Previously, our userstories were much more abstract, including features that in reality were combinations of many smaller features.
  - By dividing our userstories into clear smaller tasks, there was less ambiguity for what exactly needed to be done in order to accomplish a feature, and tasks were easier to divide.
  - Thus, we could focus on developing the actual features instead of trying to sort out our organizational issues.
- Clearly dividing the tasks between each member of the team:
  - Last sprint, we had three people working on the same (large, not-broken-down) userstory together. As a result, there was confusion on how exactly to divide the subtasks and there was some overlapping of work between members.
  - This sprint, we assigned only one member to each task clearly so there would be no confusion or overlap. This resulted in much more efficient work.

#### Decisions that did not turn out as well as we hoped

- We casually assigned story points to each userstory, not focusing on it during our meeting:
  - As we distributed the points a few days into the concurrent sprint, the burndown chart did not function properly.
  - We also did not put much thought into assigning points, so our idea of how long it would take to complete each feature was not accurate and as a result we didn't complete some of the userstories. As an example, the userstory "As a user, I want a “Meal Planner” tab so that I can create, view, and manage my weekly meal plans." was assigned a story point estimate of 2, after working on it we realized a more accurate estimate would be 4. This will be addressed in the next sprint.
- We also lacked a clear understanding of our project flow.
  - For example, in this sprint, we assigned the user story: “As a user, I want to be able to talk to my AI assistant so it can help me without manually typing,” without realizing that it depended on completing the user story: “As a beginner cook, I want step-by-step guidance or an AI assistant to help me learn how to cook.”
- Shorter meetings:
  - The meetings we held this week were shorter due to the tight schedules of each team member
  - As a result, the communication between team members was weaker than in the previous sprint and some clarifications were needed for certain tasks

#### Planned changes
- In the future, we will meet together and discuss userstory point distribution thoroughly. As a result we can have a better understanding of the work required and other useful information such as team velocity.

## Product - Review

#### Goals and/or tasks that were met/completed:

- Integrating the Spoonacular API into our code + filtering search feature:
  - Using an API was not part of the original iteration plan
  - userstories involved: As a user, I want a filtering system that allows me to search recipes based on specific attributes (e.g., cuisine, dietary preferences, cravings, difficulty level) so that I can narrow down my options effectively.
    - We only needed to implement the frontend as the backend is an API call to Spoonacular

- Demo of WhisperAI
  - Showed and implemented a starting point for how we could potentially implement the voice assistant
  - substory of the userstory: As a user, I want to be able to talk to my AI assistant so it can help me without manually typing
  
- Implementing a rating system
  - Each user can rate any recipes, view their rating, and change their rating. average recipe rating and total ratings is available on the meal card
  - userstories involved: As a user, I want to rate and posted recipes so that I can provide feedback and engage with the community.

- Adding recipes to favourites and viewing a list of favourites
  - After opening a recipe page, the user can add it to favourites
  - The user can view a list of all their favourite recipes
  - userstories involved: As a user, I want the ability to save recipes to a favorites list so that I can easily access the recipes I love without searching again.

#### Goals and/or tasks that were planned but not met/completed:
- Implementing conversation with an AI voice assistant
  - Only partially completed
  - Reasons it was not completed:
    - Busy with exams
    - Very heavy task that was difficult to complete in the given sprint timeline, we weren't expecting to finish it by this sprint
    - We spent extra time to pivot to Spoonacular, scrapping our current framework
    - The voice-based AI assistant required us to first implement a text-based AI assistant so it had to be put on hold
  - Upon reflection, perhaps we could have only assigned small broken-down sub-stories of this userstory
  - userstories involved: As a user, I want to be able to talk to my AI assistant so it can help me without manually typing

- Adding the meal planner:
  - Only partially completed
  - Reasons it was not completed:
    - Busy with exams during this sprint
    - Somewhat large task that couldn't be finished quickly
    - We spent extra time to pivot to Spoonacular, scrapping our current framework
  - userstories involved: As a user, I want a “Meal Planner” tab so that I can create, view, and manage my weekly meal plans.

## Meeting Highlights

Going into the next iteration, our main insights are:
- We should aim to complete various high-level features to develop our product further
  - Specifically implement the AI voice assistant
- Thoroughly assess userstory point assignments
- Fully implement the meal planner
