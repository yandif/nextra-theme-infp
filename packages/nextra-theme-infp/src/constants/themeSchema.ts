import { z } from 'zod';

export const themeSchema = z.strictObject({
  title: z.string(),
});

export type ThemeSchema = z.infer<typeof themeSchema>;
