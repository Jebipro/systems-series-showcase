import { PROJECTS } from '../data/projects';

export function EvidenceSection() {
  return (
    <section className="section evidence" id="evidence" aria-labelledby="evidence-title">
      <div className="container">
        <header className="section-head reveal">
          <p className="eyebrow">
            <span className="mono">Validation</span> · 검증
          </p>
          <h2 id="evidence-title">검증 근거와 한계</h2>
          <p className="section-lead">
            각 프로젝트를 가장 잘 보여 주는 검증 결과입니다. 수치는 각 저장소의 리뷰·진행 기록에서 가져왔습니다.
          </p>
        </header>
        <div className="evidence-grid">
          {PROJECTS.map((p) => (
            <article key={p.id} className={`evidence-col tone-${p.id} reveal`} aria-labelledby={`evidence-${p.id}`}>
              <h3 id={`evidence-${p.id}`}>
                <span className="index mono">{p.index}</span> {p.title}
                <span className="domain-tag mono">{p.domain}</span>
              </h3>
              <ul className="evidence-list">
                {p.evidence.map((e) => (
                  <li key={e.title}>
                    <span className="figure mono">{e.figure}</span>
                    <span className="evidence-title">{e.title}</span>
                    <span className="evidence-detail">{e.detail}</span>
                  </li>
                ))}
              </ul>
              <p className="scope-note">
                <span className="label">검증 범위</span>
                {p.scopeNote}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
