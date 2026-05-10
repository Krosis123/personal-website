import Reveal from "./Reveal";
import { research } from "../data/portfolio";

export default function Research() {
  if (!research.length) return null;

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-[1080px] mx-auto px-6">
        <Reveal>
          <div className="mb-12">
            <p className="text-sm font-medium text-accent mb-2">Academic</p>
            <h1 className="text-3xl md:text-4xl font-bold text-text tracking-tight">Research</h1>
            <p className="mt-3 text-text-secondary max-w-xl">Research interests and publications.</p>
          </div>
        </Reveal>

        <div className="space-y-4">
          {research.map((item, i) => (
            <Reveal key={i} delay={i * 80}>
              <article className="group p-6 bg-surface-card border border-border rounded-xl hover:border-text-tertiary transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                  <div>
                    <p className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-2">
                      {[item.area, item.status].filter(Boolean).join(" · ")}
                    </p>
                    <h3 className="text-xl font-bold text-text tracking-tight">{item.title}</h3>
                    {item.summary && <p className="mt-3 text-sm text-text-secondary leading-relaxed">{item.summary}</p>}
                    {item.methods && item.methods.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {item.methods.map((m) => (
                          <span key={m} className="px-2.5 py-1 text-xs font-medium text-text-secondary bg-surface-alt border border-border rounded-md">{m}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  {item.link && (
                    <a href={item.link} target="_blank" rel="noreferrer"
                      className="text-sm font-medium text-accent hover:text-accent-hover transition-colors whitespace-nowrap">
                      View →
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
