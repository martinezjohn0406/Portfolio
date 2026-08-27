#!/bin/bash
sed -i 's/viewport={{ once: true, margin: "-50px" }}/viewport={{ once: true, margin: "0px 0px -100px 0px" }}/g' src/components/ProjectGrid.tsx
sed -i 's/transition={{ duration: 0.5, delay: index \* 0.1 }}/transition={{ duration: 0.3 }}/g' src/components/ProjectGrid.tsx

sed -i 's/viewport={{ once: true, margin: "-50px" }}/viewport={{ once: true, margin: "0px 0px -100px 0px" }}/g' src/components/HeroSection.tsx
sed -i 's/transition={{ duration: 0.5, delay: 0.1 }}/transition={{ duration: 0.3 }}/g' src/components/HeroSection.tsx
sed -i 's/transition={{ duration: 0.5, delay: 0.2 }}/transition={{ duration: 0.3 }}/g' src/components/HeroSection.tsx
sed -i 's/transition={{ duration: 0.5, delay: 0.3 }}/transition={{ duration: 0.3 }}/g' src/components/HeroSection.tsx

sed -i 's/viewport={{ once: true, margin: "-50px" }}/viewport={{ once: true, margin: "0px 0px -100px 0px" }}/g' src/components/SkillsSection.tsx
sed -i 's/transition={{ duration: 0.5, delay: idx \* 0.1 }}/transition={{ duration: 0.3 }}/g' src/components/SkillsSection.tsx
sed -i 's/transition={{ duration: 0.5, delay: index \* 0.1 }}/transition={{ duration: 0.3 }}/g' src/components/SkillsSection.tsx

sed -i 's/viewport={{ once: true, margin: "-50px" }}/viewport={{ once: true, margin: "0px 0px -100px 0px" }}/g' src/components/ContactSection.tsx
sed -i 's/transition={{ duration: 0.5, delay: 0.1 }}/transition={{ duration: 0.3 }}/g' src/components/ContactSection.tsx
sed -i 's/transition={{ duration: 0.5, delay: 0.2 }}/transition={{ duration: 0.3 }}/g' src/components/ContactSection.tsx

