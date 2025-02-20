export type InvoiceStatus = 'paid' | 'unpaid' | 'pending';

export interface InvoiceFormData {
  name: string;
  number?: string;
  dueDate: Date | null;
  amount: number;
  status: InvoiceStatus;
}

export interface Invoice {
  id: string;
  number: string;
  name: string;
  dueDate: string;
  amount: number;
  status: InvoiceStatus;
  createdAt: string;
}
