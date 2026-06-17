# ISMO PM System - Frontend

This is the frontend component of the ISMO Project Management System. It is built using modern web technologies to provide a fast, responsive, and beautiful user experience.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 (Glassmorphism design system)
- **Icons**: Lucide React
- **API Client**: Axios

---

## Local Development Setup

To run the frontend locally, you must have the backend server running simultaneously.

### 1. Install Dependencies
Make sure you are in the `frontend` directory, then run:
```bash
npm install
```

### 2. Environment Variables
By default, the frontend is configured to communicate with the local backend running on `http://localhost:5000/api`. 

If your backend is hosted somewhere else (e.g., during production deployment), you can create a `.env.local` file in this directory:
```env
NEXT_PUBLIC_API_URL="https://your-production-backend-url.com/api"
```

### 3. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. The page will auto-update as you edit the files.

---

## Docker Setup

If you prefer using Docker, this frontend is equipped with a highly optimized, multi-stage Dockerfile that runs Next.js in `standalone` mode.

To build and run just the frontend via Docker:
```bash
docker build -t ismo-frontend .
docker run -p 3000:3000 ismo-frontend
```

*(Note: It is highly recommended to run the full stack using `docker-compose up --build` from the root directory instead of running containers individually).*

---

## Deployment (Vercel)

The easiest way to deploy this application is using **Vercel**:
1. Push your code to GitHub.
2. Import the project in Vercel.
3. Set the **Root Directory** to `frontend`.
4. Add the `NEXT_PUBLIC_API_URL` environment variable pointing to your deployed backend.
5. Click **Deploy**.
