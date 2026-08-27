#!/bin/bash
files=$(find src -name "*.tsx")

for file in $files; do
  # 1. Stop the distracting two-way animations. Employers hate jumping text when trying to read.
  sed -i 's/once: false/once: true/g' "$file"
  
  # 2. Remove bouncy hover effects on cards
  sed -i 's/hover:-translate-y-1//g' "$file"
  sed -i 's/hover:-translate-y-2//g' "$file"
  sed -i 's/hover:scale-[0-9]*//g' "$file"
  sed -i 's/hover:shadow-xl/hover:shadow-md/g' "$file"
  sed -i 's/hover:shadow-2xl/hover:shadow-lg/g' "$file"
  
  # 3. Clean up the styling for a more editorial, document-like feel
  # Replace rounded-2xl or rounded-3xl with sharper corners like rounded-none or rounded-sm
  sed -i 's/rounded-3xl/rounded-sm/g' "$file"
  sed -i 's/rounded-2xl/rounded-sm/g' "$file"
  sed -i 's/rounded-xl/rounded-sm/g' "$file"
done
