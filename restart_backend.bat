@echo off
echo ========================================
echo Restarting Backend Server
echo ========================================
echo.

echo Killing any process on port 5000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000') do taskkill /F /PID %%a 2>nul

echo.
echo Starting Flask backend...
cd backend
start "Flask Backend" cmd /k "python app.py"

echo.
echo ========================================
echo Backend restarted!
echo Check the new window for Flask output
echo ========================================
pause
