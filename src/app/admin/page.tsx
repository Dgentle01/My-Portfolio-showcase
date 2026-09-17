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
  LogOut,
  Loader2,
  Edit2,
  X
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/select';

export default function AdminDashboard() {
  const [messages, setMessages] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState({ 
    name: '', 
    description: '', 
    image: '', 
    link: '', 
    tags: '', 
    dataAiHint: '' 
  });
  
  const [newSkill, setNewSkill] = useState({ category: 'Frontend', name: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [msgs, projs, skls] = await Promise.all([
        getMessages(),
        getProjects(),
        getSkills()
      ]);
      setMessages(msgs);
      setProjects(projs);
      setSkills(skls);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    const res = await deleteMessage(id);
    if (res.success) {
      setMessages(messages.filter(m => m.id !== id));
      toast({ title: 'Message deleted' });
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const tagsArray = typeof projectForm.tags === 'string' 
      ? projectForm.tags.split(',').map(t => t.trim()).filter(t => t !== '')
      : projectForm.tags;

    const projectData = { 
      ...projectForm, 
      tags: tagsArray,
      id: editingProjectId || undefined 
    };

    const res = await saveProject(projectData);
    setSubmitting(false);
    if (res.success) {
      toast({ title: editingProjectId ? 'Project updated' : 'Project added' });
      resetProjectForm();
      fetchData();
    }
  };

  const resetProjectForm = () => {
    setEditingProjectId(null);
    setProjectForm({ name: '', description: '', image: '', link: '', tags: '', dataAiHint: '' });
  };

  const startEditProject = (proj: any) => {
    setEditingProjectId(proj.id);
    setProjectForm({
      name: proj.name,
      description: proj.description,
      image: proj.image || '',
      link: proj.link || '',
      tags: Array.isArray(proj.tags) ? proj.tags.join(', ') : '',
      dataAiHint: proj.dataAiHint || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    const res = await deleteProject(id);
    if (res.success) {
      setProjects(projects.filter(p => p.id !== id));
      toast({ title: 'Project removed' });
    }
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.name) return;
    setSubmitting(true);
    const res = await addSkill(newSkill.category, newSkill.name);
    setSubmitting(false);
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
    return (
      <div className="flex h-dvh flex-col items-center justify-center gap-4">
        <Loader2 className="size-8 animate-spin text-primary" />
        <p className="text-muted-foreground animate-pulse">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-card/80 backdrop-blur-md p-4">
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

      <main className="container mx-auto py-8 px-4">
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
                <Card><CardContent className="p-12 text-center text-muted-foreground">No messages yet.</CardContent></Card>
              ) : (
                messages.map((msg) => (
                  <Card key={msg.id} className="bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors">
                    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
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
                      <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.message}</p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card className="border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{editingProjectId ? 'Edit Project' : 'Add New Project'}</CardTitle>
                  <CardDescription>Manage your portfolio items.</CardDescription>
                </div>
                {editingProjectId && (
                  <Button variant="ghost" size="sm" onClick={resetProjectForm}>
                    <X className="mr-2 size-4" /> Cancel Edit
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProject} className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Project Name</Label>
                    <Input value={projectForm.name} onChange={e => setProjectForm({...projectForm, name: e.target.value})} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Project Link</Label>
                    <Input value={projectForm.link} onChange={e => setProjectForm({...projectForm, link: e.target.value})} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Image URL</Label>
                    <Input value={projectForm.image} onChange={e => setProjectForm({...projectForm, image: e.target.value})} placeholder="https://..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Tags (comma separated)</Label>
                    <Input value={projectForm.tags} onChange={e => setProjectForm({...projectForm, tags: e.target.value})} placeholder="React, Next.js, Web3" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Description</Label>
                    <Textarea value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} required />
                  </div>
                  <Button type="submit" disabled={submitting} className="md:col-span-2">
                    {submitting ? <Loader2 className="mr-2 size-4 animate-spin" /> : (editingProjectId ? <Edit2 className="mr-2 size-4" /> : <Plus className="mr-2 size-4" />)}
                    {editingProjectId ? 'Update Project' : 'Add Project'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((proj) => (
                <Card key={proj.id || proj.name} className="group overflow-hidden bg-card/50">
                  <CardHeader>
                    <CardTitle className="text-lg truncate">{proj.name}</CardTitle>
                    <CardDescription className="line-clamp-2 min-h-[2.5rem]">{proj.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between pt-2 border-t bg-muted/20">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => startEditProject(proj)}>
                        <Edit2 className="size-4" />
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={proj.link} target="_blank" rel="noopener noreferrer"><ExternalLink className="size-4" /></a>
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteProject(proj.id)} className="text-destructive opacity-50 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="size-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Manage Skills</CardTitle>
                <CardDescription>Add new technical or marketing skills.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddSkill} className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 space-y-2">
                    <Label>Category</Label>
                    <Select value={newSkill.category} onValueChange={(val) => setNewSkill({...newSkill, category: val})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Frontend">Frontend</SelectItem>
                        <SelectItem value="Backend">Backend</SelectItem>
                        <SelectItem value="Database">Database</SelectItem>
                        <SelectItem value="Version Control">Version Control</SelectItem>
                        <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-[2] space-y-2">
                    <Label>Skill Name</Label>
                    <Input value={newSkill.name} onChange={e => setNewSkill({...newSkill, name: e.target.value})} placeholder="e.g. Next.js" required />
                  </div>
                  <div className="flex items-end">
                    <Button type="submit" disabled={submitting} className="w-full md:w-auto">
                      {submitting ? <Loader2 className="size-4 animate-spin" /> : <Plus className="mr-2 size-4" />}
                      Add Skill
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {['Frontend', 'Backend', 'Database', 'Version Control', 'Digital Marketing'].map(cat => (
                <Card key={cat} className="flex flex-col">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg border-l-4 border-primary pl-3">{cat}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {skills.filter(s => s.category === cat).map(skill => (
                      <Badge key={skill.id} variant="secondary" className="flex items-center gap-2 pr-1 py-1">
                        {skill.name}
                        <button onClick={() => handleDeleteSkill(skill.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 className="size-3" />
                        </button>
                      </Badge>
                    ))}
                    {skills.filter(s => s.category === cat).length === 0 && <span className="text-xs text-muted-foreground italic">No skills listed</span>}
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
