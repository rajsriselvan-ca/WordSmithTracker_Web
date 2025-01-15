export interface LoginUIProps {
  email: string;
  error: string | null;
  loading: boolean;
  onEmailChange: (value: string) => void;
  onLogin: () => void;
  onNavigateToRegister: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}