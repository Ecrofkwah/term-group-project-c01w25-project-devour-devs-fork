# Release Plan


Release Name: Sprint 1 Demo


## Release Objectives
### Specific Goals:
- <b>User Authentication:</b>
  - Implement a secure user registration, login and logout functionality.
  - JWT will be used for session management, tokens will be stored in browser’s local storage
  - Only logged in users can access protected routes such as creating, edition and deleting recipes
- <b>Recipe Browsing:</b>
  - Provide a homepage where all users (logged in or not)  can view all recipes
  - Logged in users will have the ability to view the page that enables create, edit and delete their own recipes
- <b>Recipe Management (for Logged in users)</b>
  - Enable logged-in users to create, edit and delete recipes, that includes name, ingredients and instructions.


### Metrics for Measurement:
- <b>User Authentication KPI:</b>
  - Number of successful user registration
  - Login success rate
- <b>Recipe Browsing KPI:</b>
  - User able to view and navigate to pages that is only accessible by them depending on if they are logged in or not
- <b> Recipe Management KPI:</b>
  - Logged in users are able to create, edit and delete as many recipes as they want


## Release Scope
### Included Features:


- <b>User Registration:</b>
  - Users can create account by providing a unique username, name and password
  - Registered users can log in using their credentials and receive a JWT token to keep track of their login status
  - Users can logout, which will invalidate their JWT token and clear their session.


- <b>Recipe Browsing:</b>
  - All users, whether logged in or not can browse recipe displayed on home page
  - Recipe details are accessible to everyone
  - Logged-in users will see more options on the navigation bar


- <b>Recipe Management:</b>
  - Logged in users can:
    - Create new recipes
    - Edit their own recipes
    - Delete their own recipes
  - Recipe management features will be accessible to logged in users only, and they are verified by JWT tokens


### Excluded Features:
Handling JWT token expiration, including redirecting users to the login page and clearing localStorage, could not be completed due to time constraints and the complexity of the tasks. As a result, this feature may not be included in the current release. We plan to continue working on it in the next iteration.


### Bug Fixes:
None


### Non-Functional Requirements:
- <b>Security Requirements:</b>
  - Passwords should not be stored in plain text. It must be hashed before saving to the database
  - Only authenticated users (with valid JWT tokens) should be allowed to access protected routes (e.g. recipe creation/deletion/editing)
  - There should be a logout functionality that clears the token from localStorage
- <b>Usability Requirements:</b>
  - The web app should be responsive and works well on both desktop and mobile devices
  - Clear navigation should be provided
  - The app should provide a clear error messages if something goes wrong
### Dependencies and Limitations:
- Dependencies:
  - The main dependencies required for the project are listed in the `package.json` file.
  - External dependencies includes google fonts: https://fonts.google.com/
- Limitations:
  - Token Expiration Handling: There is no automatic token renewal or refresh token mechanism. Once the JWT token expires, users are logged out and must manually log in again. This can disrupt user experience
  - Email verification: The current registration process does not involve an email verification step. Users can register and login without confirming their email addresses. This could lead to users registering with fake or incorrect email addresses.





