
import { UserRole } from '@/services/authService';

// Function to determine where to redirect based on user role
export const getRedirectPathByRole = (role: UserRole | string | undefined): string => {
  switch (role) {
    case 'admin':
      return '/admin-dashboard';
    case 'instructor':
      return '/instructor-dashboard';
    case 'seller':
      return '/seller-dashboard';
    case 'customer':
      return '/';
    default:
      return '/';
  }
};
