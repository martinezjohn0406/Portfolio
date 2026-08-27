#!/bin/bash
sed -i 's/import { profileData, skillsCategories, experiencesData, certificationsData, educationData } from "..\/data\/profileData";/import { profileData, skillsCategories, educationData } from "..\/data\/profileData";\nimport { projectsData } from "..\/data\/projectsData";/' src/components/ResumeModal.tsx
