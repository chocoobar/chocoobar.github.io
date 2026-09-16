import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { CursorLayer } from '@/components/CursorLayer';
import { Experience } from '@/components/Experience';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { Navbar } from '@/components/Navbar';
import { Projects } from '@/components/Projects';
import { ScrollProgressBar } from '@/components/ScrollProgressBar';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import { Skills } from '@/components/Skills';
import { useScrollState } from '@/hooks/useScrollState';

const SECTION_IDS = ['home', 'about', 'experience', 'projects', 'skills', 'contact'] as const;

export default function App() {
  const { scrolled, progress, activeId, showBackToTop } = useScrollState(SECTION_IDS);

  return (
    <>
      <ScrollProgressBar progress={progress} />
      <CursorLayer />
      <Navbar scrolled={scrolled} activeId={activeId} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <ScrollToTopButton visible={showBackToTop} />
    </>
  );
}
