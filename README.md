# GoPratle: Requirement Posting Flow

A fully-typed, modern web application designed for seamlessly capturing and posting detailed event-based requirements. 

This repository contains both a **Next.js frontend** and an **Express.js backend** connected to a **MongoDB** database. The platform uses a streamlined multi-step architecture to adapt requirement fields based on specific categories (Event Planner, Performer, and Crew) and safely store them.

---

## 🏗 System Architecture & Flow

1. **Frontend (Next.js & TypeScript)**  
   Features a glassmorphism-inspired UI with a responsive, dynamic multi-step form.
   - **Step 1:** Captures *Event Basics* (Name, Event Type, Dates, Location, Venue, and Category Selection).
   - **Step 2:** Adapts implicitly to request *Category-Specific Fields* based on the prior selection (e.g., Budgets, Relevant Expertise, Crew Roles, or Required Equipments).
   - **Submission:** Uses Axios inside an encapsulated global React Context (`ApiContext.tsx`) to handle network latency and submit sanitized payloads exactly formatted to strict TypeScript definitions.

2. **Backend (Node.js, Express & TypeScript)**  
   Provides a robust, type-checked REST API framework parsing and validating inbound properties.
   - Endpoint `/api/requirements` maps cleanly decoded objects into explicit database boundaries.
   - Ensures any null or unmatched structures are safely dropped or flagged.

3. **Database (MongoDB)**  
   Mongoose applies the final explicit strict-schema validation against the incoming document layout, ensuring objects strictly live inside their respective namespaces (`plannerDetails`, `performerDetails`, or `crewDetails`) without bloating a generic column.

---

## 🚀 Running the Project Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/en/) (v16+) and npm installed on your machine.

### 1. Setup the Backend
The backend runs on **Port 8080**.

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Ensure you have a `.env` file inside the `/backend` folder with the following keys:
   ```env
   PORT=8080
   MONGO_URI=your_mongodb_connection_string
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *Note: Ensure the terminal outputs `Server running on port 8080` and `MongoDB Connected`.*

### 2. Setup the Frontend
The frontend runs on **Port 3000** and is configured to seamlessly tunnel HTTP calls to your local `8080` backend.

1. Open a **new terminal window** and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install frontend frameworks and dependencies:
   ```bash
   npm install
   ```
3. Boot up the Next.js development server:
   ```bash
   npm run dev
   ```

### 3. Usage
- Open your browser and navigate to exactly `http://localhost:3000`.
- Fill out the Event Basics.
- Confirm your specialized parameters on the adapted Step 2 segment.
- Check MongoDB Compass or Atlas directly to see your new requirement systematically slotted into its respective category detail hierarchy!
