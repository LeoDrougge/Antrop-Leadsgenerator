'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const [workplace, setWorkplace] = useState('');
  const [need, setNeed] = useState('');

  const workplaceRef = useRef<HTMLSpanElement>(null);
  const needRef = useRef<HTMLSpanElement>(null);


  const handleSubmit = async () => {
    if (!workplace || !need) return;

    // Save inputs to localStorage and navigate to loading page
    localStorage.setItem('antropWorkplace', workplace);
    localStorage.setItem('antropNeed', need);
    localStorage.removeItem('antropResponse'); // Clear old response

    // Navigate to loading page - it will handle the API call
    router.push('/loading');
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
          <Link href="/" className="header-sm cursor-pointer hover:opacity-80 transition-opacity" style={{ color: 'var(--text-muted)' }}>
            Antrop bot
          </Link>
        </div>
        <div 
          className="flex-1 flex items-center justify-end border-b border-dashed"
          style={{ borderColor: 'var(--outline_muted)' }}
        >
          <p className="header-sm" style={{ color: 'var(--text-muted)' }}>
            v 0.2
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="w-full max-w-[1268px] mx-auto mt-8 flex flex-col-reverse sm:flex-row gap-8 sm:gap-6 items-start justify-between">
        {/* Left Column */}
        <div className="flex flex-col gap-12 flex-1">
          {/* Text */}
          <div className="header-antrop-lg line-height-relaxed flex flex-wrap gap-x-[0.5em]" style={{ color: 'var(--text-regular)' }}>
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
                caretShape: 'block'
              }}
              onFocus={(e) => {
                const range = document.createRange();
                const sel = window.getSelection();
                range.selectNodeContents(e.currentTarget);
                sel?.removeAllRanges();
                sel?.addRange(range);
              }}
            >
            </span>
            <span className="whitespace-nowrap">OCH BEHÖVER HJÄLP MED</span>
            <span
              ref={needRef}
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => setNeed(e.currentTarget.textContent || '')}
              data-placeholder="MIN UTMANING"
              className={`${
                need
                  ? ''
                  : 'empty:before:content-[attr(data-placeholder)]'
              } cursor-pen underline decoration-[var(--text-regular)] outline-none sm:whitespace-nowrap inline-block`}
              style={{ 
                color: need ? 'var(--text-regular)' : 'var(--text-muted)',
                textDecorationSkipInk: 'none',
                textUnderlineOffset: '0.2em',
                caretColor: '#08F9F9',
                caretShape: 'block'
              }}
              onFocus={(e) => {
                const range = document.createRange();
                const sel = window.getSelection();
                range.selectNodeContents(e.currentTarget);
                sel?.removeAllRanges();
                sel?.addRange(range);
              }}
            >
            </span>
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
                border: '1.283px solid #0f3951'
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
    </main>
  );
}
