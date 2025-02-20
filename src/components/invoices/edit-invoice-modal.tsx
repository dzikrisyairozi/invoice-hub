/* eslint-disable prettier/prettier */
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  InputAdornment,
  MenuItem,
  Modal,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { invoiceFormSchema } from '@/lib/schemas/invoice';
import type { Invoice, InvoiceFormData } from '@/types';

interface EditInvoiceModalProps {
  open: boolean;
  onClose: () => void;
  invoice: Invoice | null;
  onSave: (updatedInvoice: Invoice) => void;
}

export function EditInvoiceModal({
  open,
  onClose,
  invoice,
  onSave,
}: EditInvoiceModalProps) {
  const {
    control,
    handleSubmit,
    reset,
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

  useEffect(() => {
    if (invoice) {
      reset({
        name: invoice.name,
        amount: invoice.amount,
        status: invoice.status,
        dueDate: new Date(invoice.dueDate),
      });
    }
  }, [invoice, reset, open]);

  const handleFormSubmit = handleSubmit((data) => {
    console.log('Form submitted with data:', data); // Debug log

    if (!invoice || !data.dueDate) {
      console.error('Missing invoice or due date');
      return;
    }

    const updatedInvoice: Invoice = {
      id: invoice.id,
      number: invoice.number,
      createdAt: invoice.createdAt,
      name: data.name,
      amount: data.amount,
      status: data.status,
      dueDate: data.dueDate.toISOString(),
    };

    console.log('Saving updated invoice:', updatedInvoice); // Debug log
    onSave(updatedInvoice);
    onClose();
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-invoice-modal"
      className="flex items-center justify-center"
    >
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-xl font-semibold">Edit Invoice</h2>
        <hr className="mb-6 mt-2" />

        <form onSubmit={handleFormSubmit} className="space-y-6">
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
                    fullWidth
                    size="small"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
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
                    slotProps={{
                      textField: {
                        size: 'small',
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
                    size="small"
                    onChange={(e) => onChange(Number(e.target.value))}
                    error={!!errors.amount}
                    helperText={errors.amount?.message}
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
                    size="small"
                    error={!!errors.status}
                    helperText={errors.status?.message}
                  >
                    <MenuItem value="paid">Paid</MenuItem>
                    <MenuItem value="unpaid">Unpaid</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                  </TextField>
                )}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button onClick={onClose} variant="outlined">
              Cancel
            </Button>
            <Button type="submit" variant="contained" className="bg-blue-600">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
