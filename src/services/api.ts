import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:3000'
});

export interface Budget {
  id: string;
  name: string;
  adjustments_total?: number;
  notes: Note[];
  transactions: Transaction[];
  total_value?: number;
}

export interface Note {
  denomination: number;
  quantity: number;
  title?: string;
  description?: string;
}

export interface NoteHistory {
  id: string;
  budget_id: string;
  denomination: number;
  quantity: number;
  action: string;
  title?: string;
  description?: string;
  timestamp: string;
}

export interface Transaction {
  id: string;
  budget_id: string;
  amount: number;
  transaction_type: 'deposit' | 'withdrawal';
  title?: string;
  description?: string;
  timestamp: string;
}

export interface Paged<T> {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: T[];
}


// --------------------------------
// ----------- Budgets ------------
// --------------------------------
export const createBudget = async (data: { name: string }) => {
  const res = await API.post('/budgets', data);
  return res.data as Budget;
};

export const listBudgets = async (page = 1, limit = 10) => {
  const res = await API.get<Paged<Budget>>(`/budgets?page=${page}&limit=${limit}`);
  return res.data;
};

export const updateBudget = async (id: string, body: { name: string }) => {
  const res = await API.put(`/budgets/${id}?name=${body.name}`, body);
  return res.data as Budget;
};

export const getBudget = async (id: string) => {
  const res = await API.get<Budget>(`/budgets/${id}`);
  return res.data;
};

export const deleteBudget = async (id: string) => {
  const res = await API.delete(`/budgets/${id}`);
  return res.data;
};


// --------------------------------
// ------------ Notes -------------
// --------------------------------
export const createNote = async (budget_id: string, data: Note) => {
  const res = await API.post(`/budgets/${budget_id}/notes`, data);
  return res.data;
};

// not used
export const listNotes = async (budget_id: string, page = 1, limit = 10) => {
  const res = await API.get<Paged<Note>>(
    `/budgets/${budget_id}/notes?page=${page}&limit=${limit}`
  );
  return res.data;
};

// not used
export const getNote = async (budget_id: string, note_id: string) => {
  const res = await API.get<Note>(`/budgets/${budget_id}/notes/${note_id}`);
  return res.data;
};

export const updateNote = async (budget_id: string, note_id: string, data: Partial<Note>) => {
  const res = await API.put(`/budgets/${budget_id}/notes/${note_id}`, data);
  return res.data;
};

export const deleteNote = async (budget_id: string, note_id: string) => {
  const res = await API.delete(`/budgets/${budget_id}/notes/${note_id}`);
  return res.data;
};

export const listNotesHistory = async (
  budget_id: string,
  page = 1,
  limit = 10,
  sortBy: 'timestamp' | 'value' = 'timestamp',
  order: 'asc' | 'desc' = 'desc',
) => {
  const res = await API.get<Paged<NoteHistory>>(
    `/budgets/${budget_id}/notes/history?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`
  );
  return res.data;
};


// --------------------------------
// --------- Transactions ---------
// --------------------------------
export const createTransaction = async (budget_id: string, data: {
  amount: number;
  transaction_type: 'deposit' | 'withdrawal';
  title?: string;
  description?: string;
}) => {
  const res = await API.post(`/budgets/${budget_id}/transactions`, data);
  return res.data;
};

// not used
export const getTransactions = async (budget_id: string, page = 1, limit = 10) => {
  const res = await API.get<Paged<Transaction>>(
    `/budgets/${budget_id}/transactions?page=${page}&limit=${limit}`
  );
  return res.data;
};
