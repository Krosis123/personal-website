import Reveal from "./Reveal";
import { profile } from "../data/portfolio";

export default function Contact() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-[1080px] mx-auto px-6">
        <Reveal>
          <div className="text-center max-w-lg mx-auto">
            <p className="text-sm font-medium text-accent mb-2">Contact</p>
            <h1 className="text-3xl md:text-4xl font-bold text-text tracking-tight">Get in touch</h1>
            <p className="mt-4 text-text-secondary">
              Feel free to reach out for collaborations, questions, or just to say hello.
            </p>

            {profile.email && (
              <a href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 text-sm font-semibold text-surface bg-text rounded-lg hover:bg-text/85 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                {profile.email}
              </a>
            )}

            <div className="mt-8 flex items-center justify-center gap-6">
              {profile.github && <a href={profile.github} target="_blank" rel="noreferrer" className="text-sm text-text-tertiary hover:text-text transition-colors">GitHub</a>}
              {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-sm text-text-tertiary hover:text-text transition-colors">LinkedIn</a>}
              {profile.resume && <a href={profile.resume} target="_blank" rel="noreferrer" className="text-sm text-text-tertiary hover:text-text transition-colors">Resume</a>}
            </div>
          </div>
        </Reveal>

        <div className="mt-20 pt-8 border-t border-border text-center">
          <p className="text-xs text-text-tertiary">© {new Date().getFullYear()} {profile.name}</p>
        </div>
      </div>
    </div>
  );
}
