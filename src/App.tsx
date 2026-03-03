import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { About } from "./components/sections/About";
import { Contact } from "./components/sections/Contact";
import { Hero } from "./components/sections/Hero";
import { Projects } from "./components/sections/Projects";
import { Skills } from "./components/sections/Skills";
import { Testimonials } from "./components/sections/Testimonials";
import { Timeline } from "./components/sections/Timeline";

export function App() {
  return (
    <div className="min-h-dvh">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] rounded-md bg-white px-3 py-2 text-sm text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
