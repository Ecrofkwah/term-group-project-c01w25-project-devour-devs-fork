# Release Plan

## Release Name: Sprint 4 Demo

---

## Release Objectives

### Specific Goals

**Grocery List Feature:**  
- Allow users to export all ingredients needed for the recipes selected for meals planned.  
- Help users streamline their shopping process by centralizing all required ingredients in one place.  

**Commenting Feature:**  
- Users are able to comment under recipes to increase community interaction.  
- Users can edit and delete their own comments, and view all comments in a clean UI layout.  
- Users can reply to other users' comments under the comment section.  

**Improved UI:**  
- Improve the app’s visual aesthetics for a more appealing and modern user experience.  
- Ensure consistency and responsiveness across devices.  

**Voice Assistant Chat History Integration:**  
- Ensure voice interactions are recorded in the chat history, keeping continuity in AI conversations.  
- Show both transcribed user input and AI responses in the UI.  

---

## Metrics for Measurement

**Grocery List KPI:**  
- Users can successfully export all the ingredients needed for each recipe for meals planned in `.txt` format.  
- The recipe names and ingredients are correctly listed.  
- `.txt` file formatting is readable and consistent.  

**Commenting KPI:**  
- Users can create, edit, delete comments under each recipe.  
- Comments are fetched correctly and displayed under each recipe.  
- Edit/delete visibility is correctly restricted to comment authors.  

**UI Improvement KPI:**  
- Consistent styling across all pages.  
- Improved mobile responsiveness and layout fluidity.  

**Voice Assistant Chat History KPI:**  
- Transcribed voice messages and AI replies are saved and shown in the chat.  
- Chat context is retained for voice-based responses.  

---

## Release Scope

### Included Features

**Grocery List Feature:**  
- “Generate Grocery List” button added to daily meal plan view, accessible only to users who have already created a meal plan.  
- Ingredients exported in a clean `.txt` format for download.  
- Date of the meal planned and ingredients for all the recipes are clearly listed under each recipe name in the `.txt` file.  

**Commenting Feature:**  
- Users can leave comments under any recipe.  
- Comment display UI includes timestamps, usernames, and edit/delete options for authors.  
- Users can also reply to other users who commented under the recipe.  

**Improved UI Feature:**  
- Applied consistent design upgrades using **Bootstrap CSS** for faster, responsive, and standardized styling.  
- Redesigned visual components (buttons, cards, navigation bars) using Bootstrap’s utility classes and layout grid system.  
- Improved mobile responsiveness using Bootstrap's responsive breakpoints and container system.  
- Ensured design consistency across all views (meal planner, recipe pages, comment sections).  

**Voice Assistant Chat History Feature:**  
- Voice input transcriptions and AI responses are saved to chat.  
- Entire voice-based session is viewable alongside text chat.  
- Voice messages help AI retain context for better reply quality.  

---

### Excluded Features

- N/A

---

## Non-Functional Requirements

**Performance:**  
- Grocery list generation < 1 second.  
- Comment loading and posting < 1 second.  
- AI voice response generation and logging < 2 seconds.  

**Security:**  
- Users must log in to access the Grocery List feature, Commenting Feature, and Voice Assistant Chat History Feature.  

**Usability:**  
- Clean and modern UI elements tested across devices.  
- Comments and voice features are easy to locate and intuitive to use.  
- Exported grocery list file is simple, readable, and usable.  

---

## Testing

_Unit and integration testing planned for Sprint 4’s backend features (to be detailed in separate test documentation)._

---

## Dependencies and Limitations

**The AI Step-by-Step Cooking Assistant Chat:**  
- The chat with the AI assistant requires a **5 second cooldown** before another query can be inputted again.  

