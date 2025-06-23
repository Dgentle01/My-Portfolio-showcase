import type { SVGProps } from 'react';

export function Icons({ ...props }) {
  return (
    <div>Icons</div>
  )
}

Icons.React = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="0" cy="0" r="2" fill="currentColor"></circle>
    <g stroke="currentColor" strokeWidth="1" fill="none">
      <ellipse rx="10" ry="4.5"></ellipse>
      <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
      <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
    </g>
  </svg>
);

Icons.NodeJs = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path fill="currentColor" d="M228.23 99.43a20.32 20.32 0 0 0-14.7-10.89l-75.06-13.65a20.33 20.33 0 0 0-18.94 0L44.47 88.54a20.33 20.33 0 0 0-14.7 10.89L2.56 150.3a20.32 20.32 0 0 0 4.16 21.94L71.3 226.71a20.35 20.35 0 0 0 19.36 6.82l75.06-13.64a20.32 20.32 0 0 0 18.94 0l75.06 13.64a20.35 20.35 0 0 0 19.36-6.82l64.58-54.47a20.32 20.32 0 0 0 4.16-21.94Zm-91.31 9.42-53.4-9.71 20.73-35.91 53.4 9.72Z"/>
    </svg>
);


Icons.Javascript = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 256 256" {...props}>
        <path fill="currentColor" d="M141.25 184.88a18.75 18.75 0 1 1-26.51 26.51A18.77 18.77 0 0 1 112 192.63v-29.26a18.75 18.75 0 1 1 26.51-26.51A18.77 18.77 0 0 1 141.25 156v28.88ZM216 40H40a20 20 0 0 0-20 20v136a20 20 0 0 0 20 20h34.88a18.75 18.75 0 1 0 0-37.5H40V77.5h176v78.13a18.75 18.75 0 1 0 37.5 0V60a20 20 0 0 0-20-20Z"/>
    </svg>
);

Icons.X = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
);

Icons.Telegram = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M9.78 18.65l.28-4.23l7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3L3.64 12c-.88-.25-.89-1.37.2-1.64l16.56-6.11c.76-.29 1.44.14 1.2 1.1l-2.62 12.58c-.28 1.13-1.02 1.4-1.91.89l-4.75-3.51l-2.31 2.2a1.28 1.28 0 0 1-1.02.49Z" />
    </svg>
);


Icons.Farcaster = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 256 256" fill="currentColor" {...props}>
        <path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m42.12 112.42l-52.54 52.54a12 12 0 0 1-17 0l-52.54-52.54a12 12 0 0 1 0-17l16.42-16.42a12 12 0 0 1 17 0L112 106.05V80a12 12 0 0 1 24 0v26.05l22.68-22.67a12 12 0 0 1 17 0l16.42 16.42a12 12 0 0 1 0 17Z"/>
    </svg>
);

Icons.Supabase = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.235 2.152a.554.554 0 0 0-1.07 0L2.378 19.348a.554.554 0 0 0 .486.804h17.67a.554.554 0 0 0 .487-.804L12.235 2.152Z"/>
    </svg>
);

Icons.Python = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2a10 10 0 0 0-9.8 11.5 10 10 0 0 0 11.5 9.8 10 10 0 0 0 9.8-11.5A10 10 0 0 0 12 2zm-1.5 2.5a4.5 4.5 0 0 1 4.5 4.5v.5h-3v-.5a1.5 1.5 0 0 0-3 0v2.5a1.5 1.5 0 0 0 1.5 1.5h1.5v3h-1.5a4.5 4.5 0 0 1-4.5-4.5v-2.5a4.5 4.5 0 0 1 4.5-4.5zm3 15a4.5 4.5 0 0 1-4.5-4.5v-.5h3v.5a1.5 1.5 0 0 0 3 0v-2.5a1.5 1.5 0 0 0-1.5-1.5H9v-3h1.5a4.5 4.5 0 0 1 4.5 4.5v2.5a4.5 4.5 0 0 1-4.5 4.5z"/>
    </svg>
);

Icons.Bootstrap = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M18.15 3.34c-1.3-1.3-3-2.05-4.8-2.05h-2.7c-3.5 0-6.32 2.82-6.32 6.32v5.78c0 3.5 2.82 6.32 6.32 6.32h2.7c1.8 0 3.5-0.75 4.8-2.05s2.05-3 2.05-4.8v-2.7c0-1.8-0.75-3.5-2.05-4.8zM15.4 15.54h-2.45c-1.72 0-2.6-0.62-2.6-2.16 0-1.45 0.88-2.1 2.6-2.1h2.45v4.26zM15.4 9.1h-1.92c-1.4 0-2.18-0.53-2.18-1.6 0-1 .78-1.55 2.18-1.55H15.4v3.15z"/>
    </svg>
);

Icons.Tailwind = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.001 4.8c-3.001 0-5.4 2.4-5.4 5.4 0 3 2.4 5.4 5.4 5.4 3.001 0 5.4-2.4 5.4-5.4 0-3-2.399-5.4-5.4-5.4zm-7.8 0c-3 0-5.4 2.4-5.4 5.4 0 3 2.4 5.4 5.4 5.4 3 0 5.4-2.4 5.4-5.4 0-3-2.4-5.4-5.4-5.4z"/>
    </svg>
);
