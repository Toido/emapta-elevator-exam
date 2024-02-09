# Elevator system application

This project is an application that displays a simple view of elevators that is automatically called. When called, it will then load the passengers, go to the floor of its destination, and unload the passengers when arriving at the destination floor.

## Project structure

- src - Application source code
  - view - Higher-level components or page components that represent different views or pages of the application
  - components - JSX elements that are reusable and application-specific
  - types - Shared TypeScript types

## Features

- **Elevator System:** Manages the logic for elevator system.
- **Elevator:** Displays the detail of a an elevator's floor and passenger.

## Requirements

- Node.js (v14.0.0 or higher)
- npm

## Usage

1. Clone this repo
2. `npm install` to install dependencies

### Develop

1. `npm run dev` to run a local development server and view in the browser
2. Open your browser and visit http://localhost:5173 to view the application

### Test

1. `npm run test` to run unit tests

### Build

1. `npm run build` to build the application for production
