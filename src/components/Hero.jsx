import { profile, education, projects } from "../data/portfolio";
import Reveal from "./Reveal";

function SocialLink({ href, label }) {
  if (!href) return null;
  const isEmail = label === "Email";
  const finalHref = isEmail ? `mailto:${href}` : href;
  const external = !isEmail;

  return (
    <a
      href={finalHref}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg border border-border text-text hover:text-accent hover:border-accent transition-all duration-200"
    >
      {label}
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" />
      </svg>
    </a>
  );
}

export default function Hero() {
  const featured = projects.slice(0, 3);

  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="max-w-[1080px] mx-auto px-6">
        {/* Hero */}
        <div className="max-w-2xl mb-20">
          <div className="animate-in flex items-center gap-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
            <span className="text-sm text-text-secondary">Open to opportunities</span>
          </div>

          <h1 className="animate-in animate-in-delay-1 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-text leading-[1.1]">
            {profile.name || "Your Name"}
          </h1>

          <p className="animate-in animate-in-delay-2 mt-5 text-lg md:text-xl text-text-secondary leading-relaxed">
            {profile.headline}
          </p>

          {profile.about && (
            <p className="animate-in animate-in-delay-3 mt-5 text-base text-text-secondary leading-relaxed max-w-xl">
              {profile.about}
            </p>
          )}

          {education.length > 0 && (
            <div className="animate-in animate-in-delay-3 mt-6 flex flex-wrap gap-2">
              {education.map((edu, i) => (
                <span key={i} className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-text-secondary bg-surface-alt border border-border rounded-lg">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" />
                  </svg>
                  {edu.degree} · {edu.institution}
                </span>
              ))}
            </div>
          )}

          <div className="animate-in animate-in-delay-4 mt-8 flex flex-wrap gap-3">
            <SocialLink href={profile.github} label="GitHub" />
            <SocialLink href={profile.linkedin} label="LinkedIn" />
            <SocialLink href={profile.email} label="Email" />
            {profile.resume && <SocialLink href={profile.resume} label="Resume" />}
          </div>
        </div>

        {/* Featured Projects */}
        {featured.length > 0 && (
          <Reveal>
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-semibold text-text-tertiary uppercase tracking-wider">
                  Featured Projects
                </h2>
                <a href="#projects" className="text-sm text-accent hover:text-accent-hover transition-colors">
                  View all →
                </a>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {featured.map((p, i) => (
                  <article key={i} className="group p-5 bg-surface-card border border-border rounded-xl hover:border-text-tertiary transition-all duration-300">
                    <span className="text-xs font-medium text-text-tertiary uppercase tracking-wider">
                      {p.category}
                    </span>
                    <h3 className="mt-2 text-base font-bold text-text tracking-tight group-hover:text-accent transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-text-secondary leading-relaxed line-clamp-2">
                      {p.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}
