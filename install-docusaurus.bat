@echo off
echo Installing Docusaurus dependencies...

REM Initialize Docusaurus if not already done
if not exist node_modules (
  echo Installing dependencies...
  npm install
) else (
  echo Dependencies already installed.
)

echo.
echo To start the development server, run:
echo   npm start
echo.
echo The textbook will be available at http://localhost:3000