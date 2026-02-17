#!/bin/bash

# Simple script to run a local web server for testing
echo "Starting local web server..."
echo "Dashboard will be available at: http://localhost:8000"
echo "Press Ctrl+C to stop the server"
echo ""

python3 -m http.server 8000
