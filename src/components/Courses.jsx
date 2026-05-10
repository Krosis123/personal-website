import Reveal from "./Reveal";
import { courses } from "../data/portfolio";

export default function Courses() {
  if (!courses.length) return null;

  const semesters = [...new Set(courses.map((c) => c.semester || "Other"))];

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-[1080px] mx-auto px-6">
        <Reveal>
          <div className="mb-12">
            <p className="text-sm font-medium text-accent mb-2">Academic</p>
            <h1 className="text-3xl md:text-4xl font-bold text-text tracking-tight">Coursework</h1>
            <p className="mt-3 text-text-secondary max-w-xl">Relevant courses by semester.</p>
          </div>
        </Reveal>

        <div className="space-y-8">
          {semesters.map((sem, si) => {
            const list = courses.filter((c) => (c.semester || "Other") === sem);
            return (
              <Reveal key={sem} delay={si * 100}>
                <div>
                  <h2 className="text-sm font-semibold text-text-tertiary uppercase tracking-wider mb-4">
                    Semester {sem}
                  </h2>
                  <div className="overflow-hidden rounded-xl border border-border bg-surface-card">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-border bg-surface-alt">
                          <th className="px-5 py-3.5 font-semibold text-text text-sm">Course</th>
                          <th className="px-5 py-3.5 font-semibold text-text text-sm hidden sm:table-cell">Area</th>
                          <th className="px-5 py-3.5 font-semibold text-text text-sm hidden md:table-cell">Topics</th>
                        </tr>
                      </thead>
                      <tbody>
                        {list.map((c, ci) => (
                          <tr key={ci} className={`transition-colors hover:bg-accent-light ${ci < list.length - 1 ? "border-b border-border" : ""}`}>
                            <td className="px-5 py-3.5 font-medium text-text">{c.name}</td>
                            <td className="px-5 py-3.5 text-text-secondary hidden sm:table-cell">{c.area}</td>
                            <td className="px-5 py-3.5 text-text-secondary hidden md:table-cell">{c.topics || "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
