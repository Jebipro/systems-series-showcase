/**
 * All showcase content lives here. Facts are taken from the project repositories, not written from memory:
 *
 * - mini-lang: README.md, FUZZ_REVIEW.md, CLAUDE_BLIND_REVIEW.md, CROSS_MODEL_REVIEW.md (§0, §6, §8 H1, §9),
 *   ADVERSARIAL_REVIEW.md, PROGRESS.md
 * - mini-lang-execution-visualizer: README.md, docs/images
 * - mini-db: README.md, PROGRESS.md, TESTING.md, REVIEW_PACKET.md, CLAUDE_INDEPENDENT_REVIEW.md
 * - mini-db-durability-visualizer: README.md, src/data/evidence.ts, docs/images
 *
 * Copy is Korean-first; identifiers and core CS terms (WAL, fsync, Environment, closure …) stay in English.
 *
 * Publishing: set `visualizerUrl` / `repositoryUrl` to real https URLs and the CTAs become links.
 * While a value is null the page shows a plain status line instead — never a placeholder link.
 */

export type ProjectId = 'mini-lang' | 'mini-db';

export interface Screenshot {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

export interface Evidence {
  figure: string;
  title: string;
  detail: string;
}

export interface Project {
  id: ProjectId;
  index: string;
  title: string;
  /** Short label used on overview cards: "코드는 어떻게 실행되는가". */
  theme: string;
  /** The domain in one word, shown next to the title so projects are not told apart by colour alone. */
  domain: string;
  tagline: string;
  question: string;
  pipeline: string[];
  keywords: string[];
  built: string[];
  visualizerName: string;
  highlight: string;
  lead: Screenshot;
  supporting: Screenshot[];
  evidence: Evidence[];
  scopeNote: string;
  visualizerUrl: string | null;
  repositoryUrl: string | null;
}

export const SERIES = {
  name: 'Systems Series',
  headline: '시스템을 만들고, 내부 동작이 보이게 만들었습니다.',
  intro:
    'TypeScript로 직접 구현한 두 개의 교육용 시스템 프로젝트입니다. 하나는 코드가 어떻게 실행되는지, 다른 하나는 커밋된 데이터가 crash 이후에도 어떻게 살아남는지를 다룹니다.',
} as const;

export const PROJECTS: Project[] = [
  {
    id: 'mini-lang',
    index: '01',
    title: 'Mini-Lang',
    theme: '코드는 어떻게 실행되는가',
    domain: 'execution',
    tagline: 'lexer부터 interpreter까지 직접 작성한 스크립트 언어입니다. 파싱, scope, closure가 동작하는 과정을 눈으로 확인할 수 있습니다.',
    question: '작성한 소스 코드가 실제로 실행되기까지, 내부에서는 어떤 일이 일어나는가?',
    pipeline: ['Source', 'Tokens', 'AST', 'Environment', 'Closure', 'Output'],
    keywords: ['hand-written lexer', 'recursive-descent parser', 'tree-walk interpreter', 'lexical scope', 'closures', 'source-aware errors'],
    built: [
      '직접 작성한 lexer: token마다 source span과 line:column 위치를 기록',
      'Recursive-descent parser와 타입이 정의된 AST',
      'Tree-walk interpreter: return 값은 completion record로 전달',
      'Lexical Environment, 함수 hoisting, TDZ',
      'Closure, 재귀, 배열',
      'REPL과 소스 위치를 알려 주는 오류 메시지',
    ],
    visualizerName: 'Execution Visualizer',
    highlight:
      '함수가 자신을 만든 호출의 Environment를 closure로 참조하고, 그 호출이 끝난 뒤에도 parent chain을 따라 변수를 찾는 과정을 단계별로 볼 수 있습니다.',
    lead: {
      src: 'images/minilang-closure-capture.png',
      alt: 'Mini-Lang Execution Visualizer의 24단계 중 14단계 화면. fn add가 makeAdder(2) 안에서 만들어지면서 n = 2가 들어 있는 Env #2를 capture합니다. Source, AST, runtime Environment, 설명 패널이 나란히 보입니다.',
      caption: 'Capture 단계: fn add가 makeAdder(2) 안에서 만들어지며 Env #2를 참조합니다.',
      width: 1440,
      height: 1180,
    },
    supporting: [
      {
        src: 'images/minilang-closure-call-lookup.png',
        alt: 'add(10)이 Env #3에서 실행됩니다. n은 Env #3에 없어서 parent인 Env #2까지 올라가 n = 2를 찾습니다.',
        caption: 'Call closure 단계: n을 찾기 위해 Env #3에서 capture된 Env #2로 올라갑니다.',
        width: 1440,
        height: 1180,
      },
      {
        src: 'images/minilang-parse-ast.png',
        alt: 'return n + v를 파싱하는 중의 AST와, 그에 해당하는 소스 범위가 강조된 화면.',
        caption: 'Parse 단계: return n + v의 AST와 대응하는 소스 범위.',
        width: 1440,
        height: 1180,
      },
    ],
    evidence: [
      {
        figure: '18,432건',
        title: 'Deterministic fuzz 사례',
        detail:
          'seed로 재현 가능한 입력을 사례마다 deadline이 있는 별도 child process에서 실행했습니다. crash, hang, host 예외 노출, invariant 위반은 0건이었습니다.',
      },
      {
        figure: '20,000개',
        title: 'Blind review의 무작위 식 비교',
        detail:
          '기존 리뷰 기록을 보지 않은 두 번째 AI 모델이 독립 oracle과 무작위 식 20,000개를 비교해 불일치 0건을 확인했습니다. 이 리뷰에서 경계 조건 버그 2개를 찾아 수정했습니다.',
      },
      {
        figure: 'mutant 14개',
        title: 'Mutation 비교',
        detail:
          'Cross-model review에서 단일 변경 mutant 14개를 만들었습니다. 두 test suite를 합쳐도 1개가 살아남아 테스트 공백으로 기록했고, 테스트 3건을 추가한 뒤 14개 모두 검출됐습니다. mutant는 리뷰어가 의심한 계약 위주로 고른 표본입니다.',
      },
      {
        figure: 'Node 20 · 22 · 24',
        title: '실행 환경',
        detail:
          '단계별로 Windows에서 Node 20·24, 리뷰 중 Linux에서 Node 20·22로 전체 테스트를 실행했습니다. 예제 프로그램 15개는 기대 출력과 비교합니다.',
      },
    ],
    scopeNote:
      'Visualizer는 Mini-Lang의 semantics를 모델로 옮긴 것이며, 고정된 프로그램 2개만 보여 줍니다. token, AST, 출력은 실제 interpreter와 대조해 확인했고, runtime 단계는 직접 작성한 모델입니다.',
    visualizerUrl: null,
    repositoryUrl: null,
  },
  {
    id: 'mini-db',
    index: '02',
    title: 'Mini DB',
    theme: '커밋된 데이터는 어떻게 살아남는가',
    domain: 'storage',
    tagline: '저장 구조, index, crash 이후의 durability에 집중한 단일 프로세스 교육용 데이터베이스입니다.',
    question: '커밋은 정확히 언제부터 안전하게 저장된 것인가? checkpoint 도중 process가 crash하면 어떻게 되는가?',
    pipeline: ['Buffer Cache', 'WAL', 'fsync', 'Data File', 'Crash', 'Recovery'],
    keywords: ['no-steal cache', 'redo-only WAL', 'slotted pages', 'B+tree', 'transactions', 'crash recovery'],
    built: [
      '4 KiB page와 CRC32, slotted heap page',
      'Disk B+tree index (unique / non-unique)',
      'SQL subset: parser, planner, Volcano executor',
      'No-steal Buffer Cache 위에서 동작하는 transaction',
      'Redo-only page-image WAL, checkpoint, recovery',
      '모든 write, fsync, truncate 지점에 crash를 넣는 fault injection',
    ],
    visualizerName: 'Durability Visualizer',
    highlight: '원하는 시점에 데이터베이스를 crash시키고, WAL 기반 recovery를 단계별로 따라갈 수 있습니다.',
    lead: {
      src: 'images/minidb-recovery-replay.png',
      alt: 'Mini DB Durability Visualizer의 recovery 8단계 중 4단계 화면. crash로 Buffer Cache는 사라졌고, WAL에 남은 page 2와 3의 committed frame을 Data File에 다시 씁니다.',
      caption: 'Recovery 단계: crash 이후 WAL의 committed frame을 Data File에 다시 씁니다.',
      width: 1440,
      height: 900,
    },
    supporting: [
      {
        src: 'images/minidb-commit-f4.png',
        alt: 'commit이 durability 경계인 F4에 도달한 화면. WAL frame은 fsync됐지만 Data File에는 아직 이전 page가 남아 있습니다.',
        caption: 'F4 단계: fsync(WAL)이 commit point이며, Data File은 아직 이전 상태입니다.',
        width: 1440,
        height: 900,
      },
      {
        src: 'images/minidb-crash.png',
        alt: 'checkpoint 도중 crash가 난 화면. Buffer Cache는 사라졌고 disk에는 WAL frame과 찢어진(torn) data page가 남아 있습니다.',
        caption: 'Crash 단계: checkpoint 도중 crash가 나서 Data File의 마지막 write가 일부만 남았습니다.',
        width: 1440,
        height: 900,
      },
    ],
    evidence: [
      {
        figure: '902 + 약 3,000',
        title: 'Crash fault injection',
        detail:
          'page 수준 902건, SQL 수준 약 3,000건의 사례에서 모든 write, fsync, truncate 지점에 crash를 넣었습니다. 미동기화 write의 유실, 유지, 찢김, 무작위 일부 반영 정책을 적용했고, 다시 열었을 때 integrity check를 통과해야 합니다.',
      },
      {
        figure: '약 4,100 + 약 1,180',
        title: 'Recovery 도중 재crash',
        detail: 'recovery 자체를 중간에 다시 crash시키고 재시작합니다(이중 crash 약 160건 포함). 그래도 같은 상태로 수렴해야 합니다.',
      },
      {
        figure: '200 + 200 + 50 seed',
        title: 'Model-based 무작위 테스트',
        detail:
          '기본 설정의 무작위 suite 3개입니다. seed마다 무작위 SQL 1,000문장(transaction, rollback, index, reopen)을 실행하고, 엔진과 코드를 공유하지 않는 참조 모델과 결과를 비교합니다.',
      },
      {
        figure: '10 / 11',
        title: '리뷰 단계 mutant 검출',
        detail:
          '일부러 결함을 넣은 엔진 11개 중 10개를 테스트가 잡았고, 살아남은 1개는 새 테스트를 추가해 해결했습니다. 검사는 Windows 11의 Node 24와 Node 20에서 통과했습니다.',
      },
    ],
    scopeNote:
      'Durability는 시뮬레이션한 파일 시스템 장애 모델과 단일 프로세스 범위 안에서 검증했습니다. 실제 전원 차단(power loss) 상황은 테스트하지 않았고, Windows에서만 실행했습니다.',
    visualizerUrl: null,
    repositoryUrl: null,
  },
];

/** "두 시스템, 두 가지 질문": one row per aspect, Mini-Lang left, Mini DB right. */
export interface ComparisonRow {
  aspect: string;
  lang: string;
  db: string;
}

export const COMPARISON: ComparisonRow[] = [
  { aspect: '질문', lang: '문법이 어떻게 실행으로 바뀌는가?', db: '커밋이 어떻게 durable해지는가?' },
  { aspect: 'Semantics', lang: 'Execution semantics (실행 규칙)', db: 'Storage semantics (저장 규칙)' },
  { aspect: '구조', lang: 'Lexer · Parser · AST', db: 'Pages · WAL · B+tree' },
  { aspect: 'Runtime', lang: 'Environment · Closure', db: 'Transaction · Recovery' },
  { aspect: '실패 처리', lang: '소스 위치를 알려 주는 오류', db: 'Crash fault injection' },
  { aspect: '데모', lang: 'Execution Visualizer', db: 'Durability Visualizer' },
];

export interface ProcessStep {
  name: string;
  summary: string;
  /** Where the step is visible in each repository. */
  lang: string;
  db: string;
}

export const PROCESS: ProcessStep[] = [
  {
    name: 'Design',
    summary: '구현 전에 semantics, invariant, 위험 요소를 문서로 먼저 정했습니다.',
    lang: 'DESIGN_REVIEW.md · 위험 40개',
    db: 'DESIGN_REVIEW.md (rev1)',
  },
  {
    name: 'Implement',
    summary: 'parser나 storage library에 맡기지 않고 핵심 메커니즘을 직접 구현했습니다.',
    lang: 'lexer.ts · parser.ts',
    db: 'runtime 의존성 0개',
  },
  {
    name: 'Test',
    summary: '프로젝트에 맞춰 fuzz, model-based, crash, 대상별 테스트를 골라 썼습니다.',
    lang: 'fuzz campaign',
    db: 'crash + model 테스트',
  },
  {
    name: 'Review',
    summary: '적대적 리뷰(adversarial review)로 경계 조건의 버그와 테스트 공백을 찾았습니다.',
    lang: 'blind + cross-model 리뷰',
    db: '적대적 자기 리뷰',
  },
  {
    name: 'Visualize',
    summary: '각 프로젝트의 핵심 개념을 단계별 인터랙티브 데모로 만들었습니다.',
    lang: 'Execution Visualizer',
    db: 'Durability Visualizer',
  },
];

export const AI_NOTE =
  '두 프로젝트의 코드, 테스트, 리뷰, 문서는 대부분 AI 코딩 에이전트가 작성했습니다. 작성자는 단계별 지시서를 쓰고, 범위를 정하고, 적대적 리뷰를 요청하고, 결과를 받아들일지 판단했습니다. 리뷰 역시 사람이 아니라 별도 지시를 받은 AI 에이전트가 수행했으며, Mini-Lang에는 다른 모델의 리뷰도 포함됩니다. 대신 설계 결정, 테스트 근거, 한계와 검증 결과를 저장소에 기록해 결과물을 설명할 수 있는 형태로 남겼습니다.';

/** Returns the URL only if it is an absolute http(s) URL; anything else is treated as "not published". */
export function publishedUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:' ? parsed.href : null;
  } catch {
    return null;
  }
}
