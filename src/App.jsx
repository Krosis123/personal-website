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

function Tag({ children }) {
  return (
    <span className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600">
      {children}
    </span>
  );
}

function LinkButton({ href, children }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="inline-flex rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-100"
    >
      {children}
    </a>
  );
}

function PageHeader({ title, description }) {
  return (
    <header className="mb-8 border-b border-zinc-200 pb-6">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl">{title}</h1>
      {description && <p className="mt-3 max-w-3xl leading-7 text-zinc-600">{description}</p>}
    </header>
  );
}

function Card({ children }) {
  return <article className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">{children}</article>;
}

function Empty({ label }) {
  return (
    <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center text-zinc-500">
      No {label} added yet.
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
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-5">
          <button onClick={() => go("home")} className="text-left">
            <p className="text-xl font-semibold tracking-tight">{profile.name || "Your Name"}</p>
            <p className="text-sm text-zinc-500">{profile.headline || "Portfolio"}</p>
          </button>

          <nav className="mt-5 flex flex-wrap gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`rounded-lg px-3 py-2 text-sm transition ${
                  page === item.id
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-10">{children}</section>

      <footer className="border-t border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-zinc-500">
          © {new Date().getFullYear()} {profile.name || "Your Name"}
        </div>
      </footer>
    </main>
  );
}

function Home() {
  const counts = [
    ["Projects", visibleItems(projects).length],
    ["Course Projects", visibleItems(courseProjects).length],
    ["Courses", visibleItems(courses).length],
    ["Blog Posts", visibleItems(blogPosts).length],
  ];

  return (
    <>
      <div className="mb-10 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">Portfolio</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950 md:text-5xl">
          {profile.name || "Your Name"}
        </h1>
        <p className="mt-3 text-xl text-zinc-700">{profile.headline || "Computer Science Student"}</p>
        {profile.about && <p className="mt-5 max-w-3xl leading-7 text-zinc-600">{profile.about}</p>}

        <div className="mt-6 flex flex-wrap gap-3">
          <LinkButton href={profile.email ? `mailto:${profile.email}` : ""}>Email</LinkButton>
          <LinkButton href={profile.github}>GitHub</LinkButton>
          <LinkButton href={profile.linkedin}>LinkedIn</LinkButton>
          <LinkButton href={profile.resume}>Resume</LinkButton>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {counts.map(([label, count]) => (
          <Card key={label}>
            <p className="text-sm text-zinc-500">{label}</p>
            <p className="mt-2 text-3xl font-semibold text-zinc-950">{count}</p>
          </Card>
        ))}
      </div>
    </>
  );
}

function ResearchPage() {
  const items = visibleItems(research);

  return (
    <>
      <PageHeader title="Research" description="Research interests, ongoing work, technical questions, and experiments." />
      {items.length === 0 ? (
        <Empty label="research" />
      ) : (
        <div className="space-y-5">
          {items.map((item, index) => (
            <Card key={index}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-zinc-950">{item.title}</h2>
                  <p className="mt-1 text-sm text-zinc-500">
                    {[item.area, item.status].filter(Boolean).join(" · ")}
                  </p>
                </div>
                <LinkButton href={item.link}>Link</LinkButton>
              </div>
              {item.summary && <p className="mt-4 leading-7 text-zinc-600">{item.summary}</p>}
              <div className="mt-4 flex flex-wrap gap-2">
                {toList(item.methods).map((method) => (
                  <Tag key={method}>{method}</Tag>
                ))}
              </div>
            </Card>
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
      <PageHeader title="Projects" description="Personal projects, technical experiments, and independent builds." />
      {items.length === 0 ? (
        <Empty label="projects" />
      ) : (
        <>
          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full border px-3 py-1 text-sm ${
                  category === item ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-300 text-zinc-600"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {filtered.map((project, index) => (
              <Card key={index}>
                <h2 className="text-xl font-semibold text-zinc-950">{project.title}</h2>
                <p className="mt-1 text-sm text-zinc-500">
                  {[project.category, project.status].filter(Boolean).join(" · ")}
                </p>
                {project.description && <p className="mt-4 leading-7 text-zinc-600">{project.description}</p>}
                <div className="mt-4 flex flex-wrap gap-2">
                  {toList(project.tools).map((tool) => (
                    <Tag key={tool}>{tool}</Tag>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <LinkButton href={project.github}>GitHub</LinkButton>
                  <LinkButton href={project.demo}>Demo / Writeup</LinkButton>
                </div>
              </Card>
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
      <PageHeader title="Course Projects" description="Academic projects and course assignments worth showing publicly." />
      {items.length === 0 ? (
        <Empty label="course projects" />
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {items.map((project, index) => (
            <Card key={index}>
              <h2 className="text-xl font-semibold text-zinc-950">{project.title}</h2>
              <p className="mt-1 text-sm text-zinc-500">
                {[project.course, project.semester && `Semester ${project.semester}`].filter(Boolean).join(" · ")}
              </p>
              {project.description && <p className="mt-4 leading-7 text-zinc-600">{project.description}</p>}
              <div className="mt-4 flex flex-wrap gap-2">
                {toList(project.skills).map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
              <div className="mt-5">
                <LinkButton href={project.link}>Link</LinkButton>
              </div>
            </Card>
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
      <PageHeader title="Courses Taken" description="Courses organized by semester." />
      {items.length === 0 ? (
        <Empty label="courses" />
      ) : (
        <div className="space-y-8">
          {semesters.map((semester) => (
            <section key={semester}>
              <h2 className="mb-3 text-lg font-semibold text-zinc-950">Semester {semester}</h2>
              <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
                <table className="w-full border-collapse text-left text-sm">
                  <thead className="bg-zinc-100 text-zinc-700">
                    <tr>
                      <th className="px-4 py-3 font-medium">Course</th>
                      <th className="px-4 py-3 font-medium">Area</th>
                      <th className="px-4 py-3 font-medium">Topics</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items
                      .filter((course) => (course.semester || "Other") === semester)
                      .map((course, index) => (
                        <tr key={index} className="border-t border-zinc-200">
                          <td className="px-4 py-3 font-medium text-zinc-950">{course.name}</td>
                          <td className="px-4 py-3 text-zinc-600">{course.area}</td>
                          <td className="px-4 py-3 text-zinc-600">{course.topics}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </section>
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
      <PageHeader title="Coding Experience" description="Programming languages, tools, frameworks, and technical workflows." />
      {items.length === 0 ? (
        <Empty label="coding experience" />
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {items.map((item, index) => (
            <Card key={index}>
              <h2 className="text-xl font-semibold text-zinc-950">{item.title}</h2>
              {item.level && <p className="mt-1 text-sm text-zinc-500">{item.level}</p>}
              {item.description && <p className="mt-4 leading-7 text-zinc-600">{item.description}</p>}
              <div className="mt-4 flex flex-wrap gap-2">
                {toList(item.skills).map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
            </Card>
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
      <PageHeader title="Other Experience" description="Internships, clubs, leadership, writing, volunteering, and non-coding work." />
      {items.length === 0 ? (
        <Empty label="other experience" />
      ) : (
        <div className="space-y-5">
          {items.map((item, index) => (
            <Card key={index}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-zinc-950">{item.role}</h2>
                  <p className="mt-1 text-sm text-zinc-500">
                    {[item.organization, item.period].filter(Boolean).join(" · ")}
                  </p>
                </div>
                <LinkButton href={item.link}>Link</LinkButton>
              </div>
              {item.description && <p className="mt-4 leading-7 text-zinc-600">{item.description}</p>}
            </Card>
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
        <button onClick={() => setSelected(null)} className="mb-6 text-sm font-medium text-zinc-600 hover:text-zinc-950">
          ← Back to blog
        </button>
        <article className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm text-zinc-500">{[post.date, post.tags].filter(Boolean).join(" · ")}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">{post.title}</h1>
          {post.summary && <p className="mt-4 leading-7 text-zinc-600">{post.summary}</p>}
          {post.content && <div className="mt-8 whitespace-pre-line leading-8 text-zinc-700">{post.content}</div>}
        </article>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Blog" description="Short research posts, notes, essays, and technical explanations." />
      {items.length === 0 ? (
        <Empty label="blog posts" />
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {items.map((item, index) => (
            <Card key={index}>
              <p className="text-sm text-zinc-500">{[item.date, item.tags].filter(Boolean).join(" · ")}</p>
              <h2 className="mt-2 text-xl font-semibold text-zinc-950">{item.title}</h2>
              {item.summary && <p className="mt-4 leading-7 text-zinc-600">{item.summary}</p>}
              <button onClick={() => setSelected(index)} className="mt-5 text-sm font-medium text-zinc-900 underline">
                Read post
              </button>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

function ContactPage() {
  return (
    <>
      <PageHeader title="Contact" description="Links and contact information." />
      <Card>
        <h2 className="text-xl font-semibold text-zinc-950">{profile.name || "Your Name"}</h2>
        <p className="mt-1 text-zinc-600">{profile.headline}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <LinkButton href={profile.email ? `mailto:${profile.email}` : ""}>Email</LinkButton>
          <LinkButton href={profile.github}>GitHub</LinkButton>
          <LinkButton href={profile.linkedin}>LinkedIn</LinkButton>
          <LinkButton href={profile.resume}>Resume</LinkButton>
        </div>
      </Card>
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
