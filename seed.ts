import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';
// import { db } from './src/app/db/drizzle';
import { Board, CardMember, List } from './src/app/db/schema';
import { NextResponse } from 'next/server';
import { log } from '@/app/log';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

dotenv.config({ path: './.env.local' });

if (!('POSTGRES_URL' in process.env))
  throw new Error('DATABASE_URL not found on .env.local');

// if (!('DATABASE_URL' in process.env))
//   throw new Error('DATABASE_URL not found on .env.development');

const main = async () => {
  const sql = neon<boolean, boolean>(process.env.POSTGRES_URL!);
  const db = drizzle(sql);

  const data: (typeof CardMember.$inferInsert)[] = [];

  for (let i = 0; i < 5; i++) {
    data.push({
      cardId: '50a63d14-883e-4d4f-b707-c4710d34509b0',
      userId: 'user_2gI9gRUmn8wuzCknBS2nKJNjCK2',
    });
  }

  console.log('Seed start');
  await db.insert(CardMember).values(data);
  console.log('Seed done');
};

main();
