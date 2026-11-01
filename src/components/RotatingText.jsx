import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// Lightweight rotating text: same look as before (characters slide in from below
// and out to the top, staggered), done with CSS animations instead of the `motion`
// library so the page ships ~120 KB less JavaScript.
// Keyframes live in src/styles/global.css (rt-in / rt-out).

const ENTER_MS = 350;
const EXIT_MS = 250;

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

function splitIntoCharacters(text) {
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
    return Array.from(segmenter.segment(text), (s) => s.segment);
  }
  return Array.from(text);
}

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function RotatingText({
  texts,
  rotationInterval = 2000,
  staggerDuration = 0,
  staggerFrom = 'first',
  mainClassName,
  splitLevelClassName,
  elementLevelClassName,
}) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState('idle'); // idle (first render, no animation) | in | out
  const [width, setWidth] = useState(null);
  const measureRef = useRef(null);

  const words = texts[index].split(' ').map((word) => splitIntoCharacters(word));
  const total = words.reduce((n, w) => n + w.length, 0);

  const delayFor = (i) => {
    if (staggerFrom === 'last') return (total - 1 - i) * staggerDuration;
    if (staggerFrom === 'center') return Math.abs(Math.floor(total / 2) - i) * staggerDuration;
    if (typeof staggerFrom === 'number') return Math.abs(staggerFrom - i) * staggerDuration;
    return i * staggerDuration;
  };

  // Rotate: play the exit animation, then swap the text and play the enter animation.
  useEffect(() => {
    if (texts.length < 2) return;
    let swapTimer;
    const id = setInterval(() => {
      setPhase('out');
      swapTimer = setTimeout(() => {
        setIndex((i) => (i + 1) % texts.length);
        setPhase('in');
      }, EXIT_MS + total * staggerDuration * 1000);
    }, rotationInterval);
    return () => {
      clearInterval(id);
      clearTimeout(swapTimer);
    };
  }, [texts.length, rotationInterval, staggerDuration, total]);

  // Animate the pill's width to fit the new text.
  useIsoLayoutEffect(() => {
    if (measureRef.current) setWidth(measureRef.current.scrollWidth);
  }, [index]);

  let charIndex = 0;
  const animationClass = phase === 'in' ? 'rt-char-in' : phase === 'out' ? 'rt-char-out' : '';

  return (
    <span
      className={cn('relative inline-flex whitespace-pre', mainClassName)}
    >
      <span className="sr-only">{texts[index]}</span>
      <span
        aria-hidden="true"
        className="rt-width inline-flex justify-center"
        style={width != null ? { width: `${width}px` } : undefined}
      >
      <span ref={measureRef} key={index} className="relative inline-flex flex-nowrap shrink-0">
        {words.map((chars, w) => (
          <span key={w} className={cn('inline-flex', splitLevelClassName)}>
            {chars.map((char) => {
              const i = charIndex++;
              return (
                <span
                  key={i}
                  className={cn('inline-block', animationClass, elementLevelClassName)}
                  style={{
                    animationDelay: `${delayFor(i)}s`,
                    animationDuration: `${phase === 'out' ? EXIT_MS : ENTER_MS}ms`,
                  }}
                >
                  {char}
                </span>
              );
            })}
            {w !== words.length - 1 && <span className="whitespace-pre"> </span>}
          </span>
        ))}
      </span>
      </span>
    </span>
  );
}
