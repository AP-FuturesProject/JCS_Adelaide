'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import FuzzyText from '@/components/FuzzyText';

const FIRST = 'WHO ARE YOU?';
const SECOND = 'WHAT HAVE YOU SACRIFICED?';

const HOLD_FIRST = 2000;
const HOLD_SECOND = 2600;
const FADE = 700;

type Phase = null | 'first' | 'second' | 'out';

export default function LogoReveal({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clear = useCallback(() => {
    for (const id of timers.current) clearTimeout(id);
    timers.current = [];
  }, []);

  const dismiss = useCallback(() => {
    clear();
    setPhase('out');
    timers.current.push(setTimeout(() => setPhase(null), FADE));
  }, [clear]);

  const play = useCallback(() => {
    if (phase) return;
    clear();
    setPhase('first');
    timers.current.push(setTimeout(() => setPhase('second'), HOLD_FIRST));
    timers.current.push(setTimeout(() => setPhase('out'), HOLD_FIRST + HOLD_SECOND));
    timers.current.push(setTimeout(() => setPhase(null), HOLD_FIRST + HOLD_SECOND + FADE));
  }, [phase, clear]);

  useEffect(() => clear, [clear]);

  useEffect(() => {
    if (!phase) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dismiss();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase, dismiss]);

  const phrase = phase === 'second' || phase === 'out' ? SECOND : FIRST;

  return (
    <>
      <div className="logo-wrap" onClick={play}>
        {children}
      </div>

      {phase && (
        <div className={`logo-reveal${phase === 'out' ? ' is-out' : ''}`} onClick={dismiss}>
          {/* Keyed so swapping the line remounts the canvas and the glitch
              intro replays instead of the text simply being swapped out. */}
          <FuzzyText
            key={phrase}
            className="logo-reveal__text"
            fontFamily="inherit"
            fontSize="clamp(1.75rem, 8vw, 6rem)"
            fontWeight={400}
            baseIntensity={0.22}
            hoverIntensity={0.55}
            enableHover={false}
            fuzzRange={26}
            colorSplit={0.7}
            sliceSize={2}
            intro
            introDuration={850}
            glitchMode
            glitchInterval={620}
            glitchDuration={170}
          >
            {phrase}
          </FuzzyText>
        </div>
      )}
    </>
  );
}
