'use client';

import { FormEvent, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { FramedBlock } from '@/components/exempel/FramedBlock';
import { useBorderAnimation } from '@/hooks/useBorderAnimation';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

const services = [
  {
    id: '1',
    title: 'Inventering och audit',
    description: 'Kartlägg och analysera befintliga mönster och avvikelser.',
    iconType: 'number' as const,
    iconLabel: '1',
  },
  {
    id: '2',
    title: 'Definiera designprinciper och tokens',
    description: 'Kartlägg och analysera befintliga mönster och avvikelser.',
    iconType: 'number' as const,
    iconLabel: '2',
  },
  {
    id: '3',
    title: 'Bygga och dokumentera komponenter',
    description: 'Kartlägg och analysera befintliga mönster och avvikelser.',
    iconType: 'number' as const,
    iconLabel: '3',
  },
  {
    id: 'note',
    title: 'Obs! Detta är bara några ödmjuka förslag',
    description: 'Exakt hur vi tar oss an projektet beslutar vi tillsammans.',
    iconType: 'illustration' as const,
    iconLabel: 'smiley',
  },
];

const caseStudies = [
  {
    id: 'sj',
    title: 'Designsystem för SJ',
    description:
      'Vi kartlade hela kundresan för SJ och skapade ett designsystem som förbättrade upplevelsen över alla digitala kanaler.',
  },
  {
    id: 'apotea',
    title: 'Designsystem för Apotea',
    description:
      'Vi skapade beteendepersonas och kundresor för Idre Fjäll som hjälpte dem förstå sina besökare bättre och prioritera utvecklingsinsatser.',
  },
];

export default function ExempelMotion() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [heroComplete, setHeroComplete] = useState(false);

  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  const heroParagraphRef = useRef<HTMLParagraphElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const section1HeaderRef = useRef<HTMLParagraphElement>(null);
  const section2HeaderRef = useRef<HTMLParagraphElement>(null);
  const section3HeaderRef = useRef<HTMLParagraphElement>(null);

  useBorderAnimation();

  useLayoutEffect(() => {
    if (!heroHeadingRef.current) {
      return;
    }

    gsap.registerPlugin(SplitText);

    const ctx = gsap.context(() => {
      const element = heroHeadingRef.current;
      if (!element) {
        return;
      }

      const split = new SplitText(element, {
        type: 'chars,lines',
        linesClass: 'split-line',
        reduceWhiteSpace: false,
      });

      gsap.set(element, { opacity: 1 });
      gsap.set(split.chars, { visibility: 'hidden', willChange: 'transform, opacity' });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        onComplete: () => {
          split.revert();
          setHeroComplete(true);
        },
      });

      split.chars.forEach((char, i) => {
        // Varierande timing mellan tecken - mer mekaniskt
        const baseDelay = i * 0.048;
        const jitter = (Math.random() - 0.5) * 0.035;
        const delay = baseDelay + jitter;
        
        const hasStutter = Math.random() > 0.85;
        const hasDoubleRender = Math.random() > 0.92;

        tl.to(
          char,
          {
            visibility: 'visible',
            duration: 0.001,
          },
          delay
        );

        // Dubbel-render: tecken blinkar till och försvinner, sedan kommer tillbaka
        if (hasDoubleRender) {
          tl.to(char, { visibility: 'hidden', duration: 0.001 }, delay + 0.02);
          tl.to(char, { visibility: 'visible', duration: 0.001 }, delay + 0.05);
        }

        // Opacity stutter för mekanisk känsla
        if (hasStutter) {
          tl.to(
            char,
            {
              opacity: 0.6,
              duration: 0.025,
              ease: 'steps(1)',
              yoyo: true,
              repeat: 1,
            },
            delay + 0.01
          );
        }
      });
    }, heroHeadingRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!heroComplete) return;

    const ctx = gsap.context(() => {
      let delay = 0;

      // Hero paragraph
      if (heroParagraphRef.current) {
        gsap.set(heroParagraphRef.current, { opacity: 0, y: 10 });
        gsap.to(heroParagraphRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.25,
          delay,
          ease: 'steps(3)',
        });
        delay += 0.15;
      }

      // Hero image
      if (heroImageRef.current) {
        gsap.set(heroImageRef.current, { opacity: 0, y: 10 });
        gsap.to(heroImageRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.25,
          delay,
          ease: 'steps(3)',
        });
        delay += 0.2;
      }

      // Section 1 header
      if (section1HeaderRef.current) {
        gsap.set(section1HeaderRef.current, { opacity: 0, y: 10 });
        gsap.to(section1HeaderRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.25,
          delay,
          ease: 'steps(3)',
        });
        delay += 0.15;
      }

      // Section 1 cards
      const section1Cards = document.querySelectorAll('[data-section="1"]');
      section1Cards.forEach((card, i) => {
        gsap.set(card, { opacity: 0, y: 10 });
        const hasGlitch = Math.random() > 0.75;
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: hasGlitch ? 0.35 : 0.25,
          delay: delay + i * 0.12,
          ease: 'steps(3)',
          onStart: hasGlitch
            ? () => {
                gsap.to(card, {
                  x: 2,
                  duration: 0.03,
                  yoyo: true,
                  repeat: 2,
                  ease: 'steps(1)',
                });
              }
            : undefined,
        });
      });
      delay += section1Cards.length * 0.12 + 0.1;

      // Section 2 header
      if (section2HeaderRef.current) {
        gsap.set(section2HeaderRef.current, { opacity: 0, y: 10 });
        gsap.to(section2HeaderRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.25,
          delay,
          ease: 'steps(3)',
        });
        delay += 0.15;
      }

      // Section 2 cards
      const section2Cards = document.querySelectorAll('[data-section="2"]');
      section2Cards.forEach((card, i) => {
        gsap.set(card, { opacity: 0, y: 10 });
        const hasGlitch = Math.random() > 0.75;
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: hasGlitch ? 0.35 : 0.25,
          delay: delay + i * 0.12,
          ease: 'steps(3)',
          onStart: hasGlitch
            ? () => {
                gsap.to(card, {
                  x: 2,
                  duration: 0.03,
                  yoyo: true,
                  repeat: 2,
                  ease: 'steps(1)',
                });
              }
            : undefined,
        });
      });
      delay += section2Cards.length * 0.12 + 0.1;

      // Section 3 header
      if (section3HeaderRef.current) {
        gsap.set(section3HeaderRef.current, { opacity: 0, y: 10 });
        gsap.to(section3HeaderRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.25,
          delay,
          ease: 'steps(3)',
        });
        delay += 0.15;
      }

      // Section 3 cards
      const section3Cards = document.querySelectorAll('[data-section="3"]');
      section3Cards.forEach((card, i) => {
        gsap.set(card, { opacity: 0, y: 10 });
        const hasGlitch = Math.random() > 0.75;
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: hasGlitch ? 0.35 : 0.25,
          delay: delay + i * 0.12,
          ease: 'steps(3)',
          onStart: hasGlitch
            ? () => {
                gsap.to(card, {
                  x: 2,
                  duration: 0.03,
                  yoyo: true,
                  repeat: 2,
                  ease: 'steps(1)',
                });
              }
            : undefined,
        });
      });
    });

    return () => ctx.revert();
  }, [heroComplete]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email) {
      setError('Vänligen fyll i din e-postadress.');
      setStatus('idle');
      return;
    }

    setStatus('loading');
    setError(null);

    try {
      const response = await fetch('/api/send-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          workplace: 'Menigo',
          need: 'bygga ett designsystem',
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Kunde inte skicka meddelandet.');
      }

      setStatus('success');
      setEmail('');
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : 'Kunde inte skicka meddelandet.';
      setError(message);
      setStatus('error');
    }
  };

  return (
    <main style={{ backgroundColor: 'var(--app_background)' }} className="min-h-screen">
      <div className="mx-auto flex max-w-[944px] flex-col gap-16 px-6 py-20">
        <div className="flex items-center justify-between">
          <p className="header-sm" style={{ color: 'var(--text-muted)' }}>
            Antrop Bot
          </p>
          <p className="header-sm" style={{ color: 'var(--text-muted)' }}>
            v 0.2
          </p>
        </div>

        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl space-y-6">
            <h1
              ref={heroHeadingRef}
              className="header-antrop-lg opacity-0"
              style={{ color: 'var(--text-regular)' }}
            >
              &gt;Hej Menigo! Så här kan vi hjälpa er göra ett designsystem
            </h1>
            <p ref={heroParagraphRef} className="text-antrop-regular opacity-0" style={{ color: 'var(--text-regular)' }}>
              Att skapa ett designsystem kan kännas stort och komplext. På Antrop har vi erfarenhet av B2B-kunder inom
              livsmedelsbranschen och kan hjälpa dig strukturera och förtydliga digitala lösningar.
            </p>
          </div>

          <div ref={heroImageRef} className="mx-auto w-full max-w-sm opacity-0 md:mx-0 md:w-auto">
            <div style={{ backgroundColor: 'var(--app_background)', padding: '1.25rem' }}>
              <Image
                src="/Assets/digital-design-01.png"
                alt="Illustration av digital design"
                width={499}
                height={353}
                className="h-auto w-full"
                priority
              />
            </div>
          </div>
        </div>

        <section className="space-y-6">
          <p ref={section1HeaderRef} className="header-sm opacity-0" style={{ color: 'var(--text-regular)' }}>
            Saker vi brukar göra
          </p>

          <div>
            {services.map((service) => (
              <FramedBlock
                key={service.id}
                data-section="1"
                left={
                  service.iconType === 'number' ? (
                    <span className="header-antrop-lg" style={{ color: 'var(--text-regular)' }}>
                      {service.iconLabel}
                    </span>
                  ) : (
                    <Image src="/Assets/smiley.svg" alt="Smile" width={44} height={44} />
                  )
                }
                className="flex-col gap-6 md:flex-row md:gap-0 opacity-0"
              >
                <div className="space-y-2">
                  <h3 className="header-sm" style={{ color: 'var(--text-regular)' }}>
                    {service.title}
                  </h3>
                  <p className="text-antrop-regular" style={{ color: 'var(--text-muted)' }}>
                    {service.description}
                  </p>
                </div>
              </FramedBlock>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <p ref={section2HeaderRef} className="header-sm opacity-0" style={{ color: 'var(--text-regular)' }}>
            Saker vi gjort innan
          </p>

          <div>
            {caseStudies.map((item) => (
              <FramedBlock
                key={item.id}
                data-section="2"
                left={<Image src="/Assets/arrow-right.svg" alt="Pil" width={44} height={44} />}
                className="flex-col gap-6 md:flex-row md:gap-0 opacity-0"
              >
                <div className="space-y-2">
                  <h3 className="header-sm" style={{ color: 'var(--text-regular)' }}>
                    {item.title}
                  </h3>
                  <p className="text-antrop-regular" style={{ color: 'var(--text-muted)' }}>
                    {item.description}
                  </p>
                </div>
              </FramedBlock>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <p ref={section3HeaderRef} className="header-sm opacity-0" style={{ color: 'var(--text-regular)' }}>
            Låt oss prata vidare!
          </p>

          <FramedBlock
            data-section="3"
            left={<Image src="/Assets/mail.svg" alt="E-post" width={44} height={44} />}
            className="flex-col gap-6 md:flex-row md:gap-0 opacity-0"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="header-sm" style={{ color: 'var(--text-regular)' }}>
                  Fyll i din epostadress så kontaktar vi dig inom kort
                </h3>
                <p className="text-antrop-regular" style={{ color: 'var(--text-muted)' }}>
                  Vi diskuterar era utmaningar, målgrupper och affärsmål för att skräddarsy uppdraget efter era behov.
                </p>
              </div>

              <form className="flex flex-col gap-3 md:flex-row" onSubmit={handleSubmit}>
                <label className="sr-only" htmlFor="email">
                  E-postadress
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="namn@epost.com"
                  className="cursor-pen text-antrop-regular w-full bg-[var(--text-muted)] px-5 py-3 tracking-[-0.64px] outline-none border border-transparent hover:border-[var(--text-regular)]"
                  style={{ color: 'var(--app_background)' }}
                  onFocus={(event) => {
                    event.target.style.backgroundColor = 'var(--text-regular)';
                    event.target.style.color = 'var(--app_background)';
                  }}
                  onBlur={(event) => {
                    event.target.style.backgroundColor = 'var(--text-muted)';
                    event.target.style.color = 'var(--app_background)';
                  }}
                />
                <button
                  type="submit"
                  className="header-sm flex items-center gap-3 whitespace-nowrap bg-transparent px-2 py-3"
                  style={{ color: 'var(--text-regular)' }}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Skickar…' : 'Skicka'}
                  <Image src="/Assets/arrow-right.svg" alt="Skicka" width={29} height={23} />
                </button>
              </form>

              {status === 'success' && (
                <p className="text-antrop-regular" style={{ color: 'var(--text-regular)' }}>
                  Tack! Vi hör av oss snart.
                </p>
              )}
              {error && (
                <p className="text-antrop-regular" style={{ color: 'var(--text-regular)' }}>
                  {error}
                </p>
              )}
            </div>
          </FramedBlock>

          <FramedBlock
            data-section="3"
            left={
              <Image src="/Assets/sara.png" alt="Sara Nero" width={80} height={80} className="rounded-full" />
            }
            className="flex-col gap-4 sm:flex-row sm:gap-0 opacity-0"
          >
            <div className="space-y-2">
              <h3 className="header-sm" style={{ color: 'var(--text-regular)' }}>
                Kontakta mig direkt
              </h3>
              <div className="text-antrop-regular space-y-1" style={{ color: 'var(--text-muted)' }}>
                <p>
                  <a href="mailto:sara.nero@antrop.se" className="hover:underline" style={{ color: 'var(--text-regular)' }}>
                    sara.nero@antrop.se
                  </a>
                </p>
                <p>
                  <a href="tel:+46730662036" className="hover:underline" style={{ color: 'var(--text-regular)' }}>
                    073-066 20 36
                  </a>
                </p>
              </div>
            </div>
          </FramedBlock>
        </section>
      </div>
    </main>
  );
}

