#!/bin/bash

# Directory for the new extension
EXTENSION_DIR="extension"

# Name of the zip file
ZIP_FILE="extension.zip"

# Create the extension directory if it doesn't exist
mkdir -p "$EXTENSION_DIR"

uglifyjs content.js -o $EXTENSION_DIR/content.js

# Copy other files to the extension directory
cp manifest.json "$EXTENSION_DIR/"
cp settings.html "$EXTENSION_DIR/"
cp settings.js "$EXTENSION_DIR/"

# Remove existing zip file if it exists
if [ -f "$ZIP_FILE" ]; then
    rm "$ZIP_FILE"
fi

# Zip the extension directory
zip -r "$ZIP_FILE" "$EXTENSION_DIR"

echo "Extension build complete. Packaged into $ZIP_FILE"
