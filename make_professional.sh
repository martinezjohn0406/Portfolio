#!/bin/bash
files=$(find src -name "*.tsx")
files="$files src/index.css index.html"

for file in $files; do
  # Replace Indigo with Deep Professional Blue
  sed -i 's/#4F46E5/#1E40AF/g' "$file"
  # Replace Cyan with Soft Professional Blue
  sed -i 's/#38BDF8/#60A5FA/g' "$file"
  
  # Replace gradients
  sed -i 's/from-blue-600 to-cyan-500/from-blue-800 to-blue-600/g' "$file"
  sed -i 's/dark:from-cyan-400 dark:to-blue-500/dark:from-blue-400 dark:to-blue-200/g' "$file"
  sed -i 's/dark:from-cyan-400 dark:to-blue-400/dark:from-blue-400 dark:to-blue-200/g' "$file"
done
