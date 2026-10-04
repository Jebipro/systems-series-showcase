import type { Screenshot as Shot } from '../data/projects';

/** A framed screenshot. Clicking opens the full-resolution image, which matters on narrow screens. */
export function Screenshot({ shot, priority = false }: { shot: Shot; priority?: boolean }) {
  return (
    <figure className="shot">
      <a className="shot-frame" href={shot.src} target="_blank" rel="noopener">
        <img
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
        <span className="visually-hidden"> (새 탭에서 원본 크기 이미지 열기)</span>
      </a>
      <figcaption>
        {shot.caption}
        <span className="shot-hint"> 이미지를 누르면 원본 크기로 볼 수 있습니다.</span>
      </figcaption>
    </figure>
  );
}
