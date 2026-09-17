'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Mail, 
  Sparkles, 
  LayoutDashboard,
  Github,
  Send
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import PortfolioSection from '@/components/portfolio-section';
import ContactForm from '@/components/contact-form';
import { getSkills } from '@/app/actions';
import { Icons } from '@/components/icons';

export default function Home() {
  const [dynamicSkills, setDynamicSkills] = useState<any[]>([]);

  useEffect(() => {
    async function loadSkills() {
      const skills = await getSkills();
      setDynamicSkills(skills);
    }
    loadSkills();
  }, []);

  const categories = ['Frontend', 'Backend', 'Database', 'Version Control', 'Digital Marketing'];

  return (
    <div className="flex min-h-dvh flex-col text-foreground">
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
            <Button variant="ghost" size="sm" asChild className="hidden lg:flex">
              <Link href="/admin"><LayoutDashboard className="mr-2 size-4" /> Admin</Link>
            </Button>
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
              Welcome to my portfolio. I'm a passionate developer creating modern, responsive, and user-friendly web applications. My expertise extends to digital marketing and analytics, alongside building impactful onchain applications as a dedicated crypto enthusiast.
            </p>
            <div className="flex flex-wrap w-full items-center justify-center gap-4 py-4 md:pb-10">
              <Button interstate="contact-btn" asChild className="group">
                <Link href="#contact">
                  Contact Me <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="#portfolio">View My Work</Link>
              </Button>
              <div className="flex items-center gap-2 ml-2">
                <Button variant="ghost" size="icon" asChild title="GitHub Profile">
                  <Link href="https://github.com/oluseyisennuga" target="_blank" rel="noopener noreferrer">
                    <Github className="size-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild title="Telegram direct">
                  <Link href="https://t.me/d_gentle1" target="_blank" rel="noopener noreferrer">
                    <Send className="size-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="container py-12 md:py-24">
          <div className="mx-auto flex max-w-screen-lg flex-col items-center gap-4 text-center">
            <h2 className="font-headline text-3xl font-bold leading-tight tracking-tighter sm:text-4xl md:text-5xl">My Technical Skills</h2>
            <p className="max-w-[700px] text-lg text-muted-foreground">A snapshot of the technologies and tools I use to bring ideas to life.</p>
          </div>
          <div className="mx-auto mt-12 grid max-w-screen-lg justify-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {categories.map((category) => {
              const categorySkills = dynamicSkills.filter(s => s.category === category);
              if (categorySkills.length === 0) return null;
              
              return (
                <Card key={category} className="bg-card/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
                  <CardHeader>
                    <CardTitle className="font-headline text-xl">{category}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    {categorySkills.map((skill) => (
                      <div key={skill.id} className="flex items-center gap-4">
                        <span className="font-medium">{skill.name}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
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
          <div className="grid gap-8 max-w-screen-md mx-auto mt-12 md:grid-cols-3 text-center">
            <Card className="bg-card/40 backdrop-blur-sm p-4 flex flex-col items-center justify-center gap-2">
              <Mail className="size-6 text-primary" />
              <span className="font-bold text-sm">Email Directly</span>
              <Link href="mailto:oluseyisennuga015@gmail.com" className="text-xs text-primary underline truncate max-w-full">oluseyisennuga015@gmail.com</Link>
            </Card>
            <Card className="bg-card/40 backdrop-blur-sm p-4 flex flex-col items-center justify-center gap-2">
              <Send className="size-6 text-primary" />
              <span className="font-bold text-sm">Telegram Chat</span>
              <Link href="https://t.me/d_gentle1" target="_blank" className="text-xs text-primary underline">@d_gentle1</Link>
            </Card>
            <Card className="bg-card/40 backdrop-blur-sm p-4 flex flex-col items-center justify-center gap-2">
              <Github className="size-6 text-primary" />
              <span className="font-bold text-sm">GitHub</span>
              <Link href="https://github.com/oluseyisennuga" target="_blank" className="text-xs text-primary underline">oluseyisennuga</Link>
            </Card>
          </div>
          <Card className="mx-auto mt-8 max-w-screen-md bg-card/50 backdrop-blur-sm">
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
            <Button variant="ghost" size="icon" asChild title="Email">
              <Link href="mailto:oluseyisennuga015@gmail.com">
                <Mail className="size-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild title="Telegram">
              <Link href="https://t.me/d_gentle1" target="_blank">
                <Icons.Telegram className="size-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild title="GitHub">
              <Link href="https://github.com/oluseyisennuga" target="_blank">
                <Github className="size-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild title="X (Twitter)">
              <Link href="https://x.com/D_Gentle01" target="_blank">
                <Icons.X className="size-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild title="Farcaster">
              <Link href="https://farcaster.xyz/dgentle01" target="_blank">
                <Icons.Farcaster className="size-5" />
              </Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
