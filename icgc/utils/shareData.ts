// Shared data store for the application
// This allows different components to access and update the same data

export interface Transaction {
  id: number;
  date: string;
  time: string;
  member: string;
  phone: string;
  type: string;
  amount: number;
  method: 'MoMo' | 'Cash' | 'Bank';
  status: string;
  month: string;
  paymentDate: string;
}

export interface Asset {
  id: number;
  name: string;
  category: string;
  purchaseDate: string;
  purchaseValue: number;
  currentValue: number;
  condition: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  location: string;
  description: string;
  quantity: number;
}

// Get transactions from localStorage or return default data
export const getTransactions = (): Transaction[] => {
  const stored = localStorage.getItem('transactions');
  if (stored) {
    return JSON.parse(stored);
  }
  
  return [
    {
      id: 1,
      date: '2024-12-08',
      time: '09:45 AM',
      member: 'John Doe',
      phone: '0501234567',
      type: 'First Fruit',
      amount: 500,
      method: 'MoMo',
      status: 'Completed',
      month: 'December 2024',
      paymentDate: '2024-12-08',
    },
    {
      id: 2,
      date: '2024-12-07',
      time: '10:30 AM',
      member: 'Jane Smith',
      phone: '0502345678',
      type: 'Welfare',
      amount: 200,
      method: 'Cash',
      status: 'Completed',
      month: 'December 2024',
      paymentDate: '2024-12-07',
    },
    {
      id: 3,
      date: '2024-12-06',
      time: '08:15 AM',
      member: 'Mike Johnson',
      phone: '0503456789',
      type: 'Project',
      amount: 1000,
      method: 'Bank',
      status: 'Completed',
      month: 'December 2024',
      paymentDate: '2024-12-06',
    },
    {
      id: 4,
      date: '2024-12-05',
      time: '11:20 AM',
      member: 'Sarah Williams',
      phone: '0504567890',
      type: 'First Fruit',
      amount: 300,
      method: 'MoMo',
      status: 'Completed',
      month: 'December 2024',
      paymentDate: '2024-12-05',
    },
    {
      id: 5,
      date: '2024-11-28',
      time: '09:00 AM',
      member: 'David Brown',
      phone: '0505678901',
      type: 'Welfare',
      amount: 150,
      method: 'Cash',
      status: 'Completed',
      month: 'November 2024',
      paymentDate: '2024-11-28',
    },
    {
      id: 6,
      date: '2024-11-25',
      time: '10:45 AM',
      member: 'Emily Davis',
      phone: '0506789012',
      type: 'Project',
      amount: 800,
      method: 'Bank',
      status: 'Completed',
      month: 'November 2024',
      paymentDate: '2024-11-25',
    },
  ];
};

// Get assets from localStorage or return default data
export const getAssets = (): Asset[] => {
  const stored = localStorage.getItem('assets');
  if (stored) {
    return JSON.parse(stored);
  }
  
  return [
    {
      id: 1,
      name: 'Church Building',
      category: 'Building',
      purchaseDate: '2020-01-15',
      purchaseValue: 500000,
      currentValue: 600000,
      condition: 'Excellent',
      location: 'Main Site',
      description: 'Main church building with sanctuary and offices',
      quantity: 1,
    },
    {
      id: 2,
      name: 'Sound System',
      category: 'Audio Visual equipment',
      purchaseDate: '2022-06-20',
      purchaseValue: 3500,
      currentValue: 2800,
      condition: 'Excellent',
      location: 'Main Sanctuary',
      description: 'Complete sound system with speakers and mixer',
      quantity: 1,
    },
    {
      id: 3,
      name: 'Padded Chairs',
      category: 'Furniture & fittings',
      purchaseDate: '2021-03-10',
      purchaseValue: 5000,
      currentValue: 4000,
      condition: 'Good',
      location: 'Main Sanctuary',
      description: 'Padded chairs for congregation',
      quantity: 200,
    },
    {
      id: 4,
      name: 'Grand Piano',
      category: 'Musical equipment',
      purchaseDate: '2020-08-05',
      purchaseValue: 8000,
      currentValue: 7500,
      condition: 'Excellent',
      location: 'Main Sanctuary',
      description: 'Grand piano for worship services',
      quantity: 1,
    },
    {
      id: 5,
      name: 'Office Computers',
      category: 'Computers & accessories',
      purchaseDate: '2023-05-12',
      purchaseValue: 4500,
      currentValue: 3500,
      condition: 'Good',
      location: 'Admin Office',
      description: 'Desktop computers for administrative staff',
      quantity: 5,
    },
    {
      id: 6,
      name: 'Church Van',
      category: 'Motor vehicle',
      purchaseDate: '2021-11-20',
      purchaseValue: 35000,
      currentValue: 28000,
      condition: 'Good',
      location: 'Church Parking',
      description: '15-seater van for church outreach',
      quantity: 1,
    },
  ];
};

// Save transactions to localStorage
export const saveTransactions = (transactions: Transaction[]) => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
};

// Save assets to localStorage
export const saveAssets = (assets: Asset[]) => {
  localStorage.setItem('assets', JSON.stringify(assets));
};
