@echo off
echo Starting AI Urban Flood Prediction System...
echo.

start "Flask Backend" cmd /k "cd backend && python app.py"
timeout /t 3 /nobreak > nul

start "React Frontend" cmd /k "cd frontend && npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
