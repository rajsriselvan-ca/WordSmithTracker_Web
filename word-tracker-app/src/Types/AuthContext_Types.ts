export interface AuthContextType {
  userDetails: any;
  token: string | null;
  login: (token: string, user: any) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}