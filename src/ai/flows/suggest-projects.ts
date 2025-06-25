'use server';
/**
 * @fileOverview An AI flow to suggest portfolio projects based on keywords.
 *
 * - suggestProjects - A function that suggests projects.
 * - SuggestProjectsInput - The input type for the suggestProjects function.
 * - SuggestProjectsOutput - The return type for the suggestProjects function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const SuggestProjectsInputSchema = z.object({
  keywords: z.string().describe('Keywords to search for in projects.'),
  projectNames: z.array(z.string()).describe('A list of project names.'),
  projectDescriptions: z.array(z.string()).describe('A list of project descriptions corresponding to the names.'),
});
export type SuggestProjectsInput = z.infer<typeof SuggestProjectsInputSchema>;

const SuggestProjectsOutputSchema = z.object({
  suggestedProjects: z.array(z.string()).describe('A list of project names that are relevant to the keywords.'),
});
export type SuggestProjectsOutput = z.infer<typeof SuggestProjectsOutputSchema>;

const prompt = ai.definePrompt({
  name: 'suggestProjectsPrompt',
  input: {schema: SuggestProjectsInputSchema},
  output: {schema: SuggestProjectsOutputSchema},
  prompt: `You are an expert portfolio curator.
  Given a list of projects with their names and descriptions, and a set of keywords, please suggest the most relevant projects.
  
  Available Projects:
  {{#each projectNames}}
  - Name: {{this}}
    Description: {{lookup ../projectDescriptions @index}}
  {{/each}}
  
  Keywords: {{{keywords}}}
  
  Return only the names of the projects that are a good match for the keywords.
  If no projects match, return an empty list.
  `,
});

const suggestProjectsFlow = ai.defineFlow(
  {
    name: 'suggestProjectsFlow',
    inputSchema: SuggestProjectsInputSchema,
    outputSchema: SuggestProjectsOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);

export async function suggestProjects(input: SuggestProjectsInput): Promise<SuggestProjectsOutput> {
  return suggestProjectsFlow(input);
}
