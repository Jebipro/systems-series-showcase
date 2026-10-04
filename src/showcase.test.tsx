import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { App } from './App';
import { ProjectLinks } from './components/ProjectLinks';
import { PROJECTS, publishedUrl, type Project } from './data/projects';

const html = renderToStaticMarkup(<App />);

function project(id: Project['id']): Project {
  const found = PROJECTS.find((p) => p.id === id);
  if (!found) throw new Error(`missing project ${id}`);
  return found;
}

describe('page structure', () => {
  it('renders the hero and every core section', () => {
    expect(html).toContain('<h1 id="hero-title">시스템을 만들고, 내부 동작이 보이게 만들었습니다.</h1>');
    for (const id of ['top', 'overview', 'mini-lang', 'mini-db', 'compare', 'process', 'evidence']) {
      expect(html).toContain(`id="${id}"`);
    }
  });

  it('renders exactly two projects, in series order', () => {
    expect(PROJECTS.map((p) => p.id)).toEqual(['mini-lang', 'mini-db']);
    expect(html.indexOf('id="mini-lang"')).toBeLessThan(html.indexOf('id="mini-db"'));
  });

  it('renders project data: question, highlight, built items and screenshots with alt text', () => {
    for (const p of PROJECTS) {
      expect(html).toContain(p.question);
      expect(html).toContain(p.highlight);
      for (const item of p.built) expect(html).toContain(item);
      for (const shot of [p.lead, ...p.supporting]) {
        expect(shot.alt.length).toBeGreaterThan(20);
        expect(html).toContain(`src="${shot.src}"`);
        // relative path: works under any deployment base
        expect(shot.src.startsWith('/')).toBe(false);
      }
    }
  });

  it('states the Mini DB validation scope and avoids overclaiming', () => {
    expect(html).toContain('실제 전원 차단(power loss) 상황은 테스트하지 않았고');
    expect(html.toLowerCase()).not.toMatch(/production-grade|power-loss safe|crash-proof|프로덕션 수준|전원이 꺼져도 안전/);
  });

  it('has a single h1 and every image has alt text', () => {
    expect(html.match(/<h1[\s>]/g)).toHaveLength(1);
    const imgs = html.match(/<img [^>]*>/g) ?? [];
    expect(imgs.length).toBe(6);
    for (const img of imgs) expect(img).toMatch(/alt="[^"]+"/);
  });
});

describe('project links', () => {
  it('renders the four published CTAs as real external links', () => {
    const expected = [
      ['https://jebipro.github.io/mini-lang-execution-visualizer/', 'Execution Visualizer 열기'],
      ['https://github.com/Jebipro/mini-lang', 'GitHub 저장소 보기'],
      ['https://jebipro.github.io/mini-db-durability-visualizer/', 'Durability Visualizer 열기'],
      ['https://github.com/Jebipro/mini-db', 'GitHub 저장소 보기'],
    ] as const;
    const external = [...html.matchAll(/<a [^>]*href="(https:[^"]+)"[^>]*>([^<]*)/g)];
    expect(external.map(([, href]) => href)).toEqual(expected.map(([href]) => href));
    for (const [tag, , text] of external) {
      expect(tag).toContain('target="_blank"');
      expect(tag).toContain('rel="noopener noreferrer"');
      expect(expected.some(([, label]) => text?.startsWith(label))).toBe(true);
    }
    expect(html).not.toContain('배포 준비 완료');
    expect(html).not.toContain('아직 공개 전');
  });

  it('creates no fake links, and every in-page anchor has a target', () => {
    expect(html).not.toMatch(/href="#"/);
    for (const [, target] of html.matchAll(/href="#([^"]*)"/g)) {
      expect(html).toContain(`id="${target}"`);
    }
  });

  it('falls back to status lines, not links, when a URL is unset', () => {
    const unpublished: Project = { ...project('mini-lang'), visualizerUrl: null, repositoryUrl: null };
    const out = renderToStaticMarkup(<ProjectLinks project={unpublished} />);
    expect(out).not.toContain('<a ');
    expect(out).toContain('인터랙티브 데모, 배포 준비 완료');
    expect(out).toContain('아직 공개 전');
  });

  it('ignores values that are not absolute http(s) URLs', () => {
    expect(publishedUrl(null)).toBeNull();
    expect(publishedUrl('')).toBeNull();
    expect(publishedUrl('#')).toBeNull();
    expect(publishedUrl('javascript:alert(1)')).toBeNull();
    expect(publishedUrl('TODO')).toBeNull();
    expect(publishedUrl('https://example.org/x')).toBe('https://example.org/x');
  });
});
