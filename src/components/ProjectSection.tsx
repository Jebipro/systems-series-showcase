import type { Project } from '../data/projects';
import { ProjectLinks } from './ProjectLinks';
import { Screenshot } from './Screenshot';

export function ProjectSection({ project }: { project: Project }) {
  const titleId = `${project.id}-title`;
  return (
    <section className={`project tone-${project.id}`} id={project.id} aria-labelledby={titleId}>
      <div className="container">
        <header className="project-head reveal">
          <p className="eyebrow">
            <span className="index mono">{project.index}</span> <span className="faint">/</span> {project.theme}
            <span className="domain-tag">{project.domain}</span>
          </p>
          <h2 id={titleId}>{project.title}</h2>
          <p className="project-tagline">{project.tagline}</p>
        </header>

        <div className="reveal">
          <Screenshot shot={project.lead} priority />
        </div>

        <div className="project-body reveal">
          <div className="project-story">
            <h3 className="label">핵심 질문</h3>
            <p className="question">{project.question}</p>
            <h3 className="label">{project.visualizerName}</h3>
            <p className="highlight">{project.highlight}</p>
            <ProjectLinks project={project} />
          </div>
          <div className="project-built">
            <h3 className="label">구현한 핵심 요소</h3>
            <ul className="built-list">
              {project.built.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="supporting reveal">
          {project.supporting.map((shot) => (
            <Screenshot key={shot.src} shot={shot} />
          ))}
        </div>
      </div>
    </section>
  );
}
