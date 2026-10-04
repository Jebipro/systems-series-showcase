import { PROJECTS, SERIES } from '../data/projects';
import { Pipeline } from './Pipeline';

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="container">
        <p className="eyebrow">
          <span className="mono">{SERIES.name}</span> <span className="faint">·</span> 프로젝트 2개
        </p>
        <h1 id="hero-title">{SERIES.headline}</h1>
        <p className="hero-intro">{SERIES.intro}</p>
        <div className="hero-ctas">
          <a className="btn btn-primary" href="#projects">
            프로젝트 살펴보기 <span aria-hidden="true">↓</span>
          </a>
          {PROJECTS.map((p) => (
            <a key={p.id} className="btn btn-ghost" href={`#${p.id}`}>
              {p.title} 보기
            </a>
          ))}
        </div>

        <div className="overview" id="overview">
          {PROJECTS.map((p) => (
            <a key={p.id} className={`overview-card tone-${p.id}`} href={`#${p.id}`} aria-labelledby={`overview-${p.id}`}>
              <div className="overview-head">
                <span className="index mono">{p.index}</span>
                <span className="domain-tag mono">{p.domain}</span>
              </div>
              <h2 id={`overview-${p.id}`} className="overview-title">
                {p.title}
                <span className="overview-theme">{p.theme}</span>
              </h2>
              <Pipeline stages={p.pipeline} label={`${p.title} 처리 흐름`} />
              <ul className="keyword-list" aria-label={`${p.title} 핵심 키워드`}>
                {p.keywords.map((k) => (
                  <li key={k}>{k}</li>
                ))}
              </ul>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
