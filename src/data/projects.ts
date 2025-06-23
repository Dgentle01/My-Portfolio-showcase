export interface Project {
  name: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
  dataAiHint?: string;
}

export const projectsData: Project[] = [
  {
    name: 'E-commerce Platform',
    description: 'A full-stack e-commerce site using React and Node.js with a SQL database.',
    image: 'https://placehold.co/600x400.png',
    link: '#',
    tags: ['React', 'Node.js', 'SQL', 'Frontend', 'Backend'],
    dataAiHint: 'online shopping',
  },
  {
    name: 'Task Management App',
    description: 'A responsive task manager built with React and modern CSS.',
    image: 'https://placehold.co/600x400.png',
    link: '#',
    tags: ['React', 'CSS', 'Frontend'],
    dataAiHint: 'productivity tool',
  },
  {
    name: 'Data Visualization Dashboard',
    description: 'An interactive dashboard for visualizing complex datasets using JavaScript.',
    image: 'https://placehold.co/600x400.png',
    link: '#',
    tags: ['JavaScript', 'Data', 'Frontend'],
    dataAiHint: 'charts graphs',
  },
  {
    name: 'Blogging API',
    description: 'A RESTful API for a blogging platform, created with Node.js and Express.',
    image: 'https://placehold.co/600x400.png',
    link: '#',
    tags: ['Node.js', 'API', 'Backend'],
    dataAiHint: 'content management',
  },
    {
    name: 'Portfolio Website V1',
    description: 'My previous portfolio site, built with just HTML and CSS to showcase foundational skills.',
    image: 'https://placehold.co/600x400.png',
    link: '#',
    tags: ['HTML', 'CSS', 'Frontend'],
    dataAiHint: 'personal website',
  },
  {
    name: 'Git-based Wiki System',
    description: 'A collaborative wiki system where content is managed and versioned using Git.',
    image: 'https://placehold.co/600x400.png',
    link: '#',
    tags: ['Git', 'Backend', 'Node.js'],
    dataAiHint: 'documentation collaboration',
  },
];
