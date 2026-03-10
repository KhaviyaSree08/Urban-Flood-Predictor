@echo off
cls
echo ========================================
echo STARTING BACKEND - MINIMAL VERSION
echo ========================================
echo.
echo Killing any process on port 5000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000') do taskkill /F /PID %%a 2>nul
echo.
echo Starting Flask on port 5000...
echo.
cd backend
python app_minimal.py
pause
