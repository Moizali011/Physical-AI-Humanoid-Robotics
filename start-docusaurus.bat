@echo off
echo Starting Docusaurus development server...

REM Check if node_modules exists
if not exist node_modules (
  echo Error: node_modules not found. Please run 'npm install' first.
  echo You can run 'install-docusaurus.bat' to install dependencies.
  pause
  exit /b 1
)

echo.
echo Starting the development server...
echo The textbook will be available at http://localhost:3003
echo Press Ctrl+C to stop the server.
echo.

npm run start