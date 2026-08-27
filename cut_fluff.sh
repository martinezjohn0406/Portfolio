#!/bin/bash
files=$(find src -name "*.tsx")

for file in $files; do
  # 1. Eliminate all shadows. Flat design screams "I mean business" (Notion/Stripe aesthetic).
  sed -i 's/shadow-sm/shadow-none/g' "$file"
  sed -i 's/shadow-md/shadow-none/g' "$file"
  sed -i 's/shadow-lg/shadow-none/g' "$file"
  sed -i 's/shadow-xl/shadow-none/g' "$file"
  sed -i 's/shadow-2xl/shadow-none/g' "$file"
  sed -i 's/dark:shadow-2xl/dark:shadow-none/g' "$file"
  
  # 2. Remove purely decorative background gradients in cards (e.g., in ExperienceSection)
  sed -i '/bg-gradient-to-bl/d' "$file"
  
  # 3. Make border colors slightly sharper for that crisp document feel
  sed -i 's/border-stone-200/border-stone-300/g' "$file"
  sed -i 's/dark:border-white\/10/dark:border-white\/20/g' "$file"
done
