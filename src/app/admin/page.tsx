
'use client';

import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Wrench, 
  MessageSquare, 
  Plus, 
  Trash2, 
  Mail, 
  ExternalLink,
  Clock,
  User,
  LogOut
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  getMessages, 
  deleteMessage, 
  getProjects, 
  saveProject, 
  deleteProject,
  getSkills,
  addSkill,
  deleteSkill
} from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function AdminDashboard() {
  const [messages, setMessages] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Project form state
  const [newProject, setNewProject] = useState({ name: '', description: '', image: '', link: '', tags: '', dataAiHint: '' });
  // Skill form state
  const [newSkill, setNewSkill] = useState({ category: 'Frontend', name: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [msgs, projs, skls] = await Promise.all([
      getMessages(),
      getProjects(),
      getSkills()
    ]);
    setMessages(msgs);
    setProjects(projs);
    setSkills(skls);
    setLoading(false);
  };

  const handleDeleteMessage = async (id: string) => {
    const res = await deleteMessage(id);
    if (res.success) {
      setMessages(messages.filter(m => m.id !== id));
      toast({ title: 'Message deleted' });
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = newProject.tags.split(',').map(t => t.trim());
    const res = await saveProject({ ...newProject, tags: tagsArray });
    if (res.success) {
      toast({ title: 'Project added successfully' });
      setNewProject({ name: '', description: '', image: '', link: '', tags: '', dataAiHint: '' });
      fetchData();
    }
  };

  const handleDeleteProject = async (id: string) => {
    const res = await deleteProject(id);
    if (res.success) {
      setProjects(projects.filter(p => p.id !== id));
      toast({ title: 'Project removed' });
    }
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.name) return;
    const res = await addSkill(newSkill.category, newSkill.name);
    if (res.success) {
      toast({ title: 'Skill added' });
      setNewSkill({ ...newSkill, name: '' });
      fetchData();
    }
  };

  const handleDeleteSkill = async (id: string) => {
    const res = await deleteSkill(id);
    if (res.success) {
      setSkills(skills.filter(s => s.id !== id));
      toast({ title: 'Skill removed' });
    }
  };

  if (loading) {
    return <div className="flex h-dvh items-center justify-center">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="border-b border-border/40 bg-card p-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="size-6 text-primary" />
            <h1 className="text-xl font-bold font-headline">Admin Dashboard</h1>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/"><LogOut className="mr-2 size-4" /> Exit to Site</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <Tabs defaultValue="messages" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
            <TabsTrigger value="messages" className="gap-2">
              <MessageSquare className="size-4" /> Messages
              <Badge variant="secondary" className="ml-1">{messages.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="projects" className="gap-2">
              <Briefcase className="size-4" /> Projects
            </TabsTrigger>
            <TabsTrigger value="skills" className="gap-2">
              <Wrench className="size-4" /> Skills
            </TabsTrigger>
          </TabsList>

          <TabsContent value="messages" className="space-y-4">
            <div className="grid gap-4">
              {messages.length === 0 ? (
                <Card><CardContent className="p-8 text-center text-muted-foreground">No messages yet.</CardContent></Card>
              ) : (
                messages.map((msg) => (
                  <Card key={msg.id} className="bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-start justify-between space-y-0">
                      <div className="space-y-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <User className="size-4 text-primary" /> {msg.name}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Mail className="size-3" /> {msg.email}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="size-3" /> {new Date(msg.createdAt).toLocaleString()}
                        </span>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteMessage(msg.id)} className="text-destructive hover:bg-destructive/10">
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="whitespace-pre-wrap text-sm">{msg.message}</p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Project</CardTitle>
                <CardDescription>Fill in the details to add a new project to your portfolio.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddProject} className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Project Name</Label>
                    <Input value={newProject.name} onChange={e => setNewProject({...newProject, name: e.target.value})} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Project Link</Label>
                    <Input value={newProject.link} onChange={e => setNewProject({...newProject, link: e.target.value})} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Image URL</Label>
                    <Input value={newProject.image} onChange={e => setNewProject({...newProject, image: e.target.value})} placeholder="https://..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Tags (comma separated)</Label>
                    <Input value={newProject.tags} onChange={e => setNewProject({...newProject, tags: e.target.value})} placeholder="React, Node.js, etc." />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Description</Label>
                    <Textarea value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} required />
                  </div>
                  <Button type="submit" className="md:col-span-2"><Plus className="mr-2 size-4" /> Add Project</Button>
                </form>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((proj) => (
                <Card key={proj.id || proj.name}>
                  <CardHeader>
                    <CardTitle className="text-lg">{proj.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{proj.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={proj.link} target="_blank" rel="noopener noreferrer"><ExternalLink className="size-4" /></a>
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteProject(proj.id)} className="text-destructive">
                      <Trash2 className="size-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Skill</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddSkill} className="flex gap-4">
                  <div className="flex-1 space-y-2">
                    <Label>Category</Label>
                    <select 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={newSkill.category} 
                      onChange={e => setNewSkill({...newSkill, category: e.target.value})}
                    >
                      <option>Frontend</option>
                      <option>Backend</option>
                      <option>Database</option>
                      <option>Version Control</option>
                      <option>Digital Marketing</option>
                    </select>
                  </div>
                  <div className="flex-[2] space-y-2">
                    <Label>Skill Name</Label>
                    <Input value={newSkill.name} onChange={e => setNewSkill({...newSkill, name: e.target.value})} placeholder="e.g. Next.js" />
                  </div>
                  <div className="flex items-end">
                    <Button type="submit"><Plus className="mr-2 size-4" /> Add</Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              {['Frontend', 'Backend', 'Database', 'Version Control', 'Digital Marketing'].map(cat => (
                <Card key={cat}>
                  <CardHeader>
                    <CardTitle className="text-lg">{cat}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {skills.filter(s => s.category === cat).map(skill => (
                      <Badge key={skill.id} variant="secondary" className="flex items-center gap-2 pr-1">
                        {skill.name}
                        <button onClick={() => handleDeleteSkill(skill.id)} className="text-muted-foreground hover:text-destructive">
                          <Trash2 className="size-3" />
                        </button>
                      </Badge>
                    ))}
                    {skills.filter(s => s.category === cat).length === 0 && <span className="text-xs text-muted-foreground italic">No skills added in this category</span>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
