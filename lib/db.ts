import Database from 'better-sqlite3';
import { join } from 'path';

const dbPath = join(process.cwd(), 'data.db');
export const db = new Database(dbPath);

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE,
    name TEXT,
    image TEXT,
    role TEXT DEFAULT 'CANDIDATE',
    createdAt INTEGER NOT NULL,
    updatedAt INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS jobs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    type TEXT NOT NULL,
    location TEXT NOT NULL,
    remote INTEGER DEFAULT 0,
    salaryMin INTEGER NOT NULL,
    salaryMax INTEGER NOT NULL,
    currency TEXT DEFAULT 'USD',
    requirements TEXT NOT NULL,
    skills TEXT NOT NULL,
    experienceLevel TEXT NOT NULL,
    applicationUrl TEXT NOT NULL,
    companyId TEXT NOT NULL,
    views INTEGER DEFAULT 0,
    status TEXT DEFAULT 'ACTIVE',
    createdAt INTEGER NOT NULL,
    updatedAt INTEGER NOT NULL,
    expiresAt INTEGER
  );

  CREATE TABLE IF NOT EXISTS companies (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    logo TEXT,
    website TEXT,
    description TEXT,
    userId TEXT UNIQUE,
    createdAt INTEGER NOT NULL,
    updatedAt INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
  );
`);