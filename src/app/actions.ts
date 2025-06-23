'use server';

import { z } from 'zod';
import { suggestProjects } from '@/ai/flows/suggest-projects';
import type { Project } from '@/data/projects';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export async function submitContactForm(prevState: any, formData: FormData) {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  // Here you would typically send an email or save to a database.
  // For this example, we'll just log the data.
  console.log('Contact Form Submitted:', validatedFields.data);

  return { message: 'Thank you for your message! I will get back to you soon.' };
}


export async function suggestProjectsAction(projects: Project[], keywords: string) {
  if (!keywords) {
    return { error: 'Please enter some keywords.' };
  }

  try {
    const projectNames = projects.map(p => p.name);
    const projectDescriptions = projects.map(p => p.description);

    const result = await suggestProjects({
      keywords,
      projectNames,
      projectDescriptions,
    });

    return { suggestions: result.suggestedProjects };
  } catch (error) {
    console.error('Error suggesting projects:', error);
    return { error: 'Failed to get AI suggestions. Please try again.' };
  }
}
