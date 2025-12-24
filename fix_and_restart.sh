#!/bin/bash

echo "Stopping all running dev servers..."
# This assumes you are running the dev server in the current terminal or you can manually stop them

echo "Deleting node_modules and package-lock.json..."
rm -rf node_modules package-lock.json

echo "Installing dependencies..."
npm install

echo "Starting Vite dev server..."
npm run dev
