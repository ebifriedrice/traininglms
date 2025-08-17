import { z } from 'zod';

export const CreateStudentSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7).max(20).optional(),
  address: z.string().max(200).optional()
});

export const UpdateStudentSettingsSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().min(7).max(20).optional(),
  address: z.string().max(200).optional()
});
