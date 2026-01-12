'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Building2, Smartphone, Check } from 'lucide-react';
import { toast } from 'sonner';
import {User, PaymentPageProps} from '@/types';

type PaymentMethod = 'Bank' | 'Momo';

export default function PaymentPage({ user, onNavigateBack }: PaymentPageProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Momo');
  const [amount, setAmount] = useState('');
  const [momoNumber, setMomoNumber] = useState('');
  const [momoProvider, setMomoProvider] = useState('MTN');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (paymentMethod === 'Momo' && !momoNumber) {
      toast.error('Please enter your Mobile Money number');
      return;
    }

    if (paymentMethod === 'Bank' && (!bankName || !accountNumber)) {
      toast.error('Please enter your bank details');
      return;
    }

    // Process payment
    setIsProcessing(true);

    setTimeout(() => {
      // Generate reference number
      const reference = `FF${Date.now().toString().slice(-8)}`;

      // Create transaction
      const transaction = {
        id: Date.now().toString(),
        phoneNumber: user.phoneNumber,
        date: new Date().toISOString(),
        amount: parseFloat(amount),
        paymentMethod,
        status: 'Completed',
        reference,
        ...(paymentMethod === 'Momo' && { 
          momoNumber, 
          momoProvider 
        }),
        ...(paymentMethod === 'Bank' && { 
          bankName, 
          accountNumber 
        })
      };

      // Save transaction
      const allTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
      allTransactions.push(transaction);
      localStorage.setItem('transactions', JSON.stringify(allTransactions));

      setIsProcessing(false);
      setShowSuccess(true);

      // Reset form
      setTimeout(() => {
        toast.success('Payment successful!');
      }, 500);
    }, 2000);
  };

  const handleBackToDashboard = () => {
    setShowSuccess(false);
    onNavigateBack();
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-12 pb-8">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="bg-green-100 rounded-full p-4">
                  <Check className="size-16 text-green-600" />
                </div>
              </div>
              <div>
                <h2 className="mb-2">Payment Successful!</h2>
                <p className="text-muted-foreground">
                  Your First Fruit payment of GH₵ {amount} has been processed successfully.
                </p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Payment Method</p>
                <p>{paymentMethod}</p>
              </div>
              <Button onClick={handleBackToDashboard} className="w-full">
                Back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button variant="ghost" onClick={onNavigateBack} className="gap-2">
              <ArrowLeft className="size-4" />
              Back
            </Button>
            <div>
              <h1 className="text-lg">Make Payment</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>First Fruit Payment</CardTitle>
            <CardDescription>
              Choose your preferred payment method and complete your offering
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Amount */}
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (GH₵) *</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="100.00"
                  required
                  disabled={isProcessing}
                />
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-3">
                <Label>Payment Method *</Label>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
                  disabled={isProcessing}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Mobile Money */}
                    <label
                      htmlFor="momo"
                      className={`flex items-center space-x-3 border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        paymentMethod === 'Momo'
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <RadioGroupItem value="Momo" id="momo" />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="bg-primary/10 rounded-full p-2">
                          <Smartphone className="size-5 text-primary" />
                        </div>
                        <div>
                          <div>Mobile Money</div>
                          <div className="text-sm text-muted-foreground">
                            MTN, Vodafone, AirtelTigo
                          </div>
                        </div>
                      </div>
                    </label>

                    {/* Bank Transfer */}
                    <label
                      htmlFor="bank"
                      className={`flex items-center space-x-3 border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        paymentMethod === 'Bank'
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <RadioGroupItem value="Bank" id="bank" />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="bg-primary/10 rounded-full p-2">
                          <Building2 className="size-5 text-primary" />
                        </div>
                        <div>
                          <div>Bank Transfer</div>
                          <div className="text-sm text-muted-foreground">
                            All major banks
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                </RadioGroup>
              </div>

              {/* Mobile Money Fields */}
              {paymentMethod === 'Momo' && (
                <div className="space-y-4 border-t pt-4">
                  <h3>Mobile Money Details</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="momoProvider">Provider *</Label>
                    <Select
                      value={momoProvider}
                      onValueChange={setMomoProvider}
                      disabled={isProcessing}
                    >
                      <SelectTrigger id="momoProvider">
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MTN">MTN Mobile Money</SelectItem>
                        <SelectItem value="Vodafone">Vodafone Cash</SelectItem>
                        <SelectItem value="AirtelTigo">AirtelTigo Money</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="momoNumber">Mobile Money Number *</Label>
                    <Input
                      id="momoNumber"
                      type="tel"
                      value={momoNumber}
                      onChange={(e) => setMomoNumber(e.target.value)}
                      placeholder="0241234567"
                      required
                      disabled={isProcessing}
                    />
                  </div>
                </div>
              )}

              {/* Bank Transfer Fields */}
              {paymentMethod === 'Bank' && (
                <div className="space-y-4 border-t pt-4">
                  <h3>Bank Transfer Details</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name *</Label>
                    <Input
                      id="bankName"
                      type="text"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      placeholder="e.g., GCB Bank"
                      required
                      disabled={isProcessing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number *</Label>
                    <Input
                      id="accountNumber"
                      type="text"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder="0123456789"
                      required
                      disabled={isProcessing}
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing Payment...' : 'Complete Payment'}
              </Button>

              {isProcessing && (
                <p className="text-center text-sm text-muted-foreground">
                  Please wait while we process your payment...
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}