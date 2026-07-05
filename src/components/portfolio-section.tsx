
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

import { getProjects } from '@/app/actions';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button'; 
import { ArrowRight, Loader } from 'lucide-react';

export default function PortfolioSection() {
  const [displayedProjects, setDisplayedProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      const data = await getProjects();
      setDisplayedProjects(data);
      setLoading(false);
    }
    loadProjects();
  }, []);

  return (
    <section id="portfolio" className="container py-12 md:py-24">
      <div className="mx-auto flex max-w-screen-lg flex-col items-center gap-4 text-center">
        <h2 className="font-headline text-3xl font-bold leading-tight tracking-tighter sm:text-4xl md:text-5xl">My Portfolio</h2>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Explore a selection of my work.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader className="size-10 animate-spin text-primary" />
        </div>
      ) : (
        <motion.div layout className="mx-auto mt-12 grid max-w-screen-lg gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.id || project.name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="h-full overflow-hidden bg-card/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                  <div className="relative h-48 w-full">
                    <Image
                      src={project.image || 'https://placehold.co/600x400.png'}
                      alt={project.name}
                      fill
                      className="object-cover"
                      data-ai-hint={project.dataAiHint || 'web project'}
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-headline text-xl font-bold">{project.name}</h3>
                    <p className="mt-2 text-muted-foreground line-clamp-3">{project.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags?.map((tag: string) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                    <Button variant="link" asChild className="group mt-4 px-0">
                      <Link href={project.link || '#'}>
                        View Project <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}
