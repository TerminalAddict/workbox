# Workbox Local CDN Creator
A simple NPM update script that creates a local CDN of workbox.

## Background
I host all my websites in New Zealand, and as such, downloading js files (like workbox) is quicker for NZ vistors if the files are hosted in NZ.

So I host my own local copies of stuff.

## About this script
Pretty easy really.  
This script:
* Checks if you have npm / node installed
    * It exits if you don't (you need root)
* Checks if you have npm-check-updates installed
    * It exits if you don't (you need root)
* Checks if the workbox-cli module is installed
    * If not then installs it.
* Runs the workbox-cli to make a local copy of workbox in the directory local_workbox.


## Installing and Running
1. Git clone this repo.
2. Set executable bit: `chmod 755 update_workbox.sh`
3. Run the script: `./update_workbox.sh`

## Example
An example to get you started can be found in the example directory of this repository.  

A working example can be found on my [TerminalAddict.com](https://github.com/TerminalAddict/ta.com-website){: target="_blank"} repository.  
Or on the website: [TerminalAddict.com](https://terminaladdict.com/){: target="_blank"} repository.  

