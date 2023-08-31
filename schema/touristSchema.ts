import * as z from 'zod';

export const touristFormSchema = z.object({
  tourist_name: z.string(),
  tourist_location: z.string(),
  tourist_email: z.string().email()
});

export interface ToursitFormValues extends z.infer<typeof touristFormSchema> {}
