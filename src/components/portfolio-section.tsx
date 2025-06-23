'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

import { projectsData, type Project } from '@/data/projects';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Loader, Sparkles, Wand2 } from 'lucide-react';
import { suggestProjectsAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

function AiPortfolioTool({ onSuggest, isPending }: { onSuggest: (keywords: string) => void; isPending: boolean }) {
  const [keywords, setKeywords] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSuggest(keywords);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col items-center gap-4 md:flex-row">
      <div className="relative w-full">
        <Wand2 className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
        <Input
          placeholder="e.g., 'React frontend projects with animations'"
          className="pl-10"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          disabled={isPending}
        />
      </div>
      <Button type="submit" className="w-full md:w-auto" disabled={isPending}>
        {isPending ? <Loader className="mr-2 size-5 animate-spin" /> : <Sparkles className="mr-2 size-5" />}
        Suggest Projects
      </Button>
    </form>
  );
}

export default function PortfolioSection() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>(projectsData);
  const [isFiltered, setIsFiltered] = useState(false);

  const handleSuggest = (keywords: string) => {
    if (!keywords.trim()) {
      toast({ title: 'Please enter some keywords.', variant: 'destructive' });
      return;
    }

    startTransition(async () => {
      const result = await suggestProjectsAction(projectsData, keywords);
      if (result.error) {
        toast({ title: result.error, variant: 'destructive' });
      } else if (result.suggestions) {
        const suggested = projectsData.filter((p) => result.suggestions!.includes(p.name));
        setDisplayedProjects(suggested);
        setIsFiltered(true);
        toast({ title: 'Here are your suggested projects!' });
      }
    });
  };

  const handleReset = () => {
    setDisplayedProjects(projectsData);
    setIsFiltered(false);
  };

  return (
    <section id="portfolio" className="container py-12 md:py-24">
      <div className="mx-auto flex max-w-screen-lg flex-col items-center gap-4 text-center">
        <h2 className="font-headline text-3xl font-bold leading-tight tracking-tighter sm:text-4xl md:text-5xl">My Portfolio</h2>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Explore a selection of my work. Use the AI tool below to find projects relevant to your interests!
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-screen-lg">
        <Card className="bg-card/50 p-6 backdrop-blur-sm">
          <AiPortfolioTool onSuggest={handleSuggest} isPending={isPending} />
        </Card>
        {isFiltered && (
          <div className="text-center mt-4">
            <Button variant="link" onClick={handleReset}>Show All Projects</Button>
          </div>
        )}
      </div>

      <motion.div layout className="mx-auto mt-12 grid max-w-screen-lg gap-8 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.name}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="h-full overflow-hidden bg-card/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                <Image
                  src={project.image}
                  alt={project.name}
                  width={600}
                  height={400}
                  className="w-full object-cover"
                  data-ai-hint={project.dataAiHint}
                />
                <CardContent className="p-6">
                  <h3 className="font-headline text-xl font-bold">{project.name}</h3>
                  <p className="mt-2 text-muted-foreground">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                  <Button variant="link" asChild className="group mt-4 px-0">
                    <Link href={project.link}>
                      View Project <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
