export type InvoiceStatus = 'paid' | 'unpaid' | 'pending';

export interface Invoice {
  id: string;
  name: string;
  number: string;
  dueDate: Date;
  amount: number;
  status: InvoiceStatus;
  createdAt: string;
}

export interface InvoiceFormData {
  name: string;
  number?: string;
  dueDate: Date | null;
  amount: number;
  status: InvoiceStatus;
}
