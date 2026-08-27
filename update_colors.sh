#!/bin/bash
files=$(find src -name "*.tsx")
files="$files src/index.css index.html"

for file in $files; do
  # Replace Earthy Olive with Vibrant Indigo
  sed -i 's/#556B4D/#4F46E5/g' "$file"
  # Replace Soft Sage with Vibrant Sky Blue
  sed -i 's/#8C9E7E/#38BDF8/g' "$file"
done
