@echo off
echo Starting local server at http://localhost:8000
echo Press Ctrl+C to stop the server
py -m http.server 8000
pause
