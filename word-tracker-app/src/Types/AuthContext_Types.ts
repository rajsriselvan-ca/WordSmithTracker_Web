export interface UserDetails {
  id: string;
  username: string;
  email: string;
  dailyGoal: number;
}

export interface AuthContextType {
  userDetails: UserDetails | null;
  token: string | null;
  login: (token: string, user: UserDetails) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}