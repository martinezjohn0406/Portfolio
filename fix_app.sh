#!/bin/bash
sed -i '/onAskData={(project) => setAskDataProject(project)}/d' src/App.tsx
sed -i '/\/>/d' src/App.tsx # Wait, this will delete ALL self-closing tags. I need to be more precise.
