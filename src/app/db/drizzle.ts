import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

// for migrations
const migrationClient = neon<boolean, boolean>(process.env.POSTGRES_URL!);

const sql = neon<boolean, boolean>(process.env.POSTGRES_URL!);
export const db = drizzle(sql);
