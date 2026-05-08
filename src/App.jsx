import React, { useEffect, useMemo, useState } from "react";

import {
  profile,
  research,
  projects,
  courseProjects,
  courses,
  codingExperience,
  otherExperience,
  blogPosts,
} from "./data/portfolio.js";

const navItems = [
  { id: "home", label: "Home" },
  { id: "research", label: "Research" },
  { id: "projects", label: "Projects" },
  { id: "course-projects", label: "Course Projects" },
  { id: "courses", label: "Courses" },
  { id: "coding", label: "Coding" },
  { id: "experience", label: "Experience" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];

function toList(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function isFilled(value) {
  if (Array.isArray(value)) return value.length > 0;
  return value !== undefined && value !== null && String(value).trim() !== "";
}

function visibleItems(items) {
  return (items || []).filter((item) => Object.values(item).some(isFilled));
}

function initials(name) {
  return String(name || "UY")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function AppStyles() {
  return (
    <style>{`
      :root {
        --ink: #171717;
        --paper: #f5f0e6;
        --paper-2: #fffaf0;
        --muted: #68635a;
        --line: rgba(23, 23, 23, 0.16);
        --accent: #c8ff2e;
        --accent-2: #ff7a30;
        --blue: #4d6bff;
        --shadow: 10px 10px 0 rgba(23, 23, 23, 1);
      }

      html { scroll-behavior: smooth; }
      body {
        margin: 0;
        background: var(--paper);
        color: var(--ink);
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, Arial, sans-serif;
        text-rendering: geometricPrecision;
      }

      ::selection { background: var(--ink); color: var(--paper); }

      @keyframes fade-up {
        from { opacity: 0; transform: translateY(18px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes float-note {
        0%, 100% { transform: translate3d(0, 0, 0) rotate(-1.5deg); }
        50% { transform: translate3d(8px, -12px, 0) rotate(1.5deg); }
      }

      @keyframes slide-paper {
        0% { opacity: 0; transform: translateX(22px) rotate(1deg); }
        100% { opacity: 1; transform: translateX(0) rotate(0deg); }
      }

      @keyframes progress {
        from { transform: scaleX(0); }
        to { transform: scaleX(1); }
      }

      @keyframes pencil-line {
        0%, 100% { transform: scaleX(0.35); opacity: 0.45; }
        50% { transform: scaleX(1); opacity: 1; }
      }

      @keyframes tape-wiggle {
        0%, 100% { transform: rotate(-3deg); }
        50% { transform: rotate(3deg); }
      }

      @keyframes marquee {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }

      .app-shell {
        background:
          radial-gradient(circle at 15% 10%, rgba(200, 255, 46, 0.28), transparent 25rem),
          radial-gradient(circle at 88% 18%, rgba(77, 107, 255, 0.16), transparent 28rem),
          linear-gradient(rgba(23,23,23,0.045) 1px, transparent 1px),
          linear-gradient(90deg, rgba(23,23,23,0.045) 1px, transparent 1px),
          var(--paper);
        background-size: auto, auto, 32px 32px, 32px 32px, auto;
      }

      .grain::after {
        content: "";
        position: fixed;
        inset: 0;
        pointer-events: none;
        opacity: 0.12;
        z-index: 1;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.55'/%3E%3C/svg%3E");
        mix-blend-mode: multiply;
      }

      .reveal {
        opacity: 0;
        transform: translateY(18px);
        transition: opacity 650ms ease, transform 650ms ease;
      }
      .reveal.visible { opacity: 1; transform: translateY(0); }

      .load-in { animation: fade-up 680ms ease both; }
      .float-note { animation: float-note 6.5s ease-in-out infinite; }
      .slide-paper { animation: slide-paper 420ms ease both; }
      .tape { animation: tape-wiggle 4s ease-in-out infinite; }
      .marquee-track { animation: marquee 28s linear infinite; }
      .marquee:hover .marquee-track { animation-play-state: paused; }
      .pencil-line { transform-origin: left; animation: pencil-line 2.2s ease-in-out infinite; }

      .hero-title {
        font-size: clamp(3.1rem, 8.4vw, 7.8rem);
        line-height: 0.95;
        letter-spacing: -0.055em;
      }

      .page-title {
        font-size: clamp(2.7rem, 6.8vw, 6.1rem);
        line-height: 0.95;
        letter-spacing: -0.05em;
      }

      .notebook {
        position: relative;
        border: 2px solid var(--ink);
        border-radius: 30px;
        background: var(--paper-2);
        box-shadow: var(--shadow);
        overflow: hidden;
      }

      .notebook::before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 4.1rem;
        width: 2px;
        background: rgba(255, 122, 48, 0.55);
        z-index: 0;
      }

      .notebook-lines {
        background-image: linear-gradient(to bottom, transparent 31px, rgba(23, 23, 23, 0.09) 32px);
        background-size: 100% 32px;
      }

      .rings {
        position: absolute;
        left: 1.15rem;
        top: 2rem;
        bottom: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        z-index: 2;
      }

      .ring {
        width: 2rem;
        height: 2rem;
        border: 2px solid var(--ink);
        border-radius: 999px;
        background: var(--paper);
        box-shadow: inset 5px 0 0 rgba(23, 23, 23, 0.08);
      }

      .card {
        border: 2px solid var(--ink);
        border-radius: 24px;
        background: var(--paper-2);
        transition: transform 240ms ease, box-shadow 240ms ease, background 240ms ease;
      }
      .card:hover { transform: translateY(-5px); box-shadow: 8px 8px 0 var(--ink); }

      .button {
        transition: transform 180ms ease, background 180ms ease, color 180ms ease;
      }
      .button:hover { transform: translateY(-3px); }

      .progress-bar {
        transform-origin: left;
        animation: progress 5s linear both;
      }

      .project-slide-bg {
        background:
          linear-gradient(135deg, rgba(200,255,46,0.85), rgba(255,250,240,0) 38%),
          radial-gradient(circle at right top, rgba(77,107,255,0.24), transparent 18rem),
          var(--paper-2);
      }

      .font-hand {
        font-family: "Segoe Print", "Bradley Hand", "Comic Sans MS", ui-sans-serif, system-ui, sans-serif;
      }

      @media (max-width: 768px) {
        .notebook { border-radius: 24px; box-shadow: 6px 6px 0 var(--ink); }
        .notebook::before { left: 3.35rem; }
        .rings { left: 0.75rem; }
        .ring { width: 1.6rem; height: 1.6rem; }
        .card:hover { transform: translateY(-3px); box-shadow: 5px 5px 0 var(--ink); }
      }
    `}</style>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const ref = React.useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`reveal ${visible ? "visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

function Tag({ children }) {
  if (!children) return null;
  return (
    <span className="inline-flex rounded-full border border-neutral-950/20 bg-white/45 px-3 py-1 text-xs font-bold uppercase tracking-wide text-neutral-700">
      {children}
    </span>
  );
}

function LinkButton({ href, children, variant = "light" }) {
  if (!href) return null;
  const external = String(href).startsWith("http");
  const className =
    variant === "dark"
      ? "border-neutral-950 bg-neutral-950 text-[#fffaf0] hover:bg-[#c8ff2e] hover:text-neutral-950"
      : "border-neutral-950 bg-[#fffaf0] text-neutral-950 hover:bg-neutral-950 hover:text-[#fffaf0]";

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`button inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-extrabold ${className}`}
    >
      {children}
      <span aria-hidden="true">↗</span>
    </a>
  );
}

function Card({ children, className = "" }) {
  return <article className={`card p-5 md:p-6 ${className}`}>{children}</article>;
}

function Empty({ label }) {
  return (
    <Reveal>
      <div className="rounded-[24px] border-2 border-dashed border-neutral-950 bg-[#fffaf0] p-10 text-center text-neutral-500">
        No {label} added yet.
      </div>
    </Reveal>
  );
}

function PageHeader({ number = "01", title, description }) {
  return (
    <Reveal className="mb-8">
      <div className="notebook notebook-lines p-6 pl-20 md:p-10 md:pl-28">
        <div className="rings" aria-hidden="true">
          <span className="ring" />
          <span className="ring" />
          <span className="ring" />
        </div>
        <div className="relative z-10">
          <p className="mb-4 text-sm font-extrabold uppercase tracking-[0.25em] text-neutral-500">Page / {number}</p>
          <h1 className="page-title font-black text-neutral-950">{title}</h1>
          {description && <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600">{description}</p>}
        </div>
      </div>
    </Reveal>
  );
}

function SectionTitle({ number, title, description }) {
  return (
    <div className="mb-5 flex flex-col gap-2 border-t-2 border-neutral-950 pt-4 md:flex-row md:items-start md:justify-between">
      <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-neutral-500">/{number}</p>
      <div className="md:max-w-2xl md:text-right">
        <h2 className="text-3xl font-black tracking-[-0.04em] text-neutral-950 md:text-5xl">{title}</h2>
        {description && <p className="mt-2 text-sm leading-6 text-neutral-600">{description}</p>}
      </div>
    </div>
  );
}

function Marquee({ items }) {
  const safeItems = items.length ? items : ["Systems", "AI", "Performance", "Automation", "Linux", "Research"];
  const doubled = [...safeItems, ...safeItems];

  return (
    <div className="marquee overflow-hidden border-y-2 border-neutral-950 bg-neutral-950 py-3 text-[#fffaf0]">
      <div className="marquee-track flex w-max gap-5 whitespace-nowrap">
        {doubled.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-5 text-sm font-extrabold uppercase tracking-[0.22em]">
            {item}
            <span className="text-[#c8ff2e]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectSlideshow({ items }) {
  const slides = items.length ? items : [];
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [slides.length]);

  if (slides.length === 0) return <Empty label="projects" />;

  const project = slides[active];
  const tools = toList(project.tools).slice(0, 7);

  function next() {
    setActive((current) => (current + 1) % slides.length);
  }

  function prev() {
    setActive((current) => (current - 1 + slides.length) % slides.length);
  }

  return (
    <div className="notebook overflow-hidden">
      <div className="rings" aria-hidden="true">
        <span className="ring" />
        <span className="ring" />
        <span className="ring" />
        <span className="ring" />
      </div>

      <div className="relative min-h-[30rem] p-5 pl-16 md:p-8 md:pl-28">
        <div key={`${project.title}-${active}`} className="slide-paper project-slide-bg relative min-h-[27rem] rounded-[24px] border-2 border-neutral-950 p-6 md:p-8">
          <div className="tape absolute -top-4 left-8 h-8 w-28 rotate-[-3deg] border border-neutral-950/20 bg-[#c8ff2e]/80 opacity-90" />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="rounded-full border-2 border-neutral-950 bg-neutral-950 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.2em] text-[#fffaf0]">
              Slide {active + 1} / {slides.length}
            </p>
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-neutral-500">
              {[project.category, project.status].filter(Boolean).join(" / ") || "Project"}
            </p>
          </div>

          <div className="mt-10 grid gap-7 lg:grid-cols-[1fr_0.9fr] lg:items-end">
            <div>
              <h3 className="max-w-4xl text-4xl font-black leading-[0.98] tracking-[-0.045em] text-neutral-950 md:text-7xl">
                {project.title}
              </h3>
              {project.description && <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-700">{project.description}</p>}
            </div>

            <div className="rounded-[22px] border-2 border-neutral-950 bg-[#fffaf0]/85 p-5 shadow-[8px_8px_0_rgba(23,23,23,1)]">
              <p className="font-hand text-xl font-bold text-neutral-800">Project notes</p>
              <div className="mt-4 h-1 w-24 rounded-full bg-[#ff7a30] pencil-line" />
              <div className="mt-5 flex flex-wrap gap-2">
                {tools.length ? tools.map((tool) => <Tag key={tool}>{tool}</Tag>) : <Tag>Portfolio</Tag>}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <LinkButton href={project.github} variant="dark">GitHub</LinkButton>
                <LinkButton href={project.demo}>Demo</LinkButton>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-2 bg-neutral-950/10">
            <div key={`bar-${active}`} className="progress-bar h-full bg-neutral-950" />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            {slides.map((slide, index) => (
              <button
                key={`${slide.title}-${index}`}
                onClick={() => setActive(index)}
                className={`h-3 rounded-full border-2 border-neutral-950 transition-all ${index === active ? "w-10 bg-neutral-950" : "w-3 bg-[#fffaf0]"}`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={prev} className="button rounded-full border-2 border-neutral-950 bg-[#fffaf0] px-4 py-2 font-extrabold hover:bg-neutral-950 hover:text-[#fffaf0]">← Prev</button>
            <button onClick={next} className="button rounded-full border-2 border-neutral-950 bg-[#fffaf0] px-4 py-2 font-extrabold hover:bg-neutral-950 hover:text-[#fffaf0]">Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Shell({ page, setPage, children }) {
  function go(id) {
    window.location.hash = id;
    setPage(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="grain app-shell relative min-h-screen overflow-hidden">
      <AppStyles />

      <header className="sticky top-0 z-50 border-b-2 border-neutral-950 bg-[#f5f0e6]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <button onClick={() => go("home")} className="group flex items-center gap-3 text-left">
            <div className="grid h-12 w-12 place-items-center rounded-full border-2 border-neutral-950 bg-[#c8ff2e] text-sm font-black transition group-hover:rotate-[-8deg]">
              {initials(profile.name)}
            </div>
            <div>
              <p className="text-sm font-black tracking-tight text-neutral-950">{profile.name || "Your Name"}</p>
              <p className="max-w-[18rem] truncate text-xs font-medium text-neutral-500">{profile.headline || "Portfolio"}</p>
            </div>
          </button>

          <nav className="flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:justify-end md:pb-0">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`shrink-0 rounded-full border-2 px-3 py-2 text-xs font-extrabold transition md:text-sm ${
                  page === item.id
                    ? "border-neutral-950 bg-neutral-950 text-[#fffaf0]"
                    : "border-neutral-950/20 bg-[#fffaf0]/70 text-neutral-600 hover:border-neutral-950 hover:text-neutral-950"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <section className="relative z-10 mx-auto min-h-[calc(100vh-9rem)] max-w-7xl px-4 py-8 md:py-12">{children}</section>

      <footer className="relative z-10 border-t-2 border-neutral-950 bg-neutral-950 text-[#fffaf0]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm font-extrabold">© {new Date().getFullYear()} {profile.name || "Your Name"}</p>
          <p className="text-sm text-white/60">Your portfolio data stays in portfolio.js.</p>
        </div>
      </footer>
    </main>
  );
}

function Home() {
  const projectItems = visibleItems(projects);
  const courseProjectItems = visibleItems(courseProjects);
  const courseItems = visibleItems(courses);
  const blogItems = visibleItems(blogPosts);
  const researchItems = visibleItems(research);
  const codingItems = visibleItems(codingExperience);

  const counts = [
    ["Projects", projectItems.length],
    ["Research", researchItems.length],
    ["Course Projects", courseProjectItems.length],
    ["Courses", courseItems.length],
    ["Blog Posts", blogItems.length],
  ];

  const skills = [
    ...new Set([
      ...codingItems.flatMap((item) => toList(item.skills)),
      ...projectItems.flatMap((item) => toList(item.tools)),
    ]),
  ].slice(0, 18);

  return (
    <div className="space-y-14">
      <section className="load-in grid min-h-[70vh] items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="mb-5 inline-flex rounded-full border-2 border-neutral-950 bg-[#c8ff2e] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.22em]">
            Notebook Portfolio
          </p>
          <h1 className="hero-title font-black text-neutral-950">
            {profile.name || "Usman Yahya"}
            <span className="block text-[#ff7a30]">build log.</span>
          </h1>
          <p className="mt-7 max-w-3xl text-xl font-semibold leading-8 text-neutral-700 md:text-2xl">
            {profile.headline || "Computer Science student building software, AI workflows, and technical experiments."}
          </p>
          {profile.about && <p className="mt-5 max-w-2xl text-base leading-8 text-neutral-600">{profile.about}</p>}
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href={profile.github} variant="dark">GitHub</LinkButton>
            <LinkButton href={profile.linkedin}>LinkedIn</LinkButton>
            <LinkButton href={profile.email ? `mailto:${profile.email}` : ""}>Email</LinkButton>
            <LinkButton href={profile.resume}>Resume</LinkButton>
          </div>
        </div>

        <div className="float-note rounded-[28px] border-2 border-neutral-950 bg-[#fffaf0] p-5 shadow-[12px_12px_0_#171717]">
          <div className="mb-5 flex items-center justify-between border-b-2 border-neutral-950 pb-3">
            <p className="font-hand text-2xl font-bold">quick index</p>
            <p className="rounded-full border-2 border-neutral-950 bg-[#c8ff2e] px-3 py-1 text-xs font-extrabold">LIVE</p>
          </div>
          <div className="space-y-3">
            {counts.map(([label, count], index) => (
              <div key={label} className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
                <span className="text-sm font-extrabold text-neutral-500">0{index + 1}</span>
                <span className="border-b border-dashed border-neutral-950/30 pb-1 font-bold text-neutral-700">{label}</span>
                <span className="text-3xl font-black tracking-tight text-neutral-950">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Marquee items={skills} />

      <Reveal>
        <section>
          <SectionTitle number="01" title="Project Slideshow" description="Auto-playing slides built from your existing projects array." />
          <ProjectSlideshow items={projectItems} />
        </section>
      </Reveal>

      {researchItems.length > 0 && (
        <Reveal>
          <section>
            <SectionTitle number="02" title="Research Notes" description="A notebook-style preview of your technical experiments and questions." />
            <div className="grid gap-5 md:grid-cols-3">
              {researchItems.slice(0, 3).map((item, index) => (
                <Card key={index} className={index === 0 ? "md:col-span-2" : ""}>
                  <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-neutral-500">Note {index + 1}</p>
                  <h3 className="mt-4 text-3xl font-black tracking-[-0.04em] text-neutral-950 md:text-4xl">{item.title}</h3>
                  {item.summary && <p className="mt-4 leading-7 text-neutral-600">{item.summary}</p>}
                  <div className="mt-5 flex flex-wrap gap-2">{toList(item.methods).slice(0, 5).map((m) => <Tag key={m}>{m}</Tag>)}</div>
                </Card>
              ))}
            </div>
          </section>
        </Reveal>
      )}
    </div>
  );
}

function ResearchPage() {
  const items = visibleItems(research);

  return (
    <>
      <PageHeader number="01" title="Research" description="Research interests, ongoing work, technical questions, and experiments." />
      {items.length === 0 ? <Empty label="research" /> : (
        <div className="space-y-5">
          {items.map((item, index) => (
            <Reveal key={index} delay={index * 70}>
              <Card>
                <div className="grid gap-6 md:grid-cols-[0.2fr_1fr_0.2fr] md:items-start">
                  <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-neutral-500">/{String(index + 1).padStart(2, "0")}</p>
                  <div>
                    <p className="text-sm font-extrabold text-neutral-500">{[item.area, item.status].filter(Boolean).join(" / ")}</p>
                    <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] text-neutral-950">{item.title}</h2>
                    {item.summary && <p className="mt-5 max-w-4xl leading-8 text-neutral-600">{item.summary}</p>}
                    <div className="mt-5 flex flex-wrap gap-2">{toList(item.methods).map((method) => <Tag key={method}>{method}</Tag>)}</div>
                  </div>
                  <LinkButton href={item.link}>Link</LinkButton>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      )}
    </>
  );
}

function ProjectsPage() {
  const items = visibleItems(projects);
  const categories = ["All", ...new Set(items.map((item) => item.category).filter(Boolean))];
  const [category, setCategory] = useState("All");
  const filtered = category === "All" ? items : items.filter((item) => item.category === category);

  return (
    <>
      <PageHeader number="02" title="Projects" description="Personal projects, technical experiments, and independent builds." />
      {items.length === 0 ? <Empty label="projects" /> : (
        <>
          <Reveal className="mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`button rounded-full border-2 px-4 py-2 text-sm font-extrabold transition ${
                    category === item
                      ? "border-neutral-950 bg-neutral-950 text-[#fffaf0]"
                      : "border-neutral-950/30 bg-[#fffaf0] text-neutral-600 hover:border-neutral-950 hover:text-neutral-950"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2">
            {filtered.map((project, index) => (
              <Reveal key={`${project.title}-${index}`} delay={index * 50}>
                <Card className={index % 3 === 0 ? "md:col-span-2" : ""}>
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-neutral-500">/{String(index + 1).padStart(2, "0")}</p>
                    <p className="rounded-full border-2 border-neutral-950 px-3 py-1 text-xs font-extrabold">
                      {[project.category, project.status].filter(Boolean).join(" / ") || "Project"}
                    </p>
                  </div>
                  <h2 className="text-4xl font-black leading-tight tracking-[-0.04em] text-neutral-950 md:text-5xl">{project.title}</h2>
                  {project.description && <p className="mt-5 max-w-4xl leading-8 text-neutral-600">{project.description}</p>}
                  <div className="mt-6 flex flex-wrap gap-2">{toList(project.tools).map((tool) => <Tag key={tool}>{tool}</Tag>)}</div>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <LinkButton href={project.github}>GitHub</LinkButton>
                    <LinkButton href={project.demo}>Demo / Writeup</LinkButton>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </>
      )}
    </>
  );
}

function CourseProjectsPage() {
  const items = visibleItems(courseProjects);

  return (
    <>
      <PageHeader number="03" title="Course Projects" description="Academic projects and course assignments worth showing publicly." />
      {items.length === 0 ? <Empty label="course projects" /> : (
        <div className="grid gap-5 md:grid-cols-2">
          {items.map((project, index) => (
            <Reveal key={index} delay={index * 55}>
              <Card>
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-neutral-500">/{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-5 text-sm font-extrabold text-neutral-500">
                  {[project.course, project.semester && `Semester ${project.semester}`].filter(Boolean).join(" / ")}
                </p>
                <h2 className="mt-3 text-4xl font-black leading-tight tracking-[-0.04em] text-neutral-950">{project.title}</h2>
                {project.description && <p className="mt-5 leading-8 text-neutral-600">{project.description}</p>}
                <div className="mt-6 flex flex-wrap gap-2">{toList(project.skills).map((skill) => <Tag key={skill}>{skill}</Tag>)}</div>
                <div className="mt-7"><LinkButton href={project.link}>Link</LinkButton></div>
              </Card>
            </Reveal>
          ))}
        </div>
      )}
    </>
  );
}

function CoursesPage() {
  const items = visibleItems(courses);
  const semesters = [...new Set(items.map((course) => course.semester || "Other"))];

  return (
    <>
      <PageHeader number="04" title="Courses" description="Courses organized by semester." />
      {items.length === 0 ? <Empty label="courses" /> : (
        <div className="space-y-10">
          {semesters.map((semester, semesterIndex) => (
            <Reveal key={semester} delay={semesterIndex * 70}>
              <section>
                <SectionTitle number={String(semesterIndex + 1).padStart(2, "0")} title={`Semester ${semester}`} />
                <div className="overflow-hidden rounded-[24px] border-2 border-neutral-950 bg-[#fffaf0]">
                  <table className="w-full border-collapse text-left text-sm">
                    <thead className="bg-neutral-950 text-[#fffaf0]">
                      <tr>
                        <th className="px-4 py-4 font-extrabold">Course</th>
                        <th className="px-4 py-4 font-extrabold">Area</th>
                        <th className="px-4 py-4 font-extrabold">Topics</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.filter((course) => (course.semester || "Other") === semester).map((course, index) => (
                        <tr key={index} className="border-t border-neutral-950/15 transition hover:bg-[#c8ff2e]/35">
                          <td className="px-4 py-4 font-extrabold text-neutral-950">{course.name}</td>
                          <td className="px-4 py-4 text-neutral-600">{course.area}</td>
                          <td className="px-4 py-4 text-neutral-600">{course.topics}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </Reveal>
          ))}
        </div>
      )}
    </>
  );
}

function CodingPage() {
  const items = visibleItems(codingExperience);

  return (
    <>
      <PageHeader number="05" title="Coding" description="Programming languages, tools, frameworks, and technical workflows." />
      {items.length === 0 ? <Empty label="coding experience" /> : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={index} delay={index * 55}>
              <Card>
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-neutral-500">/{String(index + 1).padStart(2, "0")}</p>
                <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.04em] text-neutral-950">{item.title}</h2>
                {item.level && <p className="mt-3 text-sm font-extrabold text-neutral-500">{item.level}</p>}
                {item.description && <p className="mt-5 leading-8 text-neutral-600">{item.description}</p>}
                <div className="mt-6 flex flex-wrap gap-2">{toList(item.skills).map((skill) => <Tag key={skill}>{skill}</Tag>)}</div>
              </Card>
            </Reveal>
          ))}
        </div>
      )}
    </>
  );
}

function ExperiencePage() {
  const items = visibleItems(otherExperience);

  return (
    <>
      <PageHeader number="06" title="Experience" description="Internships, clubs, leadership, writing, volunteering, and non-coding work." />
      {items.length === 0 ? <Empty label="other experience" /> : (
        <div className="space-y-5">
          {items.map((item, index) => (
            <Reveal key={index} delay={index * 60}>
              <Card>
                <div className="grid gap-6 md:grid-cols-[0.2fr_1fr_0.2fr] md:items-start">
                  <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-neutral-500">/{String(index + 1).padStart(2, "0")}</p>
                  <div>
                    <p className="text-sm font-extrabold text-neutral-500">{[item.organization, item.period].filter(Boolean).join(" / ")}</p>
                    <h2 className="mt-3 text-4xl font-black leading-tight tracking-[-0.04em] text-neutral-950">{item.role}</h2>
                    {item.description && <p className="mt-5 max-w-4xl leading-8 text-neutral-600">{item.description}</p>}
                  </div>
                  <LinkButton href={item.link}>Link</LinkButton>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      )}
    </>
  );
}

function BlogPage() {
  const items = visibleItems(blogPosts);
  const [selected, setSelected] = useState(null);
  const post = selected !== null ? items[selected] : null;

  if (post) {
    return (
      <>
        <button onClick={() => setSelected(null)} className="button mb-6 rounded-full border-2 border-neutral-950 bg-[#fffaf0] px-4 py-2 text-sm font-extrabold hover:bg-neutral-950 hover:text-[#fffaf0]">
          ← Back to blog
        </button>
        <Reveal>
          <article className="notebook notebook-lines p-6 pl-20 md:p-10 md:pl-28">
            <div className="rings" aria-hidden="true">
              <span className="ring" />
              <span className="ring" />
              <span className="ring" />
            </div>
            <div className="relative z-10">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-neutral-500">{[post.date, post.tags].filter(Boolean).join(" / ") || "Post"}</p>
              <h1 className="mt-5 text-5xl font-black leading-tight tracking-[-0.05em] text-neutral-950 md:text-7xl">{post.title}</h1>
              {post.summary && <p className="mt-6 max-w-3xl text-xl leading-9 text-neutral-600">{post.summary}</p>}
              {post.content && <div className="mt-10 whitespace-pre-line text-lg leading-9 text-neutral-700">{post.content}</div>}
            </div>
          </article>
        </Reveal>
      </>
    );
  }

  return (
    <>
      <PageHeader number="07" title="Blog" description="Short research posts, notes, essays, and technical explanations." />
      {items.length === 0 ? <Empty label="blog posts" /> : (
        <div className="grid gap-5 md:grid-cols-2">
          {items.map((item, index) => (
            <Reveal key={index} delay={index * 55}>
              <Card>
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-neutral-500">{[item.date, item.tags].filter(Boolean).join(" / ") || `Post ${index + 1}`}</p>
                <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.04em] text-neutral-950">{item.title}</h2>
                {item.summary && <p className="mt-5 leading-8 text-neutral-600">{item.summary}</p>}
                <button onClick={() => setSelected(index)} className="button mt-7 rounded-full border-2 border-neutral-950 bg-neutral-950 px-5 py-3 text-sm font-extrabold text-[#fffaf0] hover:bg-[#c8ff2e] hover:text-neutral-950">
                  Read post ↗
                </button>
              </Card>
            </Reveal>
          ))}
        </div>
      )}
    </>
  );
}

function ContactPage() {
  return (
    <>
      <PageHeader number="08" title="Contact" description="Links and contact information." />
      <Reveal>
        <Card className="bg-neutral-950 text-[#fffaf0] shadow-[10px_10px_0_#c8ff2e] hover:shadow-[10px_10px_0_#c8ff2e]">
          <div className="grid gap-8 md:grid-cols-[1fr_0.8fr] md:items-end">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/50">Open Channel</p>
              <h2 className="mt-5 text-5xl font-black leading-tight tracking-[-0.05em] md:text-7xl">{profile.name || "Your Name"}</h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">{profile.headline}</p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              {profile.email && <a href={`mailto:${profile.email}`} className="button rounded-full border-2 border-[#fffaf0] px-5 py-3 text-sm font-extrabold hover:bg-[#fffaf0] hover:text-neutral-950">Email ↗</a>}
              {profile.github && <a href={profile.github} target="_blank" rel="noreferrer" className="button rounded-full border-2 border-[#fffaf0] px-5 py-3 text-sm font-extrabold hover:bg-[#fffaf0] hover:text-neutral-950">GitHub ↗</a>}
              {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer" className="button rounded-full border-2 border-[#fffaf0] px-5 py-3 text-sm font-extrabold hover:bg-[#fffaf0] hover:text-neutral-950">LinkedIn ↗</a>}
              {profile.resume && <a href={profile.resume} target="_blank" rel="noreferrer" className="button rounded-full border-2 border-[#fffaf0] px-5 py-3 text-sm font-extrabold hover:bg-[#fffaf0] hover:text-neutral-950">Resume ↗</a>}
            </div>
          </div>
        </Card>
      </Reveal>
    </>
  );
}

export default function App() {
  const [page, setPage] = useState(() => window.location.hash.replace("#", "") || "home");

  useEffect(() => {
    function onHashChange() {
      setPage(window.location.hash.replace("#", "") || "home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const pages = useMemo(
    () => ({
      home: <Home />,
      research: <ResearchPage />,
      projects: <ProjectsPage />,
      "course-projects": <CourseProjectsPage />,
      courses: <CoursesPage />,
      coding: <CodingPage />,
      experience: <ExperiencePage />,
      blog: <BlogPage />,
      contact: <ContactPage />,
    }),
    []
  );

  const safePage = pages[page] ? page : "home";

  return (
    <Shell page={safePage} setPage={setPage}>
      {pages[safePage]}
    </Shell>
  );
}
