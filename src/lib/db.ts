import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'contractor';
  createdAt: string;
}

export interface ClockRecord {
  id: string;
  userId: string;
  userName: string;
  clockIn: string;
  clockOut: string | null;
}

function readFile<T>(filename: string): T {
  const filePath = path.join(DATA_DIR, filename);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

function writeFile<T>(filename: string, data: T): void {
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export function getUsers(): User[] {
  return readFile<User[]>('users.json');
}

export function saveUsers(users: User[]): void {
  writeFile('users.json', users);
}

export function getUserById(id: string): User | undefined {
  return getUsers().find((u) => u.id === id);
}

export function getUserByEmail(email: string): User | undefined {
  return getUsers().find((u) => u.email === email);
}

export function createUser(user: User): void {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
}

export function updateUser(id: string, updates: Partial<User>): void {
  const users = getUsers().map((u) => (u.id === id ? { ...u, ...updates } : u));
  saveUsers(users);
}

export function deleteUser(id: string): void {
  const users = getUsers().filter((u) => u.id !== id);
  saveUsers(users);
}

export function getRecords(): ClockRecord[] {
  return readFile<ClockRecord[]>('records.json');
}

export function saveRecords(records: ClockRecord[]): void {
  writeFile('records.json', records);
}

export function getRecordsByUserId(userId: string): ClockRecord[] {
  return getRecords().filter((r) => r.userId === userId);
}

export function getOpenRecord(userId: string): ClockRecord | undefined {
  return getRecords().find((r) => r.userId === userId && r.clockOut === null);
}

export function createRecord(record: ClockRecord): void {
  const records = getRecords();
  records.push(record);
  saveRecords(records);
}

export function updateRecord(id: string, updates: Partial<ClockRecord>): void {
  const records = getRecords().map((r) => (r.id === id ? { ...r, ...updates } : r));
  saveRecords(records);
}
