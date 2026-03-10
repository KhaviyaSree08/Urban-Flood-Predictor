@echo off
cls
echo ========================================
echo   AI FLOOD PREDICTION SYSTEM
echo   Starting Application...
echo ========================================
echo.

echo [1/2] Starting Backend Server...
echo.
cd backend
start "Backend Server - Port 5000" cmd /k "python app_minimal.py"
echo Backend starting in new window...
timeout /t 3 /nobreak >nul

echo.
echo [2/2] Starting Frontend Server...
echo.
cd ..\frontend
start "Frontend Server - Port 3000" cmd /k "npm start"
echo Frontend starting in new window...

echo.
echo ========================================
echo   APPLICATION STARTING!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Wait for both servers to start...
echo Browser will open automatically.
echo.
echo ========================================
pause
