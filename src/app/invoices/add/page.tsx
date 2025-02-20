/* eslint-disable prettier/prettier */
'use client';

import { InvoiceForm } from '@/components/invoices/invoice-form';

export default function AddInvoicePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 text-3xl font-bold">Add Invoice</h1>
      <div className="w-full">
        <InvoiceForm />
      </div>
    </div>
  );
}
