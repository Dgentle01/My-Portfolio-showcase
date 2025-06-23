import Link from 'next/link';
import { ArrowRight, CodeXml, Database, GitMerge, Mail, Palette, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Icons } from '@/components/icons';
import PortfolioSection from '@/components/portfolio-section';
import ContactForm from '@/components/contact-form';

const skills = [
  {
    category: 'Frontend',
    items: [
      { name: 'HTML', icon: <CodeXml className="size-8" /> },
      { name: 'CSS', icon: <Palette className="size-8" /> },
      { name: 'JavaScript', icon: <Icons.Javascript className="size-8" /> },
      { name: 'React', icon: <Icons.React className="size-8" /> },
    ],
  },
  {
    category: 'Backend',
    items: [{ name: 'Node.js', icon: <Icons.NodeJs className="size-8" /> }],
  },
  {
    category: 'Database',
    items: [{ name: 'SQL', icon: <Database className="size-8" /> }],
  },
  {
    category: 'Version Control',
    items: [{ name: 'Git', icon: <GitMerge className="size-8" /> }],
  },
];

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Sparkles className="size-6 text-primary" />
            <span className="font-bold font-headline text-2xl">Seyi's Showcase</span>
          </Link>
          <nav className="hidden items-center space-x-8 text-lg font-medium md:flex">
            <Link href="#skills" className="hover:text-primary transition-colors">Skills</Link>
            <Link href="#portfolio" className="hover:text-primary transition-colors">Portfolio</Link>
            <Link href="#contact" className="hover:text-primary transition-colors">Contact</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section id="hero" className="container grid max-w-screen-lg items-center gap-8 pb-8 pt-6 md:py-24">
          <div className="mx-auto flex w-full flex-col items-center gap-4 text-center">
            <h1 className="font-headline text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl">
              Building Digital Experiences
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
              Welcome to my personal portfolio. I'm a passionate developer specializing in creating modern, responsive, and user-friendly web applications.
            </p>
            <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
              <Button asChild className="group">
                <Link href="#contact">
                  Contact Me <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="#portfolio">View My Work</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="skills" className="container py-12 md:py-24">
          <div className="mx-auto flex max-w-screen-lg flex-col items-center gap-4 text-center">
            <h2 className="font-headline text-3xl font-bold leading-tight tracking-tighter sm:text-4xl md:text-5xl">My Technical Skills</h2>
            <p className="max-w-[700px] text-lg text-muted-foreground">A snapshot of the technologies and tools I use to bring ideas to life.</p>
          </div>
          <div className="mx-auto mt-12 grid max-w-screen-lg justify-center gap-4 sm:grid-cols-2 md:grid-cols-4">
            {skills.map((skillGroup) => (
              <Card key={skillGroup.category} className="bg-card/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
                <CardHeader>
                  <CardTitle className="font-headline text-xl">{skillGroup.category}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  {skillGroup.items.map((skill) => (
                    <div key={skill.name} className="flex items-center gap-4">
                      <div className="text-primary">{skill.icon}</div>
                      <span className="font-medium">{skill.name}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-12 md:my-24" />

        <PortfolioSection />
        
        <Separator className="my-12 md:my-24" />

        <section id="contact" className="container py-12 md:py-24">
           <div className="mx-auto flex max-w-screen-lg flex-col items-center gap-4 text-center">
            <h2 className="font-headline text-3xl font-bold leading-tight tracking-tighter sm:text-4xl md:text-5xl">Get In Touch</h2>
            <p className="max-w-[700px] text-lg text-muted-foreground">Have a project in mind or just want to say hello? I'd love to hear from you.</p>
          </div>
          <Card className="mx-auto mt-12 max-w-screen-md bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center gap-2"><Mail className="size-5" /> Send me a message</CardTitle>
              <CardDescription>I'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="w-full border-t border-border/40 bg-background/95 py-6">
        <div className="container flex max-w-screen-2xl flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by Seyi. &copy; {new Date().getFullYear()}. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" aria-label="Telegram">
                <Icons.Telegram className="size-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" aria-label="X (formerly Twitter)">
                <Icons.X className="size-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" aria-label="Farcaster">
                <Icons.Farcaster className="size-5" />
              </Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
