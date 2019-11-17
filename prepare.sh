#!/bin/bash

npm run build
rm -rf www/static/fonts/
mv fonts www/static/