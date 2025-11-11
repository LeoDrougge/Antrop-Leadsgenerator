'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

const loadingPhrases = [
  'analyserar era behov',
  'utforskar designlösningar',
  'tittar i arkivet',
  'samlar användarinsikter',
  'skissar prototyper',
  'kollar precedensfall',
  'förbereder förslag',
];

export default function Loading() {
  const router = useRouter();
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const particlesContainerRef = useRef<HTMLDivElement>(null);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    if (!textRef.current || !cursorRef.current) return;

    const animatePhrase = (phrase: string) => {
      const tl = gsap.timeline();

      // Reset text
      if (textRef.current) {
        textRef.current.textContent = phrase;
      }

      // 1. Blink cursor 3 times
      tl.to(cursorRef.current, {
        opacity: 0,
        duration: 0.25,
        repeat: 5,
        yoyo: true,
        ease: 'steps(1)',
      });

      // Make cursor solid during typing
      tl.to(cursorRef.current, { opacity: 1, duration: 0 });

      // 2. Typewriter effect with SplitText
      if (textRef.current) {
        const split = new SplitText(textRef.current, { type: 'chars' });
        const chars = split.chars;

        // Hide all chars initially
        gsap.set(chars, { opacity: 0 });

        // Animate each character
        chars.forEach((char, i) => {
          const baseDelay = i * 0.048;
          const jitter = (Math.random() - 0.5) * 0.035;
          const delay = baseDelay + jitter;
          const hasStutter = Math.random() > 0.85;
          const hasDoubleRender = Math.random() > 0.92;

          const charTl = gsap.timeline({ delay });

          if (hasStutter) {
            charTl
              .to(char, { opacity: 0.6, duration: 0.02, ease: 'steps(1)' })
              .to(char, { opacity: 0, duration: 0.01, ease: 'steps(1)' })
              .to(char, { opacity: 0.6, duration: 0.02, ease: 'steps(1)' })
              .to(char, { opacity: 0, duration: 0.01, ease: 'steps(1)' });
          }

          charTl.to(char, { opacity: 1, duration: 0.01, ease: 'none' });

          if (hasDoubleRender) {
            charTl
              .to(char, { opacity: 0, duration: 0.01, ease: 'steps(1)', delay: 0.02 })
              .to(char, { opacity: 1, duration: 0.01, ease: 'steps(1)' });
          }

          tl.add(charTl, 0);
        });

        // 3. Pause after typing (reduced from 1.5s to 0.6s)
        const typingDuration = phrase.length * 0.048 + 0.2;
        tl.to({}, { duration: 0.6 }, `+=${typingDuration}`);

        // 4. Erase in reverse (faster)
        chars.reverse().forEach((char, i) => {
          tl.to(char, { opacity: 0, duration: 0.01, ease: 'steps(1)' }, `-=${0.02 * (chars.length - i - 1)}`);
        });

        // 5. Brief pause before next phrase
        tl.to({}, { duration: 0.3 });
      }

      return tl;
    };

    // Master timeline that cycles through all phrases
    const masterTl = gsap.timeline({
      repeat: -1,
      onRepeat: () => {
        setCurrentPhraseIndex((prev) => (prev + 1) % loadingPhrases.length);
      },
    });

    // Animate first phrase immediately
    masterTl.add(animatePhrase(loadingPhrases[currentPhraseIndex]));

    return () => {
      masterTl.kill();
    };
  }, [currentPhraseIndex]);

  useEffect(() => {
    // Animate hero image on mount
    if (heroImageRef.current) {
      gsap.set(heroImageRef.current, { opacity: 0, y: 10 });
      gsap.to(heroImageRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.25,
        ease: 'steps(3)',
        delay: 0.5,
      });
    }
  }, []);

  useEffect(() => {
    // Create particles
    if (!particlesContainerRef.current) return;

    const container = particlesContainerRef.current;
    const particleCount = 50;
    const particles: HTMLDivElement[] = [];
    let mouseX = -1000;
    let mouseY = -1000;

    // Create particle elements
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = '4px';
      particle.style.height = '4px';
      particle.style.backgroundColor = '#AFDDD9';
      particle.style.pointerEvents = 'none';
      
      // Random starting position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.bottom = '0';
      
      container.appendChild(particle);
      particles.push(particle);

      // Give particles a random starting position in their journey
      const initialProgress = Math.random(); // 0-1
      const startY = -initialProgress * window.innerHeight;
      gsap.set(particle, { y: startY, scale: 1 });

      // Animate particle upward
      const animateParticle = (isFirst = false) => {
        const duration = 10 + Math.random() * 8; // 10-18 seconds
        const xOffset = (Math.random() - 0.5) * 100; // Horizontal drift
        
        gsap.fromTo(
          particle,
          {
            y: isFirst ? startY : 0,
            x: 0,
            opacity: isFirst ? 0.4 : 0,
          },
          {
            y: -window.innerHeight - 200,
            x: xOffset,
            opacity: 0.4,
            duration: isFirst ? duration * (1 - initialProgress) : duration,
            ease: 'none',
            onComplete: () => {
              // Reset and restart
              gsap.set(particle, { y: 0, x: 0, opacity: 0, scale: 1 });
              animateParticle(false);
            },
          }
        );
      };

      animateParticle(true);
    }

    // Mouse move handler for ripple effect
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Check distance and apply ripple effect
    const checkRipple = () => {
      particles.forEach((particle) => {
        const rect = particle.getBoundingClientRect();
        const particleX = rect.left + rect.width / 2;
        const particleY = rect.top + rect.height / 2;

        const dx = mouseX - particleX;
        const dy = mouseY - particleY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const rippleRadius = 150;

        if (distance < rippleRadius) {
          // Scale based on proximity (closer = bigger)
          const scaleFactor = 1 + (rippleRadius - distance) / rippleRadius * 2;
          gsap.to(particle, {
            scale: scaleFactor,
            duration: 0.2,
            ease: 'power2.out',
          });
        } else {
          // Return to normal size
          gsap.to(particle, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    gsap.ticker.add(checkRipple);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.ticker.remove(checkRipple);
      particles.forEach((particle) => {
        gsap.killTweensOf(particle);
        particle.remove();
      });
    };
  }, []);

  useEffect(() => {
    // Make API call when component mounts
    const makeApiCall = async () => {
      const workplace = localStorage.getItem('antropWorkplace');
      const need = localStorage.getItem('antropNeed');

      if (!workplace || !need) {
        // No data, redirect to home
        router.push('/');
        return;
      }

      try {
        const res = await fetch('/api/ask-antrop', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ workplace, need }),
        });

        const data = await res.json();

        if (res.ok) {
          // Save response to localStorage
          localStorage.setItem('antropResponse', JSON.stringify(data));

          // Navigate to result page
          router.push('/result');
        } else {
          // Handle error - redirect back to home
          console.error('API error:', data.error);
          router.push('/');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        router.push('/');
      }
    };

    makeApiCall();
  }, [router]);

  return (
    <main style={{ backgroundColor: 'var(--app_background)' }} className="min-h-screen relative overflow-hidden">
      {/* Particles container */}
      <div ref={particlesContainerRef} className="absolute inset-0 pointer-events-none" />
      
      <div className="mx-auto flex max-w-[944px] flex-col gap-16 px-6 py-20 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/" className="header-sm cursor-pointer hover:opacity-80 transition-opacity" style={{ color: 'var(--text-muted)' }}>
            Antrop Bot
          </Link>
          <p className="header-sm" style={{ color: 'var(--text-muted)' }}>
            v 0.2
          </p>
        </div>

        {/* Loading text */}
        <div>
          <h1 className="header-antrop-lg" style={{ color: 'var(--text-regular)' }}>
            <span ref={cursorRef}>&gt;</span>
            <span ref={textRef}>{loadingPhrases[currentPhraseIndex]}</span>
          </h1>
        </div>
      </div>
    </main>
  );
}
