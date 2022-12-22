#!/bin/sh

THIS_DIR=$(pwd)

# ----------------------------------
# PUBLISH
# ----------------------------------

# Publish package
echo "* Preparing to publish on NPM..."

npm publish
if [ "$?" -ne "0" ]; then
  echo "Failed to publish package";
  exit 1;
fi

echo "---"
echo "* Published!"
exit 0;
