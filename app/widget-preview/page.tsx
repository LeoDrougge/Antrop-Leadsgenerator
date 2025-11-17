'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

export default function WidgetPreview() {
  const [workplace, setWorkplace] = useState('');
  const [need, setNeed] = useState('');

  const workplaceRef = useRef<HTMLSpanElement>(null);
  const needRef = useRef<HTMLSpanElement>(null);

  const handleSubmit = () => {
    if (!workplace || !need) return;

    // Open in new tab with loading page
    const params = new URLSearchParams({
      workplace,
      need,
    });
    window.open(`/loading?${params.toString()}`, '_blank');
  };

  return (
    <main
      className="min-h-screen flex flex-col gap-1 px-4 sm:px-8 lg:px-20 pb-16"
      style={{ backgroundColor: 'var(--app_background)' }}
    >
      {/* Header */}
      <div className="h-[72px] w-full max-w-[1268px] mx-auto flex">
        <div
          className="flex-1 flex items-center border-b border-dashed"
          style={{ borderColor: 'var(--outline_muted)' }}
        >
          <h1 className="header-sm" style={{ color: 'var(--text-muted)' }}>
            Widget Preview
          </h1>
        </div>
        <div
          className="flex-1 flex items-center justify-end border-b border-dashed"
          style={{ borderColor: 'var(--outline_muted)' }}
        >
          <p className="header-sm" style={{ color: 'var(--text-muted)' }}>
            Test för WordPress
          </p>
        </div>
      </div>

      {/* Demo Content - Simulerar WordPress-sida */}
      <div className="w-full max-w-[1268px] mx-auto mt-12">
        <div className="max-w-3xl">
          <h2 className="header-antrop-lg mb-6" style={{ color: 'var(--text-regular)' }}>
            Detta är en demo-sida för att testa widgeten
          </h2>
          <p className="text-antrop-regular mb-8" style={{ color: 'var(--text-muted)' }}>
            Här nedan ser du hur widgeten kommer se ut när den är inbäddad i WordPress.
            Formuläret öppnar resultatet i en ny flik när du skickar.
          </p>
        </div>

        {/* Widget Container - Detta är vad som kommer inbäddas */}
        <div
          className="mt-12 p-8 border border-dashed rounded-lg"
          style={{
            borderColor: 'var(--outline_muted)',
            backgroundColor: 'rgba(0, 26, 26, 0.3)',
          }}
        >
          {/* Widget Header */}
          <div className="h-[72px] flex mb-8 border-b border-dashed" style={{ borderColor: 'var(--outline_muted)' }}>
            <div className="flex-1 flex items-center border-b border-dashed" style={{ borderColor: 'var(--outline_muted)' }}>
              <span className="header-sm" style={{ color: 'var(--text-muted)' }}>
                Antrop bot
              </span>
            </div>
            <div className="flex-1 flex items-center justify-end border-b border-dashed" style={{ borderColor: 'var(--outline_muted)' }}>
              <span className="header-sm" style={{ color: 'var(--text-muted)' }}>
                v 0.2
              </span>
            </div>
          </div>

          {/* Widget Content */}
          <div className="flex flex-col-reverse sm:flex-row gap-8 sm:gap-6 items-start justify-between">
            {/* Left Column - Form */}
            <div className="flex flex-col gap-12 flex-1">
              {/* Text */}
              <div
                className="header-antrop-lg line-height-relaxed flex flex-wrap gap-x-[0.5em]"
                style={{ color: 'var(--text-regular)' }}
              >
                <span className="whitespace-nowrap">JAG KOMMER FRÅN</span>
                <span
                  ref={workplaceRef}
                  contentEditable
                  suppressContentEditableWarning
                  onInput={(e) => setWorkplace(e.currentTarget.textContent || '')}
                  data-placeholder="MIN ARBETSPLATS"
                  className={`${
                    workplace
                      ? ''
                      : 'empty:before:content-[attr(data-placeholder)]'
                  } cursor-pen underline decoration-[var(--text-regular)] outline-none sm:whitespace-nowrap inline-block`}
                  style={{
                    color: workplace ? 'var(--text-regular)' : 'var(--text-muted)',
                    textDecorationSkipInk: 'none',
                    textUnderlineOffset: '0.2em',
                    caretColor: '#08F9F9',
                    caretShape: 'block',
                  }}
                  onFocus={(e) => {
                    const range = document.createRange();
                    const sel = window.getSelection();
                    range.selectNodeContents(e.currentTarget);
                    sel?.removeAllRanges();
                    sel?.addRange(range);
                  }}
                ></span>
                <span className="whitespace-nowrap">OCH BEHÖVER HJÄLP MED</span>
                <span
                  ref={needRef}
                  contentEditable
                  suppressContentEditableWarning
                  onInput={(e) => setNeed(e.currentTarget.textContent || '')}
                  data-placeholder="MIN UTMANING"
                  className={`${
                    need ? '' : 'empty:before:content-[attr(data-placeholder)]'
                  } cursor-pen underline decoration-[var(--text-regular)] outline-none sm:whitespace-nowrap inline-block`}
                  style={{
                    color: need ? 'var(--text-regular)' : 'var(--text-muted)',
                    textDecorationSkipInk: 'none',
                    textUnderlineOffset: '0.2em',
                    caretColor: '#08F9F9',
                    caretShape: 'block',
                  }}
                  onFocus={(e) => {
                    const range = document.createRange();
                    const sel = window.getSelection();
                    range.selectNodeContents(e.currentTarget);
                    sel?.removeAllRanges();
                    sel?.addRange(range);
                  }}
                ></span>
              </div>

              {/* Button and Disclaimer */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleSubmit}
                  disabled={!workplace || !need}
                  className="header-sm flex items-center justify-center gap-7 px-12 py-4 rounded-full w-full sm:w-fit sm:min-w-[308px] transition-opacity disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: 'var(--text-regular)',
                    color: 'var(--app_background)',
                    border: '1.283px solid #0f3951',
                  }}
                >
                  <span>Se hur vi kan hjälpa dig</span>
                  <Image src="/Assets/arrow-free.svg" alt="Arrow" width={27} height={22} />
                </button>

                {/* AI Disclaimer */}
                <p className="text-antrop-regular" style={{ color: 'var(--text-muted)' }}>
                  Svaren skapas med hjälp av AI.
                </p>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="flex items-center justify-center flex-shrink-0 w-full sm:w-auto">
              <Image
                src="/Assets/start-illu.png"
                alt="Start illustration"
                width={218}
                height={196}
                className="w-[218px] h-[196px] object-contain"
              />
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 p-6 rounded-lg" style={{ backgroundColor: 'rgba(175, 221, 217, 0.1)' }}>
          <h3 className="header-sm mb-4" style={{ color: 'var(--text-regular)' }}>
            📋 WordPress Integration
          </h3>
          <p className="text-antrop-regular mb-4" style={{ color: 'var(--text-muted)' }}>
            För att använda widgeten i WordPress, lägg in detta i en HTML-block eller custom HTML widget:
          </p>
          <pre
            className="p-4 rounded text-sm overflow-x-auto"
            style={{
              backgroundColor: 'var(--app_background)',
              color: 'var(--text-regular)',
              border: '1px solid var(--outline_muted)',
            }}
          >
            {`<div data-antrop-widget></div>
<script src="https://antrop-leadsgenerator-4syq.vercel.app/embed.js"></script>`}
          </pre>
        </div>
      </div>
    </main>
  );
}

