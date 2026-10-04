import { Comparison } from './components/Comparison';
import { EvidenceSection } from './components/EvidenceSection';
import { Hero } from './components/Hero';
import { Process } from './components/Process';
import { ProjectSection } from './components/ProjectSection';
import { SiteHeader } from './components/SiteHeader';
import { PROJECTS } from './data/projects';
import { useReveal } from './useReveal';

export function App() {
  useReveal();
  return (
    <>
      <a className="skip-link" href="#projects">
        프로젝트로 바로 가기
      </a>
      <SiteHeader />
      <main>
        <Hero />
        <div id="projects">
          {PROJECTS.map((project) => (
            <ProjectSection key={project.id} project={project} />
          ))}
        </div>
        <Comparison />
        <Process />
        <EvidenceSection />
      </main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <p>
            <span className="mono">Systems Series</span> · Mini-Lang과 Mini DB는 TypeScript로 작성한 교육용 프로젝트입니다.
          </p>
          <p className="muted">코드는 각 GitHub 저장소에서, Visualizer는 GitHub Pages에서 볼 수 있습니다.</p>
        </div>
      </footer>
    </>
  );
}
