#!/bin/bash

# Remove layout prop from Skills grid which causes massive layout thrashing
sed -i 's/<motion.div layout>/<motion.div>/g' src/components/SkillsSection.tsx
sed -i 's/layout//g' src/components/SkillsSection.tsx

# Convert all y-axis / scale animations to pure opacity fades to prevent repaints & jank on mobile
sed -i 's/initial={{ opacity: 0, y: 20 }}/initial={{ opacity: 0 }}/g' src/components/ProjectGrid.tsx
sed -i 's/whileInView={{ opacity: 1, y: 0 }}/whileInView={{ opacity: 1 }}/g' src/components/ProjectGrid.tsx
sed -i 's/viewport={{ once: true, margin: "0px 0px -100px 0px" }}/viewport={{ once: true, margin: "100px" }}/g' src/components/ProjectGrid.tsx

sed -i 's/initial={{ opacity: 0, y: 16 }}/initial={{ opacity: 0 }}/g' src/components/HeroSection.tsx
sed -i 's/animate={{ opacity: 1, y: 0 }}/animate={{ opacity: 1 }}/g' src/components/HeroSection.tsx

sed -i 's/initial={{ opacity: 0, scale: 0.96 }}/initial={{ opacity: 0 }}/g' src/components/SkillsSection.tsx
sed -i 's/animate={{ opacity: 1, scale: 1 }}/animate={{ opacity: 1 }}/g' src/components/SkillsSection.tsx
sed -i 's/exit={{ opacity: 0, scale: 0.96 }}/exit={{ opacity: 0 }}/g' src/components/SkillsSection.tsx

sed -i 's/initial={{ opacity: 0, y: 20 }}/initial={{ opacity: 0 }}/g' src/components/ContactSection.tsx
sed -i 's/whileInView={{ opacity: 1, y: 0 }}/whileInView={{ opacity: 1 }}/g' src/components/ContactSection.tsx

# Catch any remaining whileInViews with y
sed -i 's/initial={{ opacity: 0, y: [0-9-]* }}/initial={{ opacity: 0 }}/g' src/components/*.tsx
sed -i 's/whileInView={{ opacity: 1, y: 0 }}/whileInView={{ opacity: 1 }}/g' src/components/*.tsx
sed -i 's/animate={{ opacity: 1, y: 0 }}/animate={{ opacity: 1 }}/g' src/components/*.tsx

