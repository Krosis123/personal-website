import { useState } from "react";
import Reveal from "./Reveal";
import { blogPosts } from "../data/portfolio";

export default function Blog() {
  const [selected, setSelected] = useState(null);

  if (!blogPosts.length) return null;

  const post = selected !== null ? blogPosts[selected] : null;

  if (post) {
    return (
      <div className="pt-24 pb-20">
        <div className="max-w-[720px] mx-auto px-6">
          <button onClick={() => setSelected(null)}
            className="mb-8 text-sm text-accent hover:text-accent-hover transition-colors">
            ← Back to blog
          </button>
          <Reveal>
            <article>
              <p className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-4">
                {[post.date, post.tags].filter(Boolean).join(" · ")}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-text tracking-tight leading-tight">{post.title}</h1>
              {post.summary && <p className="mt-6 text-lg text-text-secondary leading-relaxed">{post.summary}</p>}
              {post.content && <div className="mt-10 text-base text-text-secondary leading-8 whitespace-pre-line">{post.content}</div>}
            </article>
          </Reveal>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-[1080px] mx-auto px-6">
        <Reveal>
          <div className="mb-12">
            <p className="text-sm font-medium text-accent mb-2">Writing</p>
            <h1 className="text-3xl md:text-4xl font-bold text-text tracking-tight">Blog</h1>
            <p className="mt-3 text-text-secondary max-w-xl">Notes, essays, and technical posts.</p>
          </div>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          {blogPosts.map((item, i) => (
            <Reveal key={i} delay={i * 60}>
              <article className="group p-6 bg-surface-card border border-border rounded-xl hover:border-text-tertiary transition-all duration-300">
                <p className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-3">
                  {[item.date, item.tags].filter(Boolean).join(" · ")}
                </p>
                <h2 className="text-xl font-bold text-text tracking-tight group-hover:text-accent transition-colors">{item.title}</h2>
                {item.summary && <p className="mt-3 text-sm text-text-secondary leading-relaxed">{item.summary}</p>}
                <button onClick={() => setSelected(i)}
                  className="mt-4 text-sm font-medium text-accent hover:text-accent-hover transition-colors">
                  Read →
                </button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
