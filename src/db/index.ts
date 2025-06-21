// Database setup - currently using in-memory data service
// Uncomment when ready to implement SQLite database

// import { Database } from 'bun:sqlite';
// import { drizzle } from 'drizzle-orm/bun-sqlite';
// import * as schema from './schema';

// const sqlite = new Database('tekken-babes.db');
// export const db = drizzle(sqlite, { schema });

// For now, export a placeholder to avoid import errors
export const db = null;
