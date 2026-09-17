'use server';

import { z } from 'zod';
import { Resend } from 'resend';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { projectsData, type Project } from '@/data/projects';

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
  
  try {
    // 1. Save to Firestore
    await addDoc(collection(db, 'messages'), {
      name,
      email,
      message,
      createdAt: serverTimestamp(),
    });

    // 2. Optional: Send via Telegram Bot (Free, Instant, No domain required!)
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    if (telegramBotToken && telegramChatId) {
      const text = `📬 *New Portfolio Message*\n\n*Name:* ${name}\n*Email:* ${email}\n\n*Message:*\n${message}`;
      await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: text,
          parse_mode: 'Markdown',
        }),
      });
    }

    // 3. Optional: Send Email via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    const sendToEmail = process.env.CONTACT_FORM_SEND_TO_EMAIL || 'oluseyisennuga015@gmail.com';
    const sendFromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from: `Portfolio <${sendFromEmail}>`,
        to: sendToEmail,
        subject: `New message from ${name}`,
        reply_to: email,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message}</p>`,
      });
    }

    return { message: 'Thank you! Your message has been sent and recorded.' };
  } catch (error) {
    console.error('Failed to process message:', error);
    return { error: 'Sorry, there was an issue. Please try again later.' };
  }
}

export async function getMessages() {
  try {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate()?.toISOString() || new Date().toISOString(),
    }));
  } catch (error) {
    return [];
  }
}

export async function deleteMessage(id: string) {
  try {
    await deleteDoc(doc(db, 'messages', id));
    return { success: true };
  } catch (error) {
    return { error: 'Failed to delete message' };
  }
}

export async function getProjects() {
  try {
    const snapshot = await getDocs(collection(db, 'projects'));
    if (snapshot.empty) return projectsData;
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as (Project & { id: string })[];
  } catch (error) {
    return projectsData;
  }
}

export async function saveProject(project: any) {
  try {
    if (project.id) {
      const { id, ...data } = project;
      await updateDoc(doc(db, 'projects', id), data);
    } else {
      await addDoc(collection(db, 'projects'), { ...project, createdAt: serverTimestamp() });
    }
    return { success: true };
  } catch (error) {
    return { error: 'Failed to save project' };
  }
}

export async function deleteProject(id: string) {
  try {
    await deleteDoc(doc(db, 'projects', id));
    return { success: true };
  } catch (error) {
    return { error: 'Failed to delete project' };
  }
}

export async function getSkills() {
  try {
    const q = query(collection(db, 'skills'), orderBy('createdAt', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    return [];
  }
}

export async function addSkill(category: string, name: string) {
  try {
    await addDoc(collection(db, 'skills'), { category, name, createdAt: serverTimestamp() });
    return { success: true };
  } catch (error) {
    return { error: 'Failed to add skill' };
  }
}

export async function deleteSkill(id: string) {
  try {
    await deleteDoc(doc(db, 'skills', id));
    return { success: true };
  } catch (error) {
    return { error: 'Failed to delete skill' };
  }
}
