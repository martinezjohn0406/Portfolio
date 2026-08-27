#!/bin/bash
# Find all tsx files
files=$(find src -name "*.tsx")

for file in $files; do
  # Replace slate with stone
  sed -i 's/slate-/stone-/g' "$file"
  # Replace specific light mode backgrounds
  sed -i 's/#FBFBFD/#F4F1EB/g' "$file" 
  # Replace specific dark mode backgrounds
  sed -i 's/#0A0B0E/#141311/g' "$file"
  sed -i 's/#12141A/#1C1A17/g' "$file"
  sed -i 's/#0D0F14/#171513/g' "$file"
  sed -i 's/#15181F/#1E1C1A/g' "$file"
  sed -i 's/#1A1D24/#23201D/g' "$file"
  # Replace accent gold with a new accent (e.g., warm terra cotta/clay)
  # Old light accent: #96784E -> New: #A36B5E (Muted Terra Cotta)
  sed -i 's/#96784E/#A36B5E/g' "$file"
  # Old dark accent: #C2A47A -> New: #D19484 (Soft Coral/Terra)
  sed -i 's/#C2A47A/#D19484/g' "$file"
done
