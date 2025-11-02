'use server';

import { z } from 'zod';
import type { Project } from '@/data/projects';
import { Resend } from 'resend';

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
  
  const resendApiKey = process.env.RESEND_API_KEY;
  const sendToEmail = process.env.CONTACT_FORM_SEND_TO_EMAIL;
  // Use the 'onboarding' address as a default for the free plan if no custom domain is set.
  const sendFromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';


  if (!resendApiKey || !sendToEmail) {
    console.error('Resend API key or recipient email are not configured in .env.local');
    return { error: 'The server is not configured to send emails. Please contact the site administrator.' };
  }
  
  const resend = new Resend(resendApiKey);

  try {
    await resend.emails.send({
      from: `Portfolio Contact Form <${sendFromEmail}>`,
      to: sendToEmail,
      subject: `New message from ${name}`,
      reply_to: email, // This is key! Your replies will go to the visitor's email.
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });
    return { message: 'Thank you for your message! I will get back to you soon.' };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { error: 'Sorry, there was an issue sending your message. Please try again later.' };
  }
}
