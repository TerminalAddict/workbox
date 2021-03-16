# Workbox Local CDN Creator
A simple NPM update script that creates a local CDN of workbox.

## Background
I host all my websites in New Zealand, and as such, downloading js files (like workbox) is quicker for NZ vistors if the files are hosted in NZ.

So I host my own local copies of stuff.

## Using this script
Pretty easy really.  
This script:
* Checks if you have npm / node installed
    * It exits if you don't (you need root)
* Checks if you have npm-check-updates installed
    * It exits if you don't (you need root)
* Checks if the workbox-cli module is installed
    * If not then installs it.
* Runs the workbox-cli to make a local copy of workbox in the directory local_workbox.

