# Docker Communication Fix Guide

The issue was that `localhost` in the frontend container referred to itself, not the backend. We have updated the configuration to use the Docker service name `backend`.

## 🛠 Fixes Applied
1. **Frontend `.env`**: Created `frontend/.env` with `VITE_API_URL=http://backend:5000/api`.
2. **App.jsx**: Updated to use `import.meta.env.VITE_API_URL` without a hardcoded fallback.
3. **Docker Compose**: Updated the `frontend` environment variable to use the service name.

## 🔄 Rebuild Instructions
Run the following commands in the root directory to apply changes:

```bash
# Stop and remove old containers
docker-compose down

# Rebuild and start in detached mode
docker-compose up --build -d
```

## ✅ Verification Steps
1. **Check Containers**: Ensure all three containers are running:
   ```bash
   docker ps
   ```
2. **Access Frontend**: Open `http://localhost:3000` in your browser.
3. **Test CRUD**:
   - Add a new task (e.g., "Docker Fix Test").
   - Refresh the page to ensure the task persists (confirms MongoDB storage).
   - Delete the task to confirm full CRUD functionality.
4. **Check Logs**: If it fails, check the backend logs:
   ```bash
   docker-compose logs backend
   ```

## ⚠️ Important Note on Browser Context
Since React runs in your **browser** (on your host machine), `http://backend:5000/api` will only work if your browser can resolve the name `backend`. 

**For Local Development:**
If you are accessing the app from your host browser, you should actually keep the URL as `http://localhost:5000/api` because the browser is outside the Docker network.

**When to use `http://backend:5000/api`?**
- When using a **Reverse Proxy** (like Nginx) inside Docker to route traffic.
- When the frontend is being **Server-Side Rendered (SSR)**.

**Recommended Production Approach:**
Use a relative path `/api` in your code and configure Nginx to proxy `/api` requests to `http://backend:5000/api`. This works in both local and EKS environments.
