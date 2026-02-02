import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { About } from "./components/sections/About";
import { Contact } from "./components/sections/Contact";
import { Hero } from "./components/sections/Hero";
import { Projects } from "./components/sections/Projects";
import { Reviews } from "./components/sections/Reviews";

export function App() {
  return (
    <div className="min-h-dvh">
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

