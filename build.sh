#!/bin/bash

# Stop script when an error occurs
set -e

echo "Removing old build files..."
[ -d dist ] && rm -rf dist
[ -f ./app.zip ] && rm ./app.zip

echo "Installing dependencies..."
npm install

echo "Building the project..."
npm run build

echo "Installing production dependencies..."
npm install --prod

echo "Removing uncessessary files from node_modules..."
#[ -d node_modules/.bin ] && rm -rf node_modules/.bin
#[ -d node_modules/.pnpm ] && rm -rf node_modules/.pnpm

echo "Moving files needed to build success..."
cp -R node_modules ./dist

echo "Zipping bundled files..."
cd dist
zip -r -y -9 ../app.zip .

echo "Build completed! Have fun!"
