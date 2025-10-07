"use client";

export function BackgroundGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
      <svg aria-hidden className="absolute inset-0 h-full w-full opacity-[0.12] dark:opacity-[0.18]">
        <defs>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}


