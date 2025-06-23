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
