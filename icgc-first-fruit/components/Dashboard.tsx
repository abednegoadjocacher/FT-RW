/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Church, LogOut, Plus, Smartphone, Building2 } from 'lucide-react';
import {User, Transaction, DashboardProps } from "@/types";

export default function Dashboard({ user, onLogout, onNavigateToPayment }: DashboardProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // Load transactions for this user
    const allTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    const userTransactions = allTransactions.filter(
      (t: any) => t.phoneNumber === user.phoneNumber
    );
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTransactions(userTransactions);
  }, [user.phoneNumber]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatAmount = (amount: number) => {
    return `GH₵ ${amount.toFixed(2)}`;
  };

  const totalPaid = transactions
    .filter(t => t.status === 'Completed')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-primary rounded-full p-2">
                <Church className="size-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg">ICGC Praise-Hill Temple</h1>
                <p className="text-sm text-muted-foreground">First Fruit Payment Portal</p>
              </div>
            </div>
            <Button variant="outline" onClick={onLogout} className="gap-2">
              <LogOut className="size-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2>Welcome, {user.firstName} {user.lastName}!</h2>
          <p className="text-muted-foreground mt-1">
            Manage your First Fruit payments and view your transaction history
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Paid</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl">{formatAmount(totalPaid)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl">{transactions.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Quick Action</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={onNavigateToPayment} className="w-full gap-2">
                <Plus className="size-4" />
                Make Payment
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Transactions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>
              View all your First Fruit payment transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  No transactions yet
                </div>
                <Button onClick={onNavigateToPayment} className="gap-2">
                  <Plus className="size-4" />
                  Make Your First Payment
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{formatDate(transaction.date)}</TableCell>
                        <TableCell>{formatAmount(transaction.amount)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {transaction.paymentMethod === 'Momo' ? (
                              <Smartphone className="size-4 text-muted-foreground" />
                            ) : (
                              <Building2 className="size-4 text-muted-foreground" />
                            )}
                            {transaction.paymentMethod}
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {transaction.reference}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={transaction.status === 'Completed' ? 'default' : 'secondary'}
                          >
                            {transaction.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}