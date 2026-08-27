#!/bin/bash
files=$(find src -name "*.tsx")
files="$files src/index.css index.html"

for file in $files; do
  # Replace Professional Blue with Deep Gold
  sed -i 's/#1E40AF/#8E795E/g' "$file"
  # Replace Soft Professional Blue with Light Gold
  sed -i 's/#60A5FA/#D4B892/g' "$file"
  
  # Replace gradient in HeroSection & Footer (if any)
  sed -i 's/from-blue-800 to-blue-600/from-[#8E795E] to-[#B39B7D]/g' "$file"
  sed -i 's/dark:from-blue-400 dark:to-blue-200/dark:from-[#D4B892] dark:to-[#E6D5B8]/g' "$file"
done
