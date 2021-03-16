#!/bin/bash
NPM=/usr/bin/npm
NCU=/usr/bin/ncu
CURDIR=$(pwd)
if [ ! -f $NPM ]; then
    echo npm/node not installed
    exit 1
fi
if [ ! -f $NCU ]; then
    echo npm-check-updates not installed
    echo install it with
    echo sudo npm i -g npm-check-updates
    exit 1
fi
if [ ! -f $CURDIR/node_modules/workbox-cli/build/bin.js  ]; then
    echo installing workbox-cli
    $NPM install workbox-cli
fi
echo updating node_modules
$NCU -u
$NPM update
echo updating workbox local files
$CURDIR/node_modules/workbox-cli/build/bin.js copyLibraries local_workbox
