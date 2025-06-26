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
    description:
      'A full-stack e-commerce site using React and Node.js with a SQL database.',
    image: 'https://placehold.co/600x400.png', // Replace with actual image URL
    link: 'https://your-ecommerce-project-link.com', // Replace with actual project link
    tags: ['React', 'Node.js', 'SQL', 'Frontend', 'Backend'],
    dataAiHint: 'online shopping',
  },
  {
    name: 'Task Management App',
    description: 'A responsive task manager built with React and modern CSS.',
    image: 'https://placehold.co/600x400.png', // Replace with actual image URL
    link: 'https://your-task-manager-project-link.com', // Replace with actual project link
    tags: ['React', 'CSS', 'Frontend'],
    dataAiHint: 'productivity tool',
  },
  {
    name: 'Data Visualization Dashboard',
    description:
      'An interactive dashboard for visualizing complex datasets using JavaScript.',
    image: 'https://placehold.co/600x400.png', // Replace with actual image URL
    link: '#', // Replace with actual project link
    tags: ['JavaScript', 'Data', 'Frontend'],
    dataAiHint: 'charts graphs',
  },
  {
    name: 'Blogging API',
    description: 'A RESTful API for a blogging platform, created with Node.js and Express.',
    image: 'https://i.postimg.cc/d3QvSfK6/Cryptobiez-logo.jpg', // Replace with actual image URL
    link: 'https://cryptobiez.vercel.app/?', // Replace with actual project link
    tags: ['Node.js', 'API', 'Backend'],
    dataAiHint: 'content management',
  },
    {
    name: 'Portfolio Website V1',
    description: 'My previous portfolio site, built with just HTML and CSS to showcase foundational skills.',
    image: 'https://placehold.co/600x400.png',
    // image: 'https://i.postimg.cc/d0C5gP9B/portfolio-v1.png', // Replace with actual image URL
    link: 'https://sennugaseyi.vercel.app/',
    tags: ['HTML', 'CSS', 'Frontend'],
    dataAiHint: 'personal website',
  },
  {
    name: 'Git-based Wiki System',
    description: 'A collaborative wiki system where content is managed and versioned using Git.',
    image: 'https://i.postimg.cc/dQp4pXjR/wiki-system.png', // Replace with actual image URL
    link: 'https://your-wiki-system-link.com', // Replace with actual project link
    tags: ['Git', 'Backend', 'Node.js'],
    dataAiHint: 'documentation collaboration',
  },
  {
    name: 'Base NFT and Coin Explorer',
    description: 'A tool to explore NFTs and Coins on the Base blockchain.',
    image: 'https://i.postimg.cc/SKDRDmWj/android-chrome-512x512.png',
    link: 'https://basenftexplorer.vercel.app/', // Keep this link as it's already a project link
    tags: ['Blockchain', 'NFT', 'React', 'Frontend'],
    dataAiHint: 'nft explorer',
  },
  {
    name: 'Solsity - Crypto & Tech Blog',
    description: 'A blog website for crypto and tech news and updates.',
    image: 'https://i.postimg.cc/T3s8Jwwt/SOLSITY1.jpg', // Replace with actual image URL
    link: 'https://solsity.com',
    tags: ['Crypto', 'Tech', 'Blog', 'Content'],
    dataAiHint: 'crypto blog',
  }
];
