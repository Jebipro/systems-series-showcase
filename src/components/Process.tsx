import { AI_NOTE, PROCESS } from '../data/projects';

export function Process() {
  return (
    <section className="section process" id="process" aria-labelledby="process-title">
      <div className="container">
        <header className="section-head reveal">
          <p className="eyebrow">개발 과정</p>
          <h2 id="process-title">Design → Implement → Test → Review → Visualize</h2>
          <p className="section-lead">두 프로젝트 모두 같은 다섯 단계를 거쳤고, 단계마다 저장소에 기록이 남아 있습니다.</p>
        </header>
        <ol className="process-steps reveal">
          {PROCESS.map((step, i) => (
            <li key={step.name} className="process-step">
              <span className="step-num mono">{String(i + 1).padStart(2, '0')}</span>
              <h3>{step.name}</h3>
              <p>{step.summary}</p>
              <dl className="step-refs mono">
                <div>
                  <dt>Mini-Lang</dt>
                  <dd>{step.lang}</dd>
                </div>
                <div>
                  <dt>Mini DB</dt>
                  <dd>{step.db}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
        <aside className="ai-note reveal" aria-labelledby="ai-note-title">
          <h3 id="ai-note-title" className="label">
            AI 사용에 대하여
          </h3>
          <p>{AI_NOTE}</p>
        </aside>
      </div>
    </section>
  );
}
