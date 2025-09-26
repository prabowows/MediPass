'use server';

/**
 * @fileOverview Personalized notification flow for patients. It analyzes patient medical history and suggests relevant notifications.
 *
 * - personalizedNotifications - A function that generates personalized notifications for a patient.
 * - PersonalizedNotificationsInput - The input type for the personalizedNotifications function.
 * - PersonalizedNotificationsOutput - The return type for the personalizedNotifications function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedNotificationsInputSchema = z.object({
  patientMedicalHistory: z
    .string()
    .describe('The complete medical history of the patient.'),
  hospitalPromotions: z
    .string()
    .describe('Current hospital promotions and offers.'),
  medicationUpdates: z
    .string()
    .describe('Recent updates or recalls for medications.'),
});
export type PersonalizedNotificationsInput = z.infer<
  typeof PersonalizedNotificationsInputSchema
>;

const PersonalizedNotificationsOutputSchema = z.object({
  relevantNotifications: z
    .string()
    .describe(
      'A summary of notifications (promotions, medication updates, or check-up recommendations) that are most relevant to the patient, given their medical history.'
    ),
  reasoning: z
    .string()
    .describe(
      'Explanation of why the notifications are relevant to the patient medical history.'
    ),
});
export type PersonalizedNotificationsOutput = z.infer<
  typeof PersonalizedNotificationsOutputSchema
>;

export async function personalizedNotifications(
  input: PersonalizedNotificationsInput
): Promise<PersonalizedNotificationsOutput> {
  return personalizedNotificationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedNotificationsPrompt',
  input: {schema: PersonalizedNotificationsInputSchema},
  output: {schema: PersonalizedNotificationsOutputSchema},
  prompt: `You are an AI assistant that analyzes patient medical history and suggests relevant notifications.

  Given the following patient medical history:
  {{patientMedicalHistory}}

  And the following hospital promotions:
  {{hospitalPromotions}}

  And the following medication updates:
  {{medicationUpdates}}

  Determine which notifications are most relevant to the patient and provide a summary of those notifications, followed by a reasoning explaining why the notifications are relevant to the patient's medical history.
  `,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const personalizedNotificationsFlow = ai.defineFlow(
  {
    name: 'personalizedNotificationsFlow',
    inputSchema: PersonalizedNotificationsInputSchema,
    outputSchema: PersonalizedNotificationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
