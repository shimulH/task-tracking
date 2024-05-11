import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

// for migrations
const migrationClient = neon<boolean, boolean>(process.env.POSTGRES_URL!);

// async function runMigrations () {

//     await migrate(drizzle(migrationClient), {
//       migrationsFolder: '@/app/db/migrations',
//     });

//     await migrationClient.end()
// }

// Redefining generic fixes a type error. Fix coming soon:
// https://github.com/drizzle-team/drizzle-orm/issues/1945#event-12152755813
const sql = neon<boolean, boolean>(process.env.POSTGRES_URL!);
export const db = drizzle(sql);
