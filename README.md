# Event App

This is a frontend-only event management application built using React. The app allows users to create events, store event data in local storage, resize images using the Canvas API, and generate thumbnails for uploaded videos. The project utilizes modern UI libraries and markdown rendering for a seamless user experience.

## Features
- Event creation with image resizing (4:5 aspect ratio) using the Canvas API
- Video uploads with automatic thumbnail generation
- Data persistence using localStorage
- Rich text editing with React Quill
- Markdown rendering using markdown-to-jsx
- UI styled with Tailwind CSS and ShadCN

## Technologies Used
- **React** – For building the UI
- **ShadCN** – For enhanced UI components
- **Tailwind CSS** – For styling
- **React Quill** – For rich text editing
- **markdown-to-jsx** – For rendering markdown content

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/LakshayBabbar/Assignment-Event.git
   cd events-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## Usage
1. Fill out the event creation form.
2. Upload an image (it will be resized to a 4:5 ratio automatically).
3. Upload a video (a thumbnail will be displayed in the form).
4. Submit the form to save the event data in local storage.
5. View and manage events in the app.

## Folder Structure
```
/event-app
├── src
│   ├── components   # Reusable UI components
│   ├── pages        # Application pages
│   ├── utils        # Utility functions (image resizing, video thumbnail generation)
│   ├── globals.css  # Global styles
│   ├── App.js       # Main app component
│   ├── main.js      # Entry point & Routes Declarations
├── public           # Static assets
├── package.json     # Dependencies and scripts
├── README.md        # Project documentation
```