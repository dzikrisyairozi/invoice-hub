/* eslint-disable prettier/prettier */
'use client';

import {
  MoreVert as MoreVertIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import {
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { formatCurrency } from '@/lib/utils';
import type { Invoice, InvoiceStatus } from '@/types';

const statusColors: Record<InvoiceStatus, 'success' | 'error' | 'warning'> = {
  paid: 'success',
  unpaid: 'error',
  pending: 'warning',
};

export default function InvoicesListPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | 'all'>(
    'all'
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    try {
      const storedInvoices = JSON.parse(
        localStorage.getItem('invoices') || '[]'
      );
      setInvoices(storedInvoices);
      setFilteredInvoices(storedInvoices);
    } catch (error) {
      console.error('Error loading invoices:', error);
      setInvoices([]);
      setFilteredInvoices([]);
    }
  }, []);

  useEffect(() => {
    let result = [...invoices];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (invoice) =>
          invoice.name.toLowerCase().includes(query) ||
          invoice.number.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter((invoice) => invoice.status === statusFilter);
    }

    setFilteredInvoices(result);
  }, [searchQuery, statusFilter, invoices]);

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    invoice: Invoice
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedInvoice(invoice);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedInvoice(null);
  };

  const handleDeleteInvoice = () => {
    if (selectedInvoice) {
      const newInvoices = invoices.filter((i) => i.id !== selectedInvoice.id);
      localStorage.setItem('invoices', JSON.stringify(newInvoices));
      setInvoices(newInvoices);
      handleMenuClose();
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Invoices</h1>
        <div className="flex gap-4">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search invoices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-64 rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as InvoiceStatus | 'all')
            }
            className="block w-36 rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      <TableContainer component={Paper} className="rounded-lg shadow-sm">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-medium">Invoice</TableCell>
              <TableCell className="font-medium">Due Date</TableCell>
              <TableCell className="font-medium">Status</TableCell>
              <TableCell className="font-medium">Amount</TableCell>
              <TableCell align="right" className="font-medium">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id} className="hover:bg-gray-50">
                <TableCell>
                  <div>
                    <div className="font-medium text-gray-900">
                      {invoice.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {invoice.number}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-gray-500">
                  {format(new Date(invoice.dueDate), 'PP')}
                </TableCell>
                <TableCell>
                  <Chip
                    label={invoice.status}
                    color={statusColors[invoice.status]}
                    size="small"
                    className="font-medium"
                  />
                </TableCell>
                <TableCell className="text-gray-500">
                  {formatCurrency(invoice.amount)}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuClick(e, invoice)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filteredInvoices.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-16 text-center text-gray-500"
                >
                  No invoices found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem
          onClick={handleDeleteInvoice}
          className="text-red-600 hover:bg-red-50"
        >
          Delete Invoice
        </MenuItem>
      </Menu>
    </div>
  );
}
