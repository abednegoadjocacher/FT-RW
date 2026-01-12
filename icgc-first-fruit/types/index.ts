/* eslint-disable @typescript-eslint/no-explicit-any */
export type User = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
};

export type Transaction = {
  id: string;
  date: string;
  amount: number;
  paymentMethod: 'Bank' | 'Momo';
  status: 'Completed' | 'Pending';
  reference: string;
};

export type DashboardProps = {
  user: User;
  onLogout: () => void;
  onNavigateToPayment: () => void;
};

export type LoginPageProps = {
  onLogin: (phoneNumber: string, password: string) => void;
  onNavigateToSignup: () => void;
};

export type PaymentPageProps = {
  user: User;
  onNavigateBack: () => void;
};

export type SignupPageProps = {
  onSignup: (userData: any) => void;
  onNavigateToLogin: () => void;
};