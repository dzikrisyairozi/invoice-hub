/* eslint-disable prettier/prettier */
'use client';

import { InvoiceForm } from '@/components/invoices/invoice-form';

export default function AddInvoicePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 text-3xl font-bold">Add Invoice</h1>
      <div className="mx-auto max-w-2xl">
        <div className="rounded-lg bg-card p-6 shadow">
          <InvoiceForm />
        </div>
      </div>
    </div>
  );
}
