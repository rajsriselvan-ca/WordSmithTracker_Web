export interface RegisterUIProps {
  username: string;
  email: string;
  dailyGoal: number | "";
  error: string;
  onUsernameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onDailyGoalChange: (value: string) => void;
  onRegister: () => void;
  onNavigate: () => void;
}