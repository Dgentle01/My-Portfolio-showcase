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
  X,
  Sparkles
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

  const categories = [
    'Frontend', 
    'Backend', 
    'Database', 
    'Version Control', 
    'Digital Marketing',
    'AI & Automation',
    'Mobile Development'
  ];

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
      toast({ title: 'Error', description: 'Failed to connect to Firebase. Check your keys.', variant: 'destructive' });
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
    
    // Ensure tags are an array
    const tagsArray = typeof projectForm.tags === 'string' 
      ? projectForm.tags.split(',').map(t => t.trim()).filter(t => t !== '')
      : projectForm.tags;

    const { ...formData } = projectForm;
    const projectData = { 
      ...formData, 
      tags: tagsArray,
      id: editingProjectId || undefined 
    };

    const res = await saveProject(projectData);
    setSubmitting(false);
    if (res.success) {
      toast({ title: editingProjectId ? 'Project updated' : 'Project added' });
      resetProjectForm();
      fetchData();
    } else {
      toast({ title: 'Save failed', description: res.error, variant: 'destructive' });
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
      <div className="flex h-dvh flex-col items-center justify-center gap-4 bg-background">
        <Loader2 className="size-8 animate-spin text-primary" />
        <p className="text-muted-foreground animate-pulse">Synchronizing with Firebase...</p>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-[#0a0a0a] text-foreground">
      <header className="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-md p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="size-6 text-primary" />
            <h1 className="text-xl font-bold font-headline uppercase tracking-wider">Admin Dashboard</h1>
          </div>
          <Button variant="outline" size="sm" asChild className="border-primary/50 text-primary hover:bg-primary hover:text-white">
            <Link href="/"><LogOut className="mr-2 size-4" /> View Site</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <Tabs defaultValue="messages" className="space-y-6">
          <TabsList className="bg-[#1a1a1a] border border-white/5 p-1">
            <TabsTrigger value="messages" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <MessageSquare className="mr-2 size-4" /> Messages
              {messages.length > 0 && <Badge variant="destructive" className="ml-2 bg-red-600">{messages.length}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <Briefcase className="mr-2 size-4" /> Projects
            </TabsTrigger>
            <TabsTrigger value="skills" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <Wrench className="mr-2 size-4" /> Skills
            </TabsTrigger>
          </TabsList>

          <TabsContent value="messages" className="space-y-4">
            {messages.length === 0 ? (
              <Card className="bg-[#1a1a1a] border-white/5 border-dashed"><CardContent className="p-20 text-center text-muted-foreground">No inquiries yet. Incoming messages will appear here.</CardContent></Card>
            ) : (
              <div className="grid gap-4">
                {messages.map((msg) => (
                  <Card key={msg.id} className="bg-[#1a1a1a] border-white/5 hover:border-primary/40 transition-all group">
                    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                      <div className="space-y-1">
                        <CardTitle className="text-lg flex items-center gap-2 text-white">
                          <User className="size-4 text-primary" /> {msg.name}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="size-3" /> {msg.email}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="size-3" /> {new Date(msg.createdAt).toLocaleString()}
                        </span>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteMessage(msg.id)} className="text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="whitespace-pre-wrap text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-4">{msg.message}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card className="bg-[#1a1a1a] border-primary/20 rounded-none shadow-xl shadow-primary/5">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-2xl text-white uppercase font-headline">{editingProjectId ? 'Update Project' : 'Add New Work'}</CardTitle>
                  <CardDescription>Populate your portfolio with high-quality projects.</CardDescription>
                </div>
                {editingProjectId && (
                  <Button variant="ghost" size="sm" onClick={resetProjectForm} className="text-white hover:bg-white/10">
                    <X className="mr-2 size-4" /> Exit Edit Mode
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProject} className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-white font-bold">Project Name</Label>
                    <Input className="bg-black border-white/10 text-white" value={projectForm.name} onChange={e => setProjectForm({...projectForm, name: e.target.value})} placeholder="e.g. AI Content Generator" required />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white font-bold">Project Link</Label>
                    <Input className="bg-black border-white/10 text-white" value={projectForm.link} onChange={e => setProjectForm({...projectForm, link: e.target.value})} placeholder="https://github.com/..." required />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white font-bold">Image URL</Label>
                    <Input className="bg-black border-white/10 text-white" value={projectForm.image} onChange={e => setProjectForm({...projectForm, image: e.target.value})} placeholder="https://i.postimg.cc/..." />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white font-bold">Search Keywords (AI Hint)</Label>
                    <Input className="bg-black border-white/10 text-white" value={projectForm.dataAiHint} onChange={e => setProjectForm({...projectForm, dataAiHint: e.target.value})} placeholder="e.g. dashboard app" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white font-bold">Tags (comma separated)</Label>
                    <Input className="bg-black border-white/10 text-white" value={projectForm.tags} onChange={e => setProjectForm({...projectForm, tags: e.target.value})} placeholder="React, Python, OpenAI" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-white font-bold">Detailed Description</Label>
                    <Textarea className="bg-black border-white/10 text-white min-h-[120px]" value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} required />
                  </div>
                  <Button type="submit" disabled={submitting} className="md:col-span-2 h-12 bg-primary hover:bg-primary/90 rounded-none text-white font-bold uppercase tracking-widest">
                    {submitting ? <Loader2 className="mr-2 size-5 animate-spin" /> : (editingProjectId ? <Edit2 className="mr-2 size-5" /> : <Plus className="mr-2 size-5" />)}
                    {editingProjectId ? 'Synchronize Updates' : 'Publish to Portfolio'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((proj) => (
                <Card key={proj.id} className="bg-[#1a1a1a] border-white/5 overflow-hidden group hover:border-primary/30 transition-all">
                  <div className="relative h-40 w-full bg-black/50">
                    {proj.image ? (
                      <img src={proj.image} alt={proj.name} className="object-cover w-full h-full opacity-60 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground italic text-xs">No image provided</div>
                    )}
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-white font-headline uppercase truncate">{proj.name}</CardTitle>
                    <CardDescription className="line-clamp-2 text-xs">{proj.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between pt-4 border-t border-white/5 mt-2 bg-black/20">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => startEditProject(proj)} className="border-white/10 text-white hover:bg-primary hover:border-primary">
                        <Edit2 className="size-4" />
                      </Button>
                      <Button variant="outline" size="sm" asChild className="border-white/10 text-white hover:bg-white hover:text-black">
                        <a href={proj.link} target="_blank" rel="noopener noreferrer"><ExternalLink className="size-4" /></a>
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteProject(proj.id)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="size-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card className="bg-[#1a1a1a] border-primary/20 rounded-none">
              <CardHeader>
                <CardTitle className="text-2xl text-white uppercase font-headline">Skill Management</CardTitle>
                <CardDescription>Expand your technical stack visibility.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddSkill} className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 space-y-2">
                    <Label className="text-white font-bold">Category</Label>
                    <Select value={newSkill.category} onValueChange={(val) => setNewSkill({...newSkill, category: val})}>
                      <SelectTrigger className="bg-black border-white/10 text-white">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-white/10 text-white">
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-[2] space-y-2">
                    <Label className="text-white font-bold">Skill Name</Label>
                    <Input className="bg-black border-white/10 text-white" value={newSkill.name} onChange={e => setNewSkill({...newSkill, name: e.target.value})} placeholder="e.g. Docker" required />
                  </div>
                  <div className="flex items-end">
                    <Button type="submit" disabled={submitting} className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest px-8">
                      {submitting ? <Loader2 className="size-4 animate-spin" /> : <Plus className="mr-2 size-4" />}
                      Add Skill
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {categories.map(cat => (
                <Card key={cat} className="bg-[#1a1a1a] border-white/5 flex flex-col group hover:border-primary/20 transition-all">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-headline uppercase tracking-widest text-primary border-b border-white/5 pb-2">{cat}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {skills.filter(s => s.category === cat).map(skill => (
                      <Badge key={skill.id} variant="secondary" className="bg-black text-white border border-white/10 flex items-center gap-2 pr-1 py-1 group/badge hover:border-primary/50 transition-colors">
                        {skill.name}
                        <button onClick={() => handleDeleteSkill(skill.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 className="size-3" />
                        </button>
                      </Badge>
                    ))}
                    {skills.filter(s => s.category === cat).length === 0 && <span className="text-xs text-muted-foreground italic">No skills listed yet</span>}
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
