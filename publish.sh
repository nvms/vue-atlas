#!/bin/bash

# build it
yarn build

# remove the old stuff
rm -rf ~/vue-atlas-npm

# 
mkdir ~/vue-atlas-npm

# copy the important stuff
cp -r src ~/vue-atlas-npm
cp -r dist ~/vue-atlas-npm

# copy over package spec, license and readme
cp package.json ~/vue-atlas-npm
cp LICENSE ~/vue-atlas-npm
cp README.md ~/vue-atlas-npm

# remove the example component
rm ~/vue-atlas-npm/src/App.vue

# remove the generated demo.html
rm ~/vue-atlas-npm/dist/demo.html

exit 0
