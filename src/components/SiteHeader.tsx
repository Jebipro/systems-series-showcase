const NAV = [
  { href: '#mini-lang', label: 'Mini-Lang' },
  { href: '#mini-db', label: 'Mini DB' },
  { href: '#compare', label: '비교' },
  { href: '#process', label: '개발 과정' },
  { href: '#evidence', label: '검증' },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#top">
          <span className="brand-mark" aria-hidden="true">
            <span className="mark-lang" />
            <span className="mark-db" />
          </span>
          Systems Series
        </a>
        <nav aria-label="섹션">
          <ul className="nav-list">
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
