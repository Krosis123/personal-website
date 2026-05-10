import { useState, useEffect, useMemo } from "react";
import {
  projects, courseProjects, skills, courses,
  experiences, research, blogPosts,
} from "./data/portfolio";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Courses from "./components/Courses";
import Experiences from "./components/Experiences";
import Research from "./components/Research";
import Blog from "./components/Blog";
import Contact from "./components/Contact";

export default function App() {
  const [page, setPage] = useState(
    () => window.location.hash.replace("#", "") || "home"
  );

  useEffect(() => {
    function onHashChange() {
      setPage(window.location.hash.replace("#", "") || "home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navItems = useMemo(() => {
    const items = [{ id: "home", label: "Home" }];
    if (projects.length || courseProjects.length)
      items.push({ id: "projects", label: "Projects" });
    if (skills.length) items.push({ id: "skills", label: "Skills" });
    if (experiences.length) items.push({ id: "experience", label: "Experience" });
    if (research.length) items.push({ id: "research", label: "Research" });
    if (courses.length) items.push({ id: "courses", label: "Courses" });
    if (blogPosts.length) items.push({ id: "blog", label: "Blog" });
    items.push({ id: "contact", label: "Contact" });
    return items;
  }, []);

  const pageMap = {
    home: <Hero />,
    projects: <Projects />,
    skills: <Skills />,
    courses: <Courses />,
    experience: <Experiences />,
    research: <Research />,
    blog: <Blog />,
    contact: <Contact />,
  };

  const current = pageMap[page] ? page : "home";

  return (
    <div className="min-h-screen bg-surface">
      <Navbar items={navItems} current={current} setPage={setPage} />
      <main>{pageMap[current]}</main>
    </div>
  );
}
