'use server';

import { z } from 'zod';
import { suggestProjects } from '@/ai/flows/suggest-projects';
import type { Project } from '@/data/projects';
import nodemailer from 'nodemailer';

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

  const { name, email, message } = validatedFields.data;

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.CONTACT_FORM_SEND_TO_EMAIL) {
    console.error('SMTP environment variables are not configured.');
    return { error: 'The server is not configured to send emails. Please contact the site administrator.' };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_FROM_EMAIL || email}>`,
      to: process.env.CONTACT_FORM_SEND_TO_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      text: message,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email,
    });
    return { message: 'Thank you for your message! I will get back to you soon.' };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { error: 'Sorry, there was an issue sending your message. Please try again later.' };
  }
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
