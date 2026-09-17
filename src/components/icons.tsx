import type { SVGProps } from 'react';
import { 
  Database, 
  GitBranch, 
  FileText, 
  TrendingUp, 
  Store, 
  Users, 
  Code2, 
  Smartphone, 
  Bot,
  Globe,
  Layers
} from 'lucide-react';

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

Icons.TypeScript = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fill="currentColor" d="M224 32H32a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h192a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16ZM92 148h-8v-32H64v-8h48v8h-20v32ZM184 128a24 24 0 0 1-24 24h-16v-48h16a24 24 0 0 1 24 24Zm-24-16h-8v32h8a16 16 0 0 0 0-32Z"/>
  </svg>
);

Icons.Tailwind = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.001 4.8c-3.001 0-5.4 2.4-5.4 5.4 0 3 2.4 5.4 5.4 5.4 3.001 0 5.4-2.4 5.4-5.4 0-3-2.399-5.4-5.4-5.4zm-7.8 0c-3 0-5.4 2.4-5.4 5.4 0 3 2.4 5.4 5.4 5.4 3 0 5.4-2.4 5.4-5.4 0-3-2.4-5.4-5.4-5.4z"/>
  </svg>
);

Icons.Bootstrap = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.15 3.34c-1.3-1.3-3-2.05-4.8-2.05h-2.7c-3.5 0-6.32 2.82-6.32 6.32v5.78c0 3.5 2.82 6.32 6.32 6.32h2.7c1.8 0 3.5-0.75 4.8-2.05s2.05-3 2.05-4.8v-2.7c0-1.8-0.75-3.5-2.05-4.8zM15.4 15.54h-2.45c-1.72 0-2.6-0.62-2.6-2.16 0-1.45 0.88-2.1 2.6-2.1h2.45v4.26zM15.4 9.1h-1.92c-1.4 0-2.18-0.53-2.18-1.6 0-1 .78-1.55 2.18-1.55H15.4v3.15z"/>
  </svg>
);

Icons.Python = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2a10 10 0 0 0-9.8 11.5 10 10 0 0 0 11.5 9.8 10 10 0 0 0 9.8-11.5A10 10 0 0 0 12 2zm-1.5 2.5a4.5 4.5 0 0 1 4.5 4.5v.5h-3v-.5a1.5 1.5 0 0 0-3 0v2.5a1.5 1.5 0 0 0 1.5 1.5h1.5v3h-1.5a4.5 4.5 0 0 1-4.5-4.5v-2.5a4.5 4.5 0 0 1 4.5-4.5zm3 15a4.5 4.5 0 0 1-4.5-4.5v-.5h3v.5a1.5 1.5 0 0 0 3 0v-2.5a1.5 1.5 0 0 0-1.5-1.5H9v-3h1.5a4.5 4.5 0 0 1 4.5 4.5v2.5a4.5 4.5 0 0 1-4.5 4.5z"/>
  </svg>
);

Icons.Supabase = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.235 2.152a.554.554 0 0 0-1.07 0L2.378 19.348a.554.554 0 0 0 .486.804h17.67a.554.554 0 0 0 .487-.804L12.235 2.152Z"/>
  </svg>
);

Icons.Database = Database;
Icons.Git = GitBranch;
Icons.Writing = FileText;
Icons.SEO = TrendingUp;
Icons.Store = Store;
Icons.Community = Users;
Icons.Code = Code2;
Icons.Mobile = Smartphone;
Icons.AI = Bot;
Icons.Default = Globe;

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

Icons.LinkedIn = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
