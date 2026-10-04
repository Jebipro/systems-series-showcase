import { COMPARISON, PROJECTS } from '../data/projects';

export function Comparison() {
  const [lang, db] = PROJECTS;
  return (
    <section className="section compare" id="compare" aria-labelledby="compare-title">
      <div className="container">
        <header className="section-head reveal">
          <p className="eyebrow">
            <span className="mono">Series</span> · 비교
          </p>
          <h2 id="compare-title">두 시스템, 두 가지 질문</h2>
          <p className="section-lead">
            Mini-Lang은 프로그램이 실행되는 규칙(<strong>execution semantics</strong>)을, Mini DB는 데이터가 저장되고
            살아남는 규칙(<strong>storage semantics</strong>)을 따라갑니다.
          </p>
        </header>
        <table className="compare-table reveal">
          <caption className="visually-hidden">Mini-Lang과 Mini DB를 항목별로 비교한 표</caption>
          <thead>
            <tr>
              <th scope="col">
                <span className="visually-hidden">항목</span>
              </th>
              <th scope="col" className="col-mini-lang">
                <span className="index mono">{lang?.index}</span> {lang?.title}
              </th>
              <th scope="col" className="col-mini-db">
                <span className="index mono">{db?.index}</span> {db?.title}
              </th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map((row) => (
              <tr key={row.aspect}>
                <th scope="row">
                  {row.aspect}
                </th>
                <td className="col-mini-lang" data-label={lang?.title}>
                  {row.lang}
                </td>
                <td className="col-mini-db" data-label={db?.title}>
                  {row.db}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
