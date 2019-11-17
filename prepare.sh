#!/bin/bash
echo "start prepare script"
echo "-- load dependencies and write dependencies.json"
node dependencies.js
echo "-- run build process"
npm run build
echo "-- cleanup fonts"
rm -rf www/static/fonts/
mv fonts www/static/
echo "end prepare script"
echo "for runnning it on android run: cordova run android"