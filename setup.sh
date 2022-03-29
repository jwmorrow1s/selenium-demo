#! /bin/bash

# https://misc.flogisoft.com/bash/tip_colors_and_formatting

GLOBAL_NODE_MODULES_LOCATION="$(npm root -g)"

info(){
  msg="$1"
  printf "\e[32m[INFO] : $msg \n\e[0m"
}

error(){
  msg="$1"
  printf "\e[31m[ERROR]: $msg \n\e[0m"
}

checkForChrome(){
  if [ -f "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" ]; then  
    CHROME_VER="$('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' --version | grep -E --only-matching '\d+\.?\d+\.?\d+\.?\d+')"
    info "User has chrome version: $CHROME_VER"
  else
    error "Chrome was not found on this machine. Download chrome to continue. Exiting..."
    exit 1
  fi
}

closingThoughts(){
  info 'you should be able to test the installation of chromedriver by just running $ chromedriver'
  info 'if you see an error saying <cannot be opened because the developer cannot be verified> run the following:'
  info 'xattr -d com.apple.quarantine $(which chromedriver)'
}

checkForChrome

info "if you don't have selenium-webdriver installed yet, you will be prompted for your sudo p/w to download it to $GLOBAL_NODE_MODULES_LOCATION"

# check to see if selenium is installed and if not, install it
if ls "$GLOBAL_NODE_MODULES_LOCATION" | grep -o -E 'selenium-webdriver.*' > /dev/null ; then
    info "selenium-webdriver already installed. Continuing..."
  else
    info "selenium-webdriver not found. installing..."
    sudo npm install -g selenium-webdriver
fi

# check to see if selenium was successfully installed and if not, die 
if ! ls "$GLOBAL_NODE_MODULES_LOCATION" | grep -o -E 'selenium-webdriver.*' > /dev/null ; then
  error "unable to install selenium-webdriver. Bummer. Exiting..."
  exit 1
fi

CHROME_DRIVER_DOWNLOAD_URL="https://chromedriver.storage.googleapis.com/$CHROME_VER/chromedriver_mac64.zip"
CHROME_DRIVER_ZIP_DESTINATION="$(pwd)/chromedriver_mac64.zip"

info "downloading chrome driver for selenium from $CHROME_DRIVER_DOWNLOAD_URL ..."
curl --silent --location --request GET "$CHROME_DRIVER_DOWNLOAD_URL" -O

# check zip file exists and bail out if it doesn't
if [ -f "$CHROME_DRIVER_ZIP_DESTINATION" ]; then
  : # noop
else
  error "Download of chrome driver failed! Exiting..."
  exit 1
fi

info "extracting chromedriver_mac64.zip ..."
unzip chromedriver_mac64 -x > /dev/null 2>&1

if [ -f "/usr/local/bin/chromedriver" ]; then 
    info "extracted chromedriver_mac64.zip"
  else
    error "Unable to extract chromedriver_mac64.zip."
    info "There was as issue extracting a zip of the chromedriver for $CHROME_VER. Which means it probably doesn't exist" 
    info " -- so you should probably head on over to \e[34m https://chromedriver.storage.googleapis.com/index.html\e[32m and see if you can find an adjacent version."
    info ' -- after you have it downloaded place it onto your path at /usr/local/bin/ or wherever.'
    closingThoughts
    exit 1
fi

info "placing chromedriver into /usr/local/bin..."

mv "$(pwd)/chromedriver" '/usr/local/bin' 

info "finished placing chromedriver into /usr/local/bin"

info "removing the chromedriver_mac64.zip file because we don't need it anymore."
rm chromedriver_mac64.zip 
info "removed chromedriver_mac64.zip"
closingThoughts

info "Goodbye"
