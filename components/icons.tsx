import React from 'react';

export const LoadingSpinner: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} className={`animate-spin ${props.className}`}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

export const ImageIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </svg>
);

export const UploadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" x2="12" y1="3" y2="15" />
  </svg>
);

export const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
        <path d="M5 3v4"/>
        <path d="M19 17v4"/>
        <path d="M3 5h4"/>
        <path d="M17 19h4"/>
    </svg>
);

export const GeminiIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M11 22.1471C11 15.0343 16.8822 9.24316 24 9.24316C27.9905 9.24316 31.5173 11.0532 33.8885 13.9885C33.9453 14.0601 34.001 14.1329 34.0553 14.2065C34.1848 14.4025 33.993 14.6543 33.7719 14.5491C30.6547 13.123 27.0503 12.3333 23.2727 12.3333C17.0545 12.3333 12.0242 16.6334 11.0967 22.4042C11.0521 22.6469 11.2618 22.8465 11.5 22.7663C15.0136 21.7337 18.2545 22.1471 20.7273 23.5727C21.8103 24.1803 22.705 25.0442 23.3644 26.0717C23.5134 26.3059 23.315 26.5828 23.0581 26.4957C19.9575 25.4385 15.6848 24.7648 11.5 26.8529C11.2381 26.9955 11 26.7771 11 26.4957V22.1471Z" fill="currentColor"/>
    <path d="M24 34.7568C31.1178 34.7568 37 28.9657 37 21.8529C37 17.8624 35.1899 14.3356 32.2546 11.9644C32.181 11.9087 32.1072 11.8544 32.0326 11.8015C31.8366 11.672 31.5848 11.8638 31.6899 12.0849C33.1161 15.2021 33.9058 18.8065 33.9058 22.5841C33.9058 28.8023 29.6057 33.8326 23.8349 34.7601C23.5922 34.7941 23.3926 34.5844 23.4728 34.3382C24.5054 30.8246 23.9788 27.5837 22.5532 25.1109C21.9456 24.0279 21.0817 23.1332 20.0542 22.4738C19.82 22.316 19.5281 22.4939 19.6051 22.7508C20.6623 26.8514 21.936 31.1241 20.0413 35.3152C19.8987 35.5771 20.1171 35.8381 20.3985 35.8381H33C33.2761 35.8381 33.5 35.6142 33.5 35.3381V34.8381C33.5 34.7925 33.4696 34.7621 33.424 34.7621L24 34.7568Z" fill="currentColor"/>
  </svg>
);

export const ResetIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 2v6h6" />
        <path d="M21 12A9 9 0 0 0 6 5.3L3 8" />
        <path d="M21 22v-6h-6" />
        <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7" />
    </svg>
);

export const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
);

export const HeartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
);

export const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 6h18" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
);

export const UndoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 7v6h6" />
        <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
    </svg>
);