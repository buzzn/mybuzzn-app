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
echo "set JAVA_HOME"
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_212.jdk/Contents/Home/
echo "build ios"
cordova build ios
echo "build android"
cordova build android --release
echo "bundle android"
cd platforms/android
./gradlew bundle
echo "------ DONE ------"