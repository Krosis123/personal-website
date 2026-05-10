import Reveal from "./Reveal";
import { projects, courseProjects } from "../data/portfolio";

function Tag({ children }) {
  return (
    <span className="inline-block px-2.5 py-1 text-xs font-medium text-text-secondary bg-surface-alt border border-border rounded-md">
      {children}
    </span>
  );
}

function ProjectLink({ href, children }) {
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noreferrer"
      className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors">
      {children}
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" />
      </svg>
    </a>
  );
}

function ProjectCard({ project, index }) {
  const tools = Array.isArray(project.tools) ? project.tools : Array.isArray(project.skills) ? project.skills : [];

  return (
    <Reveal delay={index * 80}>
      <article className="group h-full p-6 bg-surface-card border border-border rounded-xl hover:border-text-tertiary hover:shadow-[0_4px_24px_rgba(0,0,0,0.3)] transition-all duration-300">
        <div className="flex items-center justify-between gap-4 mb-4">
          <span className="text-xs font-medium text-text-tertiary uppercase tracking-wider">
            {project.category || project.course || "Project"}
          </span>
          {project.status && (
            <span className="text-xs font-medium text-text-tertiary">{project.status}</span>
          )}
        </div>
        <h3 className="text-xl font-bold text-text tracking-tight leading-snug group-hover:text-accent transition-colors duration-200">
          {project.title}
        </h3>
        {project.description && (
          <p className="mt-3 text-sm text-text-secondary leading-relaxed">{project.description}</p>
        )}
        {tools.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tools.map((t) => <Tag key={t}>{t}</Tag>)}
          </div>
        )}
        <div className="mt-5 flex gap-4">
          <ProjectLink href={project.github}>GitHub</ProjectLink>
          <ProjectLink href={project.demo || project.link}>
            {project.demo ? "Demo" : "View"}
          </ProjectLink>
        </div>
      </article>
    </Reveal>
  );
}

export default function Projects() {
  const all = [...projects];
  const cp = courseProjects.filter((p) => Object.values(p).some((v) => v && String(v).trim()));

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-[1080px] mx-auto px-6">
        <Reveal>
          <div className="mb-12">
            <p className="text-sm font-medium text-accent mb-2">Work</p>
            <h1 className="text-3xl md:text-4xl font-bold text-text tracking-tight">Projects</h1>
            <p className="mt-3 text-text-secondary max-w-xl">
              Personal builds and technical experiments.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          {all.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
        </div>

        {cp.length > 0 && (
          <div className="mt-16">
            <Reveal>
              <h2 className="text-lg font-semibold text-text mb-6">Course Projects</h2>
            </Reveal>
            <div className="grid gap-4 md:grid-cols-2">
              {cp.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
