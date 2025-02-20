/* eslint-disable prettier/prettier */
import * as z from 'zod';

export const invoiceFormSchema = z.object({
  name: z.string().min(3, 'Invoice name must be at least 3 characters'),
  number: z.string().optional(),
  dueDate: z
    .date()
    .nullable()
    .refine((date) => date !== null, {
      message: 'Due date is required',
    }),
  amount: z.number().positive('Amount must be positive'),
  status: z.enum(['paid', 'unpaid', 'pending']),
});
