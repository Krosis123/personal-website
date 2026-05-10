import Reveal from "./Reveal";
import { skills } from "../data/portfolio";

const levelConfig = {
  Beginner: { width: "33%", color: "from-amber-500 to-orange-400", badge: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  Intermediate: { width: "66%", color: "from-orange-500 to-rose-400", badge: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
  Advanced: { width: "100%", color: "from-emerald-500 to-teal-400", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
};

export default function Skills() {
  if (!skills.length) return null;

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-[1080px] mx-auto px-6">
        <Reveal>
          <div className="mb-12">
            <p className="text-sm font-medium text-accent mb-2">Technical</p>
            <h1 className="text-3xl md:text-4xl font-bold text-text tracking-tight">Skills</h1>
            <p className="mt-3 text-text-secondary max-w-xl">Languages and tools I work with.</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {skills.map((s, i) => {
            const config = levelConfig[s.level] || levelConfig.Beginner;
            return (
              <Reveal key={s.name} delay={i * 80}>
                <div className="group p-5 bg-surface-card border border-border rounded-xl hover:border-text-tertiary transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-lg font-bold text-text tracking-tight">{s.name}</p>
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-md border ${config.badge}`}>
                      {s.level}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-alt rounded-full overflow-hidden mt-4">
                    <div
                      className={`skill-bar-fill h-full rounded-full bg-gradient-to-r ${config.color}`}
                      style={{ width: config.width, animationDelay: `${i * 100 + 300}ms` }}
                    />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
