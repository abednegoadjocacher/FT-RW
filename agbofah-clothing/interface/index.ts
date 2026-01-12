export interface Application {
  id: string;
  fullName: string;
  email: string;
  phone: string;           
  experience: string;
  portfolio: string | null;
  portfolioData: string | null;
  portfolioType: string | null;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}


export interface PortfolioViewerProps {
  fileName: string;
  fileData: string;
  fileType: string;
  onClose: () => void;
}