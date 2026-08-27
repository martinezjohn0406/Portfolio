#!/bin/bash
files=$(find src -name "*.tsx")

for file in $files; do
  # Remove text-transparent and bg-clip-text
  sed -i 's/text-transparent bg-clip-text bg-gradient-to-r from-\[#[A-Z0-9]*\] to-\[#[A-Z0-9]*\] dark:from-\[#[A-Z0-9]*\] dark:to-\[#[A-Z0-9]*\]/text-stone-900 dark:text-[#E2E4E9]/g' "$file"
done
