import { publishedUrl, type Project } from '../data/projects';

/**
 * CTAs for a project. A link is rendered only for a real published URL; otherwise a status line says the
 * demo or repository is not public yet. There is never an `href="#"` stand-in.
 */
export function ProjectLinks({ project }: { project: Project }) {
  const demo = publishedUrl(project.visualizerUrl);
  const repo = publishedUrl(project.repositoryUrl);
  return (
    <div className="project-links">
      {demo ? (
        <a className="btn btn-primary" href={demo} target="_blank" rel="noopener noreferrer">
          {project.visualizerName} 열기 <span aria-hidden="true">↗</span>
        </a>
      ) : (
        <p className="status-line" data-status="demo-pending">
          <span className="status-dot" aria-hidden="true" />
          <span>
            <strong>{project.visualizerName}</strong> · 인터랙티브 데모, 배포 준비 완료
          </span>
        </p>
      )}
      {repo ? (
        <a className="btn btn-ghost" href={repo} target="_blank" rel="noopener noreferrer">
          GitHub 저장소 보기 <span aria-hidden="true">↗</span>
        </a>
      ) : (
        <p className="status-line muted" data-status="repo-pending">
          <span className="status-dot" aria-hidden="true" />
          <span>소스 저장소 · 아직 공개 전</span>
        </p>
      )}
    </div>
  );
}
