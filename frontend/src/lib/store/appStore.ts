// /lib/store/appStore.ts
import { create } from 'zustand';
import { api } from '@/lib/api';
import { AxiosError } from 'axios';

type User = {
  id: string;
  username: string;
  email: string;
};

type MachineStatus = 'Operational' | 'Maintenance' | 'Idle' | 'Error';

type Machine = {
  id: string;
  machineId: string;
  name: string;
  status: MachineStatus;
  temperature: number;
  energyConsumption: number;
};

type AppState = {
  // Auth State
  user: User | null;
  token: string | null;
  authLoading: boolean;
  authError: string | null;

  // Machine State
  machines: Machine[];
  selectedMachine: Machine | null;
  machinesLoading: boolean;
  machinesError: string | null;
  initializeFromStorage: () => void;
  // Auth Actions
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;

  // Machine Actions
  fetchAllMachines: () => Promise<void>;
  fetchMachineById: (id: string) => Promise<void>;
  updateMachineStatus: (id: string, status: MachineStatus) => Promise<void>;
  updateMachineMetrics: (
    id: string, 
    updates: Partial<Pick<Machine, 'temperature' | 'energyConsumption'>>
  ) => Promise<void>;
};

export const useAppStore = create<AppState>((set, get) => ({
  // Initial State
  user: null,
  token: null,
  authLoading: false,
  authError: null,
  machines: [],
  selectedMachine: null,
  machinesLoading: false,
  machinesError: null,
  
  initializeFromStorage: () => {
   
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      set({
        user: user ? JSON.parse(user) : null,
        token: token || null
      });
    
  },

  // Auth Actions
  login: async (email, password) => {
    set({ authLoading: true, authError: null });
    try {
      const { data } = await api.post<{ userInfo: User; token: string }>('/auth/login', { email, password });
      set({ 
        user: data.userInfo,
        token: data.token,
        authError: null
      });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.userInfo));
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      set({ 
        authError: err.response?.data?.message || err.message || 'Login failed' 
      });
      throw error;
    } finally {
      set({ authLoading: false });
    }
  },

  signup: async (username, email, password) => {
    set({ authLoading: true, authError: null });
    try {
      await api.post('/auth/signup', { username, email, password });
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      set({ 
        authError: err.response?.data?.message || err.message || 'Registration failed' 
      });
      throw error;
    } finally {
      set({ authLoading: false });
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      localStorage.removeItem('token');
      set({ 
        user: null, 
        token: null,
        machines: [],
        selectedMachine: null 
      });
    }
  },

  // Machine Actions
  fetchAllMachines: async () => {
    set({ machinesLoading: true, machinesError: null });
    try {
      const { data } = await api.get<Machine[]>('/machines');
      set({ machines: data, machinesError: null });
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      set({ 
        machinesError: err.response?.data?.message || err.message || 'Failed to fetch machines' 
      });
    } finally {
      set({ machinesLoading: false });
    }
  },

  fetchMachineById: async (id) => {
    set({ machinesLoading: true, machinesError: null });
    try {
      const { data } = await api.get<Machine>(`/machines/${id}`);
      set({ selectedMachine: data, machinesError: null });
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      set({ 
        machinesError: err.response?.data?.message || err.message || 'Machine not found' 
      });
    } finally {
      set({ machinesLoading: false });
    }
  },

  updateMachineStatus: async (id, status) => {
    set({ machinesLoading: true, machinesError: null });
    try {
      const { data } = await api.patch<Machine>(`/machines/${id}`, { status });
      set(state => ({
        machines: state.machines.map(m => 
          m.id === id ? { ...m, status: data.status } : m
        ),
        selectedMachine: data,
        machinesError: null
      }));
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      set({ 
        machinesError: err.response?.data?.message || err.message || 'Failed to update status' 
      });
      throw error;
    } finally {
      set({ machinesLoading: false });
    }
  },

  updateMachineMetrics: async (id, updates) => {
    set({ machinesLoading: true, machinesError: null });
    try {
      const { data } = await api.patch<Machine>(`/machines/${id}`, updates);
      set(state => ({
        machines: state.machines.map(m => 
          m.id === id ? { ...m, ...data } : m
        ),
        selectedMachine: data,
        machinesError: null
      }));
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      set({ 
        machinesError: err.response?.data?.message || err.message || 'Failed to update metrics' 
      });
      throw error;
    } finally {
      set({ machinesLoading: false });
    }
  }
}));