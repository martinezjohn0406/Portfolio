#!/bin/bash
files=$(find src -name "*.tsx")

for file in $files; do
  # Replace once: true with once: false
  # Note: Some have extra params like margin, so we just target the "once: true" part
  sed -i 's/once: true/once: false/g' "$file"
done
