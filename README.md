# Todo List Application

This project is a technical test implementation of a Todo List application. It includes a frontend built with React and
a backend built with Express, using Redux Toolkit for state management and MongoDB for data persistence. The application
is containerized using Docker Compose.

## Prerequisites

- Docker and Docker Compose installed on your machine.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/0grre/ikomobi-test-technique-jbloup.git
    cd ikomobi-test-technique-jbloup
    ```

2. Copy the example environment file to `.env`:

    ```bash
    cp .env.example .env
    ```

## Running the application

1. In the project root directory, start the application with Docker Compose:

    ```bash
    docker-compose up -d
    ```

   The `-d` flag runs the containers in detached mode.

2. The React frontend will be available at `http://localhost:3000`, and the Express backend API will be available
   at `http://localhost:8000`.

## Stopping the application

To stop the application, run:

```bash
docker-compose down
```
