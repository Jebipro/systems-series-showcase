export function Pipeline({ stages, label }: { stages: string[]; label: string }) {
  return (
    <ol className="pipeline" aria-label={label}>
      {stages.map((stage, i) => (
        <li key={stage}>
          {i > 0 && (
            <span className="pipeline-arrow" aria-hidden="true">
              →
            </span>
          )}
          <span className="pipeline-stage">{stage}</span>
        </li>
      ))}
    </ol>
  );
}
