/* eslint-disable prettier/prettier */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  AlertTitle,
  Button,
  InputAdornment,
  MenuItem,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { invoiceFormSchema } from '@/lib/schemas/invoice';
import { generateInvoiceNumber } from '@/lib/utils';
import type { InvoiceFormData } from '@/types';

export function InvoiceForm() {
  const router = useRouter();
  const [notification, setNotification] = useState<{
    show: boolean;
    severity: 'success' | 'error';
    message: string;
    description?: string;
  } | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      name: '',
      amount: 0,
      status: 'pending',
      dueDate: null,
    },
  });

  const onSubmit = async (data: InvoiceFormData) => {
    try {
      const invoice = {
        id: crypto.randomUUID(),
        ...data,
        number: generateInvoiceNumber(),
        createdAt: new Date().toISOString(),
      };

      const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
      invoices.push(invoice);
      localStorage.setItem('invoices', JSON.stringify(invoices));

      setNotification({
        show: true,
        severity: 'success',
        message: 'Invoice added successfully!',
        description:
          "You can view and manage your invoice in the 'My Invoices' section.",
      });

      setTimeout(() => {
        router.push('/invoices/list');
      }, 2000);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setNotification({
        show: true,
        severity: 'error',
        message: 'Failed to add invoice',
        description: 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="rounded-lg bg-white shadow-sm">
        <div className="p-6">
          <h2 className="mb-6 text-2xl font-semibold">Invoice Form</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Name"
                      fullWidth
                      required
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      placeholder="Enter your invoice name"
                      className="bg-white"
                    />
                  )}
                />
              </div>

              <div>
                <TextField
                  fullWidth
                  label="Number"
                  value={generateInvoiceNumber()}
                  disabled
                  placeholder="Enter your invoice number"
                  className="bg-gray-50"
                />
              </div>

              <div>
                <Controller
                  name="dueDate"
                  control={control}
                  render={({ field: { value, onChange, ...field } }) => (
                    <DatePicker
                      {...field}
                      label="Due Date"
                      value={value}
                      onChange={onChange}
                      disablePast
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          required: true,
                          error: !!errors.dueDate,
                          helperText: errors.dueDate?.message,
                          className: 'bg-white',
                        },
                      }}
                    />
                  )}
                />
              </div>

              <div>
                <Controller
                  name="amount"
                  control={control}
                  render={({ field: { onChange, ...field } }) => (
                    <TextField
                      {...field}
                      type="number"
                      label="Amount"
                      fullWidth
                      required
                      error={!!errors.amount}
                      helperText={errors.amount?.message}
                      placeholder="Enter your invoice amount"
                      onChange={(e) => onChange(Number(e.target.value))}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">Rp</InputAdornment>
                        ),
                      }}
                      className="bg-white"
                    />
                  )}
                />
              </div>

              <div className="md:col-span-2">
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Status"
                      fullWidth
                      required
                      error={!!errors.status}
                      helperText={errors.status?.message}
                      className="bg-white"
                    >
                      <MenuItem value="paid">Paid</MenuItem>
                      <MenuItem value="unpaid">Unpaid</MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
                    </TextField>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                variant="contained"
                size="large"
                className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
              >
                + Add Invoice
              </Button>
            </div>
          </form>
        </div>
      </div>

      {notification?.show && (
        <Alert
          severity={notification.severity}
          className={`mt-6 ${
            notification.severity === 'success'
              ? 'bg-green-50 text-green-800'
              : 'bg-red-50 text-red-800'
          }`}
        >
          <AlertTitle className="font-bold">{notification.message}</AlertTitle>
          {notification.description}
        </Alert>
      )}
    </div>
  );
}
