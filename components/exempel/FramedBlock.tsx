import { ReactNode } from 'react';

interface FramedBlockProps {
  left: ReactNode;
  children: ReactNode;
  background?: string;
  className?: string;
  leftBackground?: string;
  'data-section'?: string;
  hideBorderTop?: boolean;
  leftWidth?: string;
}

export function FramedBlock({
  left,
  children,
  background = 'var(--app_background)',
  leftBackground,
  className = '',
  'data-section': dataSection,
  hideBorderTop = false,
  leftWidth = 'w-[120px]',
}: FramedBlockProps) {
  return (
    <div 
      className={`relative flex items-stretch ${className}`} 
      style={{ backgroundColor: background }}
      data-section={dataSection}
    >
      {/* SVG Border */}
      <svg
        className="absolute inset-0 pointer-events-none"
        width="100%"
        height="100%"
        style={{ overflow: 'visible' }}
      >
        {/* Outer border */}
        {hideBorderTop ? (
          <>
            {/* Right border */}
            <line
              x1="100%"
              y1="0"
              x2="100%"
              y2="100%"
              stroke="var(--outline_muted)"
              strokeWidth="1"
              strokeDasharray="14 6"
              vectorEffect="non-scaling-stroke"
            />
            {/* Bottom border */}
            <line
              x1="0"
              y1="100%"
              x2="100%"
              y2="100%"
              stroke="var(--outline_muted)"
              strokeWidth="1"
              strokeDasharray="14 6"
              vectorEffect="non-scaling-stroke"
            />
            {/* Left border */}
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="100%"
              stroke="var(--outline_muted)"
              strokeWidth="1"
              strokeDasharray="14 6"
              vectorEffect="non-scaling-stroke"
            />
          </>
        ) : (
          <rect
            x="0.5"
            y="0.5"
            width="calc(100% - 1px)"
            height="calc(100% - 1px)"
            fill="none"
            stroke="var(--outline_muted)"
            strokeWidth="1"
            strokeDasharray="14 6"
            vectorEffect="non-scaling-stroke"
          />
        )}
        {/* Inner vertical line at 120px - hidden on mobile */}
        <line
          className="hidden md:block"
          x1="120"
          y1="0"
          x2="120"
          y2="100%"
          stroke="var(--outline_muted)"
          strokeWidth="1"
          strokeDasharray="14 6"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div
        className={`flex ${leftWidth} flex-shrink-0 items-center justify-center pt-8 md:pt-0`}
        style={{ backgroundColor: leftBackground ?? background }}
      >
        {left}
      </div>
      <div className="flex-1" style={{ padding: '32px' }}>
        {children}
      </div>
    </div>
  );
}

