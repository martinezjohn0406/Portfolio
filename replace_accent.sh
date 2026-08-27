#!/bin/bash
files=$(find src -name "*.tsx")
files="$files src/index.css index.html"

for file in $files; do
  # Replace light mode pink/terracotta with Earthy Olive
  sed -i 's/#A36B5E/#556B4D/g' "$file"
  # Replace dark mode coral with Soft Sage
  sed -i 's/#D19484/#8C9E7E/g' "$file"
  # Also catch any RGB variants if there were any (there was one in index.css for gold, we changed it to 209, 148, 132)
  sed -i 's/209, 148, 132/140, 158, 126/g' "$file"
done
