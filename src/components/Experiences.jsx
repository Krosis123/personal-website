import Reveal from "./Reveal";
import { experiences } from "../data/portfolio";

export default function Experiences() {
  if (!experiences.length) return null;

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-[1080px] mx-auto px-6">
        <Reveal>
          <div className="mb-12">
            <p className="text-sm font-medium text-accent mb-2">Background</p>
            <h1 className="text-3xl md:text-4xl font-bold text-text tracking-tight">Experience</h1>
            <p className="mt-3 text-text-secondary max-w-xl">Internships, leadership, and other work.</p>
          </div>
        </Reveal>

        <div className="space-y-4">
          {experiences.map((exp, i) => (
            <Reveal key={i} delay={i * 80}>
              <article className="group p-6 bg-surface-card border border-border rounded-xl hover:border-text-tertiary transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-text tracking-tight">{exp.role}</h3>
                    <p className="text-sm text-text-secondary">{exp.organization}</p>
                  </div>
                  {exp.period && <span className="text-sm text-text-tertiary whitespace-nowrap">{exp.period}</span>}
                </div>
                {exp.description && <p className="text-sm text-text-secondary leading-relaxed">{exp.description}</p>}
                {exp.link && (
                  <a href={exp.link} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-accent hover:text-accent-hover transition-colors">
                    Learn more
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" />
                    </svg>
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
