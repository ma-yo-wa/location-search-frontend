# Location Search Frontend

## Overview

This project is a React application that provides a user-friendly interface for searching locations based on coordinates or text queries. It integrates with a backend service to fetch location data and displays results on a map using Leaflet.

## Installation

To install and run the application, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ma-yo-wa/location-search-frontend.git
   cd location-search-frontend
   ```

2. **Install Dependencies**:
   Make sure you have Node.js and npm installed. Then, run:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   - Copy the example environment file to create your own `.env` file:
     ```bash
     cp .env.example .env
     ```
   - Open the `.env` file and set the base API URL:
     ```plaintext
     VITE_API_BASE_URL=http://localhost:3000
     ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```

5. **Open Your Browser**:
   - Navigate to `http://localhost:5173` to view the application.

## Approach and Design Decisions

### Architecture
- **React**: The application is built using React, which allows for a component-based architecture, making it easy to manage and reuse UI components.
- **React-Leaflet**: This library is used to integrate Leaflet maps into the application, providing a smooth and interactive mapping experience.
- **Custom Hooks**: The application utilizes custom hooks (e.g., `useLocationSearch`) to manage state and side effects related to location searches, promoting code reusability and separation of concerns.

### Search Functionality
The search functionality supports the following features:
1. **Text Search**: Users can enter a location name to search for corresponding coordinates.
2. **Coordinate Input**: Users can manually enter latitude and longitude to find specific locations.
3. **Current Location**: The application can access the user's current location using the Geolocation API, allowing for quick searches based on the user's position.
4. **Map Integration**: Search results are displayed on a map, with markers indicating the locations. Clicking a marker provides more detailed information about the location.

### Error Handling
- The application includes error handling to manage invalid inputs and display meaningful messages to users when no results are found or when there are issues with fetching data.

## Additional Information
- **Testing**: The application includes unit tests using Vitest to ensure the functionality of components and hooks. You can run the tests using:
   ```bash
   npm run test
   ```
- **Styling**: The application uses Tailwind CSS for styling, providing a responsive and modern design.

## Important Note
Because I am using a free instance on Render.com to deploy, the service will spin down with inactivity, which can delay request on first load by 50 seconds or more.
