/* eslint-disable prettier/prettier */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, InputAdornment, MenuItem, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { invoiceFormSchema } from '@/lib/schemas/invoice';
import { generateInvoiceNumber } from '@/lib/utils';
import type { InvoiceFormData } from '@/types';

import { AlertNotification } from '../ui/alert-notification';

export function InvoiceForm() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    <>
      <div className="w-full rounded-lg bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Invoice Form</h2>
        <hr className="mb-6 mt-2" />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">
                Name <span className="text-red-500">*</span>
              </label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Enter your invoice name"
                    fullWidth
                    variant="outlined"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    size="small"
                    className="bg-white"
                  />
                )}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">
                Number <span className="text-red-500">*</span>
              </label>
              <TextField
                fullWidth
                value={generateInvoiceNumber()}
                disabled
                placeholder="Enter your invoice number"
                size="small"
                variant="outlined"
                className="bg-gray-50"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">
                Due Date <span className="text-red-500">*</span>
              </label>
              <Controller
                name="dueDate"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <DatePicker
                    {...field}
                    value={value}
                    onChange={onChange}
                    disablePast
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        size: 'small',
                        placeholder: 'DD/MM/YYYY',
                        error: !!errors.dueDate,
                        helperText: errors.dueDate?.message,
                      },
                    }}
                  />
                )}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">
                Amount <span className="text-red-500">*</span>
              </label>
              <Controller
                name="amount"
                control={control}
                render={({ field: { onChange, ...field } }) => (
                  <TextField
                    {...field}
                    type="number"
                    fullWidth
                    placeholder="Enter your invoice amount"
                    onChange={(e) => onChange(Number(e.target.value))}
                    error={!!errors.amount}
                    helperText={errors.amount?.message}
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">Rp</InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">
                Status <span className="text-red-500">*</span>
              </label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    fullWidth
                    placeholder="Choose the status"
                    error={!!errors.status}
                    helperText={errors.status?.message}
                    size="small"
                  >
                    <MenuItem value="paid">Paid</MenuItem>
                    <MenuItem value="unpaid">Unpaid</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                  </TextField>
                )}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              variant="contained"
              className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
            >
              + Add Invoice
            </Button>
          </div>
        </form>
      </div>

      {notification?.show && (
        <AlertNotification
          show={notification?.show}
          variant={notification?.severity || 'success'}
          title={notification?.message || ''}
          description={notification?.description}
        />
      )}
    </>
  );
}
