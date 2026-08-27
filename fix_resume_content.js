const fs = require('fs');
let content = fs.readFileSync('src/components/ResumeModal.tsx', 'utf8');

const replacement = `            {/* Featured Projects Section */}
            <div className="space-y-3">
              <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8E795E] dark:text-[#D4B892] font-semibold flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Featured Data Projects</span>
              </h2>
              <div className="space-y-3">
                {projectsData.map((project, idx) => (
                  <div key={idx} className="p-4 rounded-sm bg-stone-50 dark:bg-[#15181E] border border-stone-300 dark:border-white/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <strong className="font-serif text-base italic text-stone-900 dark:text-[#E2E4E9]">
                        {project.title}
                      </strong>
                      <span className="text-[11px] font-mono text-[#8E795E] dark:text-[#D4B892] bg-[#D4B892]/15 px-2 py-0.5 rounded-full border border-[#D4B892]/30 font-bold">
                        {project.completionDate}
                      </span>
                    </div>
                    <p className="text-xs text-stone-700 dark:text-white/80 font-medium">
                      Objective: <span className="font-light text-stone-600 dark:text-white/70">{project.tagline}</span>
                    </p>
                    <p className="text-xs text-stone-600 dark:text-white/70 leading-relaxed font-light">
                      {project.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>`;

const startMarker = '{/* Accomplishments Section */}';
const endMarker = '{/* Skills & Languages */}';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  content = content.substring(0, startIndex) + replacement + '\n\n            ' + content.substring(endIndex);
  fs.writeFileSync('src/components/ResumeModal.tsx', content);
  console.log('Replaced successfully.');
} else {
  console.log('Markers not found');
}
