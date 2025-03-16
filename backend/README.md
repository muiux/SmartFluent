# SmartFluent Backend

This is the backend for the SmartFluent project, built with TypeScript, Node.js, Express, Prisma (for ORM), and MySQL as the database. It also integrates TensorFlow.js for anomaly detection in AI features.

## Prerequisites

Make sure you have the following installed:

- Node.js (version 18 or higher)
- Python (version 3.10 or higher)
- npm (Node package manager)
- MySQL (with XAMPP or any other MySQL server setup)
- Visual Studio Build Tools (for building native dependencies)

## Setup

### Clone the repository:

```bash
git clone git@github.com:muiux/SmartFluent.git
```

### Navigate to the backend folder:

```bash
cd ./backend
```

### Install dependencies:

```bash
npm install
```

### Create a `.env` file:

Copy the content of `.env.example` into a new `.env` file. Change the content according to your MySQL configuration.

### Run Prisma migrations:

```bash
npx prisma migrate dev --name init
```

### Generate Prisma client:

```bash
npx prisma generate
```

### Optional: Open Prisma Studio to view the database tables:

```bash
npx prisma studio
```

### Start the server:

```bash
npm run start
```

If you face a dlopen_failed error, follow the solution in this https://stackoverflow.com/a/78195343

## Running the Backend

The backend is running at: http://172.86.112.235:5000