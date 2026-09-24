export interface Skill {
  id: string;
  category: string;
  name: string;
}

export const defaultSkills: Skill[] = [
  { id: 'default-1', category: 'Frontend', name: 'React' },
  { id: 'default-2', category: 'Frontend', name: 'Next.js' },
  { id: 'default-3', category: 'Frontend', name: 'TypeScript' },
  { id: 'default-4', category: 'Frontend', name: 'Tailwind' },
  { id: 'default-5', category: 'Frontend', name: 'HTML/CSS' },
  { id: 'default-6', category: 'Backend', name: 'Node.js' },
  { id: 'default-7', category: 'Backend', name: 'Python' },
  { id: 'default-8', category: 'Database', name: 'SQL' },
  { id: 'default-9', category: 'Database', name: 'Supabase' },
  { id: 'default-10', category: 'Version Control', name: 'Git' },
  { id: 'default-11', category: 'Digital Marketing', name: 'SEO' },
  { id: 'default-12', category: 'Digital Marketing', name: 'Content Writing' },
  { id: 'default-13', category: 'AI & Automation', name: 'AI Automations' },
  { id: 'default-14', category: 'Mobile Development', name: 'Mobile App' },
];
