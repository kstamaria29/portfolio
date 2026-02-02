import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { About } from "./components/sections/About";
import { Contact } from "./components/sections/Contact";
import { Hero } from "./components/sections/Hero";
import { Projects } from "./components/sections/Projects";
import { Reviews } from "./components/sections/Reviews";
import { Skills } from "./components/sections/Skills";

export function App() {
  return (
    <div className="min-h-dvh">
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
