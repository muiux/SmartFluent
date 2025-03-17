# SmartFluent - Website Traffic Tracker

This project is a website traffic tracker that allows for the tracking and analysis of visitor data. To make the testing process easier, the project is set up on a VPS server.

## Project Overview

The system consists of the following parts:

1. **Standalone Test Project (Customer Side Simulation):**  
   URL: [http://172.86.112.235:3000](http://172.86.112.235:3000)  
   This is a standalone test project where visitors can navigate through different pages. Each time a visitor navigates to another page, the `tracker.ts` file sends the visitor's information to the backend.

2. **Backend (Tracking and Data Storage):**  
   URL: [http://172.86.112.235:5000](http://172.86.112.235:5000)  
   The backend processes the data received from the test project, tracks the visitor's information, and stores it in a MySQL database.

3. **Admin Panel (Traffic History & Anomaly Detection):**  
   URL: [http://172.86.112.235:5173](http://172.86.112.235:5173)  
   The admin side provides an interface for reviewing traffic history, visualizing visitor data, and detecting anomalies in the traffic patterns (e.g., unusual spikes, potential bot activity).

### How It Works

- Visit [http://172.86.112.235:3000](http://172.86.112.235:3000) to interact with the test project and simulate visitor traffic.
- Every navigation on the test project sends visitor data to the backend at [http://172.86.112.235:5000](http://172.86.112.235:5000).
- The backend tracks and stores this data in the MySQL database.
- On the admin side, visit [http://172.86.112.235:5173](http://172.86.112.235:5173) to view the traffic history and detect anomalies in the visitor patterns.

## Schema Overview

The MySQL database is structured as follows:

```
CREATE TABLE Visit (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    ipAddress  VARCHAR(45) NOT NULL,
    pageUrl    TEXT NOT NULL,
    visitDate  DATETIME DEFAULT CURRENT_TIMESTAMP,
    referrer   TEXT NULL,
    userAgent  TEXT NULL
);
```

### Schema Explanation

- `id` (`INT AUTO_INCREMENT PRIMARY KEY`) – Unique identifier for each visit.
- `ipAddress` (`VARCHAR(45) NOT NULL`) – Stores the visitor’s IP address (supports IPv6).
- `pageUrl` (`TEXT NOT NULL`) – The URL of the visited page.
- `visitDate` (`DATETIME DEFAULT CURRENT_TIMESTAMP`) – Timestamp of the visit.
- `referrer` (`TEXT NULL`) – Referring URL, if available.
- `userAgent` (`TEXT NULL`) – The visitor’s browser user-agent string.

### Summary

- **Standalone Test Project (Customer Side Simulation):** [http://172.86.112.235:3000](http://172.86.112.235:3000)
- **Backend (Tracking and Data Storage):** [http://172.86.112.235:5000](http://172.86.112.235:5000)
- **Admin Panel:** [http://172.86.112.235:5173](http://172.86.112.235:5173)

This setup allows for easy testing and provides a clear way to monitor website traffic and anomalies.
