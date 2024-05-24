@echo off
cd ./tec-rom-sistema-frontend && start npm run dev
timeout /t 2
cd ../tec-rom-sistema-backend && start python main.py
timeout /t 2
start "" "http://localhost:5173"