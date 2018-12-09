#!/bin/bash

yarn run build-bundle
rm -rf ~/vue-atlas-npm
mkdir ~/vue-atlas-npm
cp -r src ~/vue-atlas-npm
cp -r dist ~/vue-atlas-npm
cp package.json ~/vue-atlas-npm
cp LICENSE ~/vue-atlas-npm
cp README.md ~/vue-atlas-npm

echo "ready to publish?"
echo "cd ~/vue-atlas-npm && npm publish"

exit 0