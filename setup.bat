@echo off
echo ========================================
echo AI Urban Flood Prediction System Setup
echo ========================================
echo.

echo [1/4] Setting up Backend...
cd backend
echo Installing Python dependencies...
pip install -r requirements.txt
echo.

echo [2/4] Training ML Model...
python train_model.py
echo.

echo [3/4] Setting up Frontend...
cd ..\frontend
echo Installing Node dependencies...
call npm install
echo.

echo [4/4] Setup Complete!
echo.
echo ========================================
echo To start the application:
echo 1. Backend: cd backend && python app.py
echo 2. Frontend: cd frontend && npm start
echo ========================================
pause
