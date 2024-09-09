# InstagraClone

InstagramClone is clone of Instagram with some of it's features implemented, built with Spring Boot for the backend and an Expo app for the frontend. The application supports core features like posting photos, following users, and receiving notifications.

Table of Contents
Features

Technologies Used

Getting Started

  - Prerequisites

  - Installation

  - Running the Backend

  - Running the Expo App

Project Structure

API Documentation

Contributing

License

Features
Currently the app contains the following features:

Get Posts: View a feed of posts from users you follow.

Create Post: Upload and share photos with captions.

Follow Users: Follow and unfollow users to see their posts in your feed.

Notifications: Receive notifications for new followers and interactions with your posts.

Technologies Used
Backend
Spring Boot: The main framework used to build the backend.

Spring Data JPA: Used for ORM and database interaction.

PostgreSQL: The database.

JWT: Used for user authentication and session management.

Frontend
React Native: The JavaScript framework used to build the app's user interface.

Expo: The framework used for building the React native app

TypeScript: Ensures type safety and improved code quality.

Getting Started
Prerequisites
Java 17: Required to run the Spring Boot backend.

Node.js: Required for running the Expo app.

PostgreSQL: Required to run the database.

Expo CLI: For managing and running the Expo app.

Installation
Clone the repository:
    ```bash

    git clone https://github.com/DennyRodrigues/InstagramClone.git

    cd InstagramClone

    ```

Running the Backend
Set up PostgreSQL database:

Configure application properties: Update src/main/resources/application.properties with your database credentials.

Run the Spring Boot application:

    ```bash

    ./mvnw spring-boot:run

    ```

Running the Expo App
Navigate to the frontend directory:
    ```bash

    cd app

    ```

Install dependencies:
    ```bash

    npm install

    ```

Start the Expo app:
    ```bash

    expo start

    ```

Run the app on your device:
    - Use the Expo Go app on your phone to scan the QR code displayed in the terminal.

Project Structure
Backend (/backend): Contains the Spring Boot application code.

Frontend (/app): Contains the Expo app code.

API Documentation
The backend API documentation can be accessed at /swagger-ui.html when the server is running.
