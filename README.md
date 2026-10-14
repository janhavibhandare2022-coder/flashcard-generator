Flashcard Generator App 🗂️
A modern, responsive Single Page Application (SPA) built as an AlmaBetter Frontend Capstone Project. It enables users to create customizable flashcard sets, study them through an interactive carousel, persist cards locally, share decks via direct links, export them to JSON, and print study materials.
🔗 Project Links
Live Application URL: https://flashcard-generator-woad-sigma.vercel.app
GitHub Repository: https://github.com/janhavibhandare2022-coder/flashcard-generator
📋 Features & Implementation (Per AlmaBetter Guidelines)
1. Create Flashcard Page
Group Creation: Group Name (Title), Description, and optional Group Image upload.
Dynamic Terms Array: Add multiple terms and definitions dynamically using Formik's FieldArray.
Term Actions: Individual terms can be deleted using the trash icon or edited before group creation.
Client-Side Validation: Form inputs validated strictly using Formik and Yup.
2. My Flashcards Page
Overview Dashboard: Grid view displaying all created flashcard decks.
Metadata Display: Shows thumbnail, title, short description, and total card counts.
Quick Actions: Navigate to any deck via the View Cards button or delete decks from storage.
3. Flashcard Details / Study Mode
Split Layout: Sidebar list of terms on the left; active term details and definition in the center.
Interactive Carousel: Previous and Next arrow navigation with a positional indicator (e.g., 1 / 2).
Share Modal: Share deck modal with one-click clipboard link copying and direct social share actions.
Export & Print:
Download: Exports the current flashcard group to a structured .json file.
Print: Clean print-optimized document view for study sheets.
4. Architecture & Persistence
State Management: Centralized state with Redux Toolkit.
Data Persistence: Synchronized with the browser's LocalStorage API so cards are retained across refreshes and restarts.
SPA Routing & Deep Links: react-router-dom integrated with vercel.json rewrites to prevent 404 errors on direct navigation or page refresh.
🛠️ Tech Stack & Packages
React.js (Frontend library)
React Router DOM (Single Page Application routing)
Redux Toolkit & React-Redux (Global state management)
Formik & Yup (Form management and validation)
Tailwind CSS (Responsive UI styling)
React Icons (Interface icons)
Vercel (Cloud hosting and continuous deployment)
💻 Local Setup & Installation
To run this application locally:
1. Clone the repository:git clone https://github.com/janhavibhandare2022-coder/flashcard-generator.git
cd flashcard-generator

2. Install all dependencies:npm install
3. Run the local development server npm start

Open http://localhost:3000 in your browser.

Author
Janhavi Bhandare
GitHub:@janhavibhandare2022-coder