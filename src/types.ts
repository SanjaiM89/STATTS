export interface User {
  id: string;
  username: string;
  phoneNumber: string;
  deviceSerial?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface Application {
  id: string;
  name: string;
  icon: string;
  category: 'recently' | 'personal' | 'basic';
}

export interface Device {
  id: string;
  name: string;
  type: string;
}