export interface MenuBarUIProps {
  isSidebarOpen: boolean;
  handleLogout: () => void;
  setIsSidebarOpen: (open: boolean) => void;
  isActive: (path: string) => boolean;
}