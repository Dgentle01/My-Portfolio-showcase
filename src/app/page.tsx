'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Mail, 
  Sparkles, 
  LayoutDashboard,
  Github,
  Send,
  Linkedin
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PortfolioSection from '@/components/portfolio-section';
import ContactForm from '@/components/contact-form';
import { getSkills } from '@/app/actions';
import { Icons } from '@/components/icons';

const skillIconMap: Record<string, any> = {
  'React': Icons.React,
  'TypeScript': Icons.TypeScript,
  'Tailwind': Icons.Tailwind,
  'Bootstrap': Icons.Bootstrap,
  'Node.js': Icons.NodeJs,
  'Python': Icons.Python,
  'SQL': Icons.Database,
  'MySQL': Icons.Database,
  'Supabase': Icons.Supabase,
  'Git': Icons.Git,
  'Content Writing': Icons.Writing,
  'SEO': Icons.SEO,
  'Google My Business': Icons.Store,
  'Community Manager': Icons.Community,
  'AI': Icons.AI,
  'Automation': Icons.AI,
  'Mobile App': Icons.Mobile,
  'Next.js': Icons.React,
  'HTML': Icons.Code,
  'CSS': Icons.Layers,
  'JavaScript': Icons.Code,
};

const defaultSkills = [
  { id: 'd1', category: 'Frontend', name: 'React' },
  { id: 'd2', category: 'Frontend', name: 'Next.js' },
  { id: 'd3', category: 'Frontend', name: 'TypeScript' },
  { id: 'd4', category: 'Frontend', name: 'Tailwind' },
  { id: 'd5', category: 'Frontend', name: 'HTML/CSS' },
  { id: 'd6', category: 'Backend', name: 'Node.js' },
  { id: 'd7', category: 'Backend', name: 'Python' },
  { id: 'd8', category: 'Database', name: 'SQL' },
  { id: 'd9', category: 'Database', name: 'Supabase' },
  { id: 'd10', category: 'Version Control', name: 'Git' },
  { id: 'd11', category: 'Digital Marketing', name: 'SEO' },
  { id: 'd12', category: 'Digital Marketing', name: 'Content Writing' },
  { id: 'd13', category: 'AI & Automation', name: 'AI Automations' },
  { id: 'd14', category: 'Mobile Development', name: 'Mobile App' },
];

export default function Home() {
  const [dynamicSkills, setDynamicSkills] = useState<any[]>([]);

  useEffect(() => {
    async function loadSkills() {
      const skills = await getSkills();
      setDynamicSkills(skills);
    }
    loadSkills();
  }, []);

  const getIconForSkill = (name: string) => {
    const Icon = skillIconMap[name] || skillIconMap[Object.keys(skillIconMap).find(key => name.includes(key)) || ''] || Icons.Default;
    return <Icon className="size-6 text-primary shrink-0" />;
  };

  const skillsToShow = dynamicSkills.length > 0 ? dynamicSkills : defaultSkills;
  
  // Derive categories dynamically from skills to ensure any new category shows up
  const categories = Array.from(new Set(skillsToShow.map(s => s.category)));

  return (
    <div className="flex min-h-dvh flex-col text-foreground bg-[#0a0a0a]">
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/80 backdrop-blur-md">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 mx-auto">
          <Link href="/" className="flex items-center space-x-2">
            <Sparkles className="size-6 text-primary" />
            <span className="font-bold font-headline text-2xl text-primary uppercase tracking-wider">Seyi's Showcase</span>
          </Link>
          <nav className="hidden items-center space-x-8 text-sm font-medium uppercase tracking-widest md:flex">
            <Link href="#skills" className="hover:text-primary transition-colors">Skills</Link>
            <Link href="#portfolio" className="hover:text-primary transition-colors">Portfolio</Link>
            <Link href="#contact" className="hover:text-primary transition-colors">Contact</Link>
            <Button variant="outline" size="sm" asChild className="hidden border-primary/50 text-primary hover:bg-primary hover:text-white lg:flex">
              <Link href="/admin"><LayoutDashboard className="mr-2 size-4" /> Admin</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section id="hero" className="container mx-auto grid max-w-screen-lg items-center gap-8 pb-12 pt-12 md:py-24 lg:py-32 px-4">
          <div className="mx-auto flex w-full flex-col items-center gap-6 text-center">
            <h1 className="font-headline text-5xl font-bold leading-none tracking-tighter md:text-7xl lg:text-8xl uppercase italic">
              Architecting <span className="text-primary not-italic">Intelligent</span> Systems
            </h1>
            <p className="max-w-[800px] text-lg text-muted-foreground sm:text-xl leading-relaxed">
              Full-stack developer engineering high-performance <strong className="text-white">AI Automations</strong>, <strong className="text-white">Mobile Solutions</strong>, and seamless web experiences. I transform complex business logic into elegant, scalable digital reality.
            </p>
            <div className="flex flex-wrap w-full items-center justify-center gap-4 py-4 md:pb-10">
              <Button asChild className="group px-8 bg-primary hover:bg-primary/90 text-white rounded-none h-12">
                <Link href="#contact" className="uppercase font-bold tracking-widest">
                  Let's Collaborate <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="px-8 border-white/20 hover:bg-white hover:text-black rounded-none h-12">
                <Link href="#portfolio" className="uppercase font-bold tracking-widest">Browse Work</Link>
              </Button>
              <div className="flex items-center gap-4 ml-4">
                <Link href="https://github.com/oluseyisennuga" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                  <Github className="size-6" />
                </Link>
                <Link href="https://t.me/d_gentle1" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                  <Send className="size-6" />
                </Link>
                <Link href="mailto:oluseyisennuga015@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="size-6" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="bg-[#111] py-20 md:py-32 border-y border-white/5">
          <div className="container max-w-screen-xl mx-auto px-4">
            <div className="flex flex-col items-center gap-4 text-center mb-16">
              <h2 className="font-headline text-4xl font-bold uppercase tracking-widest sm:text-5xl md:text-6xl">Tech <span className="text-primary">Stack</span></h2>
              <p className="max-w-[700px] text-lg text-muted-foreground">The specialized tools and frameworks I use to build production-grade software.</p>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center">
              {categories.map((category) => {
                const categorySkills = skillsToShow.filter(s => s.category === category);
                if (categorySkills.length === 0) return null;

                return (
                  <Card key={category} className="bg-[#1a1a1a] border-white/5 rounded-none hover:border-primary/50 transition-colors group">
                    <CardHeader className="pb-4">
                      <CardTitle className="font-headline text-2xl uppercase tracking-wider text-white border-b border-primary/20 pb-2">{category}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-6 pt-2">
                      {categorySkills.map((skill) => (
                        <div key={skill.id} className="flex items-center gap-4 group/item">
                          {getIconForSkill(skill.name)}
                          <span className="font-bold text-base text-gray-300 group-hover/item:text-white transition-colors">{skill.name}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <PortfolioSection />

        <section id="contact" className="container mx-auto py-20 md:py-32 px-4">
          <div className="mx-auto flex max-w-screen-lg flex-col items-center gap-4 text-center mb-16">
            <h2 className="font-headline text-4xl font-bold uppercase tracking-widest sm:text-5xl md:text-6xl">Direct <span className="text-primary">Contact</span></h2>
            <p className="max-w-[700px] text-lg text-muted-foreground">Ready to start your next big project? Reach out through any of these channels.</p>
          </div>
          
          <div className="grid gap-8 max-w-screen-xl mx-auto md:grid-cols-12 items-start">
            <div className="md:col-span-4 space-y-6">
              <h3 className="font-headline text-2xl uppercase tracking-wider mb-6">Connect Directly</h3>
              <div className="space-y-4">
                <Card className="bg-[#1a1a1a] border-white/5 p-6 rounded-none hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="size-12 bg-primary/10 flex items-center justify-center rounded-none">
                      <Mail className="size-6 text-primary" />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-xs uppercase text-muted-foreground font-bold tracking-widest">Email</span>
                      <Link href="mailto:oluseyisennuga015@gmail.com" className="text-sm font-bold truncate">oluseyisennuga015@gmail.com</Link>
                    </div>
                  </div>
                </Card>
                <Card className="bg-[#1a1a1a] border-white/5 p-6 rounded-none hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="size-12 bg-primary/10 flex items-center justify-center rounded-none">
                      <Send className="size-6 text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs uppercase text-muted-foreground font-bold tracking-widest">Telegram</span>
                      <Link href="https://t.me/d_gentle1" target="_blank" className="text-sm font-bold">@d_gentle1</Link>
                    </div>
                  </div>
                </Card>
                <div className="flex gap-4 pt-4">
                  <Link href="https://github.com/oluseyisennuga" target="_blank" className="size-12 bg-[#1a1a1a] border border-white/5 flex items-center justify-center hover:bg-primary transition-colors text-white">
                    <Github className="size-6" />
                  </Link>
                  <Link href="https://linkedin.com/in/oluseyisennuga" target="_blank" className="size-12 bg-[#1a1a1a] border border-white/5 flex items-center justify-center hover:bg-primary transition-colors text-white">
                    <Linkedin className="size-6" />
                  </Link>
                </div>
              </div>
            </div>

            <Card className="md:col-span-8 bg-[#1a1a1a] border-white/5 rounded-none p-2">
              <CardHeader className="pb-2">
                <CardTitle className="font-headline text-2xl uppercase tracking-wider flex items-center gap-2">Project <span className="text-primary">Inquiry</span></CardTitle>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-white/5 bg-black py-16">
        <div className="container max-w-screen-xl mx-auto px-4 flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="size-6 text-primary" />
              <span className="font-bold font-headline text-2xl text-primary uppercase">Seyi</span>
            </div>
            <p className="text-sm text-muted-foreground uppercase tracking-widest">
              &copy; {new Date().getFullYear()} all rights reserved
            </p>
          </div>
          <div className="flex items-center gap-8">
            <Link href="https://t.me/d_gentle1" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
              <Icons.Telegram className="size-6" />
            </Link>
            <Link href="https://github.com/oluseyisennuga" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="size-6" />
            </Link>
            <Link href="https://linkedin.com/in/oluseyisennuga" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
              <Icons.LinkedIn className="size-6" />
            </Link>
            <Link href="https://x.com/D_Gentle01" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
              <Icons.X className="size-6" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
