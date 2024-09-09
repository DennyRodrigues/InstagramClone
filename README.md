# InstagramClone

InstagramClone is a clone of Instagram with some of its core features, built with Spring Boot for the backend and an Expo app for the frontend. 
I built it to keep myself up to date with the expo ecosystem, and to also learn about Spring Boot. 

## Demo

[Watch the demo](https://github.com/user-attachments/assets/938cc508-4daa-4204-8acb-71d9a7cf44d6)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Backend](#running-the-backend)
  - [Running the Expo App](#running-the-expo-app)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Features

Currently, the app contains the following features:

- **Get Posts**: View a feed of posts from users you follow.
- **Create Post**: Upload and share photos with captions.
- **Follow Users**: Follow and unfollow users to see their posts in your feed.
- **Notifications**: Receive notifications for new followers and interactions with your posts.

## Technologies Used

### Backend

- **Spring Boot**: The main framework used to build the backend.
- **Spring Data JPA**: Used for ORM and database interaction.
- **PostgreSQL**: The database.
- **JWT**: Used for user authentication and session management.

### Frontend

- **React Native**: The JavaScript framework used to build the app's user interface.
- **Expo**: The framework used for building the React Native app.
- **TypeScript**: Ensures type safety and improved code quality.

## Getting Started

### Prerequisites

- **Java 17**: Required to run the Spring Boot backend.
- **Node.js**: Required to run the Expo app.
- **PostgreSQL**: Required to run the database.
- **Expo CLI**: For managing and running the Expo app.

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/DennyRodrigues/InstagramClone.git
    cd InstagramClone
    ```

### Running the Backend

1. Set up PostgreSQL database.
2. Configure application properties: Update `src/main/resources/application.properties` with your database credentials.
3. Run the Spring Boot application:

    ```bash
    ./mvnw spring-boot:run
    ```

### Running the Expo App

1. Navigate to the frontend directory:

    ```bash
    cd app
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the Expo app:

    ```bash
    expo start
    ```

4. Run the app on your device:
   - Use the Expo Go app on your phone to scan the QR code displayed in the terminal.

## Project Structure

- **Backend (`/backend`)**: Contains the Spring Boot application code.
- **Frontend (`/app`)**: Contains the Expo and React Native code for the mobile app.


