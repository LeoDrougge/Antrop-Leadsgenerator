'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FramedBlock } from '@/components/exempel/FramedBlock';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

interface AIResponse {
  greeting: string;
  understanding: string;
  approach: {
    title: string;
    description: string;
  }[];
  caseExamples: {
    name: string;
    description: string;
    url: string;
  }[];
  nextSteps: {
    title: string;
    description: string;
  }[];
  closing: string;
}

export default function Result() {
  const router = useRouter();
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [workplace, setWorkplace] = useState('');
  const [need, setNeed] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);

  const greetingRef = useRef<HTMLHeadingElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const understandingHeaderRef = useRef<HTMLParagraphElement>(null);
  const approachHeaderRef = useRef<HTMLHeadingElement>(null);
  const approachDescRef = useRef<HTMLParagraphElement>(null);
  const caseHeaderRef = useRef<HTMLHeadingElement>(null);
  const contactHeaderRef = useRef<HTMLHeadingElement>(null);
  const closingRef = useRef<HTMLParagraphElement>(null);
  const resetButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load data from localStorage
    const storedResponse = localStorage.getItem('antropResponse');
    const storedWorkplace = localStorage.getItem('antropWorkplace');
    const storedNeed = localStorage.getItem('antropNeed');

    if (!storedResponse || !storedWorkplace || !storedNeed) {
      // No data, redirect to home
      router.push('/');
      return;
    }

    try {
      setResponse(JSON.parse(storedResponse));
      setWorkplace(storedWorkplace);
      setNeed(storedNeed);
    } catch {
      router.push('/');
    }
  }, [router]);

  useEffect(() => {
    if (!response) return;

    // Animate greeting with typewriter effect
    if (greetingRef.current) {
      const split = new SplitText(greetingRef.current, { type: 'chars,words' });
      const chars = split.chars;

      chars.forEach((char, i) => {
        const baseDelay = i * 0.048;
        const jitter = (Math.random() - 0.5) * 0.035;
        const delay = baseDelay + jitter;
        const hasStutter = Math.random() > 0.85;
        const hasDoubleRender = Math.random() > 0.92;

        gsap.set(char, { opacity: 0 });

        const tl = gsap.timeline({ delay });

        if (hasStutter) {
          tl.to(char, { opacity: 0.6, duration: 0.02, ease: 'steps(1)' })
            .to(char, { opacity: 0, duration: 0.01, ease: 'steps(1)' })
            .to(char, { opacity: 0.6, duration: 0.02, ease: 'steps(1)' })
            .to(char, { opacity: 0, duration: 0.01, ease: 'steps(1)' });
        }

        tl.to(char, { opacity: 1, duration: 0.01, ease: 'none' });

        if (hasDoubleRender) {
          tl.to(char, { opacity: 0, duration: 0.01, ease: 'steps(1)', delay: 0.02 })
            .to(char, { opacity: 1, duration: 0.01, ease: 'steps(1)' });
        }
      });
    }

    // Show hero image immediately (no animation)
    if (heroImageRef.current) {
      gsap.set(heroImageRef.current, { opacity: 1 });
    }

    // Calculate start delay (after greeting animation)
    const greetingLength = response.greeting.length;
    const greetingAnimationDuration = greetingLength * 0.048 + 0.15;

    // Sequential reveal timeline
    const tl = gsap.timeline({ delay: greetingAnimationDuration });

    // Helper function for glitch animation
    const addGlitchIfRandom = (target: HTMLElement, timeline: gsap.core.Timeline) => {
      if (Math.random() > 0.75) {
        timeline.to(target, {
          x: 2,
          duration: 0.03,
          ease: 'steps(1)',
          yoyo: true,
          repeat: 1,
        });
      }
    };

    // Animate understanding header
    if (understandingHeaderRef.current) {
      gsap.set(understandingHeaderRef.current, { opacity: 0, y: 10 });
      tl.to(understandingHeaderRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.25,
        ease: 'steps(3)',
      });
      addGlitchIfRandom(understandingHeaderRef.current, tl);
    }

    // Animate understanding block
    const understandingBlock = document.querySelector('[data-section="understanding"]');
    if (understandingBlock) {
      gsap.set(understandingBlock, { opacity: 0, y: 10 });
      tl.to(
        understandingBlock,
        {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: 'steps(3)',
        },
        '-=0.13'
      );
      addGlitchIfRandom(understandingBlock as HTMLElement, tl);
    }

    // Animate approach header
    if (approachHeaderRef.current) {
      gsap.set(approachHeaderRef.current, { opacity: 0, y: 10 });
      tl.to(
        approachHeaderRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: 'steps(3)',
        },
        '-=0.08'
      );
      addGlitchIfRandom(approachHeaderRef.current, tl);
    }

    // Animate approach description
    if (approachDescRef.current) {
      gsap.set(approachDescRef.current, { opacity: 0, y: 10 });
      tl.to(
        approachDescRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: 'steps(3)',
        },
        '-=0.13'
      );
      addGlitchIfRandom(approachDescRef.current, tl);
    }

    // Animate approach cards
    const approachCards = document.querySelectorAll('[data-section="approach"]');
    approachCards.forEach((card, index) => {
      gsap.set(card, { opacity: 0, y: 10 });
      tl.to(
        card,
        {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: 'steps(3)',
        },
        index === 0 ? '-=0.13' : '-=0.08'
      );
      addGlitchIfRandom(card as HTMLElement, tl);
    });

    // Animate case header
    if (caseHeaderRef.current) {
      gsap.set(caseHeaderRef.current, { opacity: 0, y: 10 });
      tl.to(
        caseHeaderRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: 'steps(3)',
        },
        '-=0.05'
      );
      addGlitchIfRandom(caseHeaderRef.current, tl);
    }

    // Animate case cards
    const caseCards = document.querySelectorAll('[data-section="case"]');
    caseCards.forEach((card) => {
      gsap.set(card, { opacity: 0, y: 10 });
      tl.to(
        card,
        {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: 'steps(3)',
        },
        '-=0.13'
      );
      addGlitchIfRandom(card as HTMLElement, tl);
    });

    // Animate contact header
    if (contactHeaderRef.current) {
      gsap.set(contactHeaderRef.current, { opacity: 0, y: 10 });
      tl.to(
        contactHeaderRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: 'steps(3)',
        },
        '-=0.05'
      );
      addGlitchIfRandom(contactHeaderRef.current, tl);
    }

    // Animate contact cards
    const contactCards = document.querySelectorAll('[data-section="contact"]');
    contactCards.forEach((card) => {
      gsap.set(card, { opacity: 0, y: 10 });
      tl.to(
        card,
        {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: 'steps(3)',
        },
        '-=0.13'
      );
      addGlitchIfRandom(card as HTMLElement, tl);
    });

    // Animate closing
    if (closingRef.current) {
      gsap.set(closingRef.current, { opacity: 0, y: 10 });
      tl.to(
        closingRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: 'steps(3)',
        },
        '-=0.08'
      );
      addGlitchIfRandom(closingRef.current, tl);
    }

    // Animate reset button
    if (resetButtonRef.current) {
      gsap.set(resetButtonRef.current, { opacity: 0, y: 10 });
      tl.to(
        resetButtonRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: 'steps(3)',
        },
        '-=0.13'
      );
      addGlitchIfRandom(resetButtonRef.current, tl);
    }
  }, [response]);

  const handleContactSubmit = async () => {
    if (!contactEmail || !workplace || !need) {
      setContactError('Vänligen fyll i din email');
      return;
    }

    setContactLoading(true);
    setContactError(null);
    setContactSuccess(false);

    try {
      const res = await fetch('/api/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: contactEmail, workplace, need }),
      });

      const data = await res.json();

      if (res.ok) {
        setContactSuccess(true);
        setContactEmail('');
      } else {
        setContactError(data.error || 'Något gick fel. Försök igen.');
      }
    } catch {
      setContactError('Kunde inte skicka meddelandet. Kontrollera din internetanslutning.');
    } finally {
      setContactLoading(false);
    }
  };

  const handleNewQuestion = () => {
    // Clear localStorage
    localStorage.removeItem('antropResponse');
    localStorage.removeItem('antropWorkplace');
    localStorage.removeItem('antropNeed');

    // Navigate to home
    router.push('/');
  };

  if (!response) {
    return null;
  }

  return (
    <main style={{ backgroundColor: 'var(--app_background)' }} className="min-h-screen">
      <div className="mx-auto flex max-w-[944px] flex-col gap-16 px-6 py-20">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/" className="header-sm cursor-pointer hover:opacity-80 transition-opacity" style={{ color: 'var(--text-muted)' }}>
            Antrop Bot
          </Link>
          <p className="header-sm" style={{ color: 'var(--text-muted)' }}>
            v 0.2
          </p>
        </div>

        {/* Greeting */}
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl space-y-6">
            <h1
              ref={greetingRef}
              className="header-antrop-lg"
              style={{ color: 'var(--text-regular)' }}
            >
              {response.greeting}
            </h1>
          </div>

          <div ref={heroImageRef} className="shrink-0" style={{ width: '218px', height: '196px' }}>
            <Image
              src="/Assets/digital-design-01.png"
              alt="Illustration av digital design"
              width={218}
              height={196}
              className="w-full h-full object-contain"
              priority
            />
          </div>
        </div>

        {/* Understanding */}
        <section className="space-y-6">
          <p ref={understandingHeaderRef} className="header-sm opacity-0" style={{ color: 'var(--text-regular)' }}>
            Vi förstår er utmaning
          </p>

          <FramedBlock
            data-section="understanding"
            leftWidth="w-[100px] md:w-[120px]"
            left={<Image src="/Assets/smiley.svg" alt="Smile" width={44} height={44} />}
            className="flex-col gap-0 md:flex-row md:gap-0 opacity-0"
          >
            <div className="space-y-2">
              <p className="text-antrop-regular" style={{ color: 'var(--text-muted)' }}>
                {response.understanding}
              </p>
            </div>
          </FramedBlock>
        </section>

        {/* Approach */}
        <section className="space-y-6">
          <h3 ref={approachHeaderRef} className="header-sm opacity-0" style={{ color: 'var(--text-regular)' }}>
            Förslag på aktiviteter
          </h3>
          <p ref={approachDescRef} className="text-antrop-regular opacity-0" style={{ color: 'var(--text-muted)' }}>
            Exakt hur vi tar oss an projektet beslutar vi tillsammans, men här är några förslag som brukar ge resultat.
          </p>

          <div>
            {response.approach.map((item, idx) => (
              <FramedBlock
                key={idx}
                hideBorderTop={idx > 0}
                leftWidth="w-[80px] md:w-[120px]"
                data-section="approach"
                left={
                  <span className="header-antrop-lg" style={{ color: 'var(--text-regular)' }}>
                    {idx + 1}
                  </span>
                }
                className="flex-col gap-0 md:flex-row md:gap-0 opacity-0"
              >
                <div className="space-y-2">
                  <h4 className="header-sm" style={{ color: 'var(--text-regular)' }}>
                    {item.title}
                  </h4>
                  <p className="text-antrop-regular" style={{ color: 'var(--text-muted)' }}>
                    {item.description}
                  </p>
                </div>
              </FramedBlock>
            ))}
          </div>
        </section>

        {/* Case Examples */}
        {response.caseExamples && response.caseExamples.length > 0 && (
          <section className="space-y-6">
            <h3 ref={caseHeaderRef} className="header-sm opacity-0" style={{ color: 'var(--text-regular)' }}>
            Case
            </h3>

            <div>
              {response.caseExamples.map((caseItem, idx) => (
                <a
                  key={idx}
                  href={caseItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-colors duration-200"
                  style={{ textDecoration: 'none' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--surface_mid)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--app_background)';
                  }}
                >
                  <FramedBlock
                    hideBorderTop={idx > 0 && response.caseExamples.length > 1}
                    leftWidth="w-[100px] md:w-[120px]"
                    data-section="case"
                    left={<Image src="/Assets/arrow-right.svg" alt="Pil" width={44} height={44} />}
                    className="flex-col gap-0 md:flex-row md:gap-0 opacity-0"
                    background="transparent"
                  >
                    <div className="space-y-2">
                      <h4 className="header-sm" style={{ color: 'var(--text-regular)' }}>
                        {caseItem.name}
                      </h4>
                      <p className="text-antrop-regular" style={{ color: 'var(--text-muted)' }}>
                        {caseItem.description}
                      </p>
                    </div>
                  </FramedBlock>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        <section className="space-y-6">
          <h3 ref={contactHeaderRef} className="header-sm opacity-0" style={{ color: 'var(--text-regular)' }}>
            Låt oss prata vidare!
          </h3>

          {/* Contact form */}
          <FramedBlock
            data-section="contact"
            leftWidth="w-[100px] md:w-[120px]"
            left={<Image src="/Assets/mail.svg" alt="E-post" width={44} height={44} />}
            className="flex-col gap-0 md:flex-row md:gap-0 opacity-0"
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

              <form className="flex flex-col gap-3 md:flex-row" onSubmit={(e) => { e.preventDefault(); handleContactSubmit(); }}>
                <label className="sr-only" htmlFor="contact-email">
                  E-postadress
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
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
                  className="header-sm flex items-center gap-3 whitespace-nowrap bg-transparent px-2 py-3 cursor-pointer disabled:cursor-not-allowed"
                  style={{ color: 'var(--text-regular)' }}
                  disabled={contactLoading}
                >
                  {contactLoading ? 'Skickar…' : 'Skicka'}
                  <Image src="/Assets/arrow-right.svg" alt="Skicka" width={29} height={23} />
                </button>
              </form>

              {contactSuccess && (
                <p className="text-antrop-regular" style={{ color: 'var(--text-regular)' }}>
                  Tack! Vi hör av oss snart.
                </p>
              )}
              {contactError && (
                <p className="text-antrop-regular" style={{ color: 'var(--text-regular)' }}>
                  {contactError}
                </p>
              )}
            </div>
          </FramedBlock>

          {/* Sara Nero card */}
          <FramedBlock
            data-section="contact"
            left={
              <Image src="/Assets/sara.png" alt="Sara Nero" width={80} height={80} className="rounded-full" />
            }
            className="flex-col gap-0 sm:flex-row sm:gap-0 opacity-0"
          >
            <div className="space-y-2">
              <h4 className="header-sm" style={{ color: 'var(--text-regular)' }}>
                Kontakta mig direkt
              </h4>
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

        {/* Disclaimer */}
        <div ref={closingRef} className="opacity-0">
          <p className="text-antrop-regular text-center italic" style={{ color: 'var(--text-muted)' }}>
            Innehållet genereras med stöd av AI och utgår från Antrops arbetssätt och insikter. Se det som inspiration och inte som rådgivning.
          </p>
        </div>

        {/* Reset Button */}
        <div ref={resetButtonRef} className="text-center opacity-0">
          <Button
            onClick={handleNewQuestion}
            variant="outline"
            size="lg"
            className="rounded-full px-8 py-6 text-base"
            style={{
              borderColor: 'var(--text-regular)',
              color: 'var(--text-regular)',
              backgroundColor: 'transparent',
            }}
          >
            Ställ en ny fråga
          </Button>
        </div>
      </div>
    </main>
  );
}
