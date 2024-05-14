import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';
// import { db } from './src/app/db/drizzle';
import { Board, Card, CardMember, List } from './src/app/db/schema';
import { NextResponse } from 'next/server';
import { log } from '@/app/log';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { v4 as uuidv4 } from 'uuid';
dotenv.config({ path: './.env.local' });

if (!('POSTGRES_URL' in process.env))
  throw new Error('DATABASE_URL not found on .env.local');

// if (!('DATABASE_URL' in process.env))
//   throw new Error('DATABASE_URL not found on .env.development');

const main = async () => {
  const sql = neon<boolean, boolean>(process.env.POSTGRES_URL!);
  const db = drizzle(sql);

  const card: (typeof Card.$inferInsert)[] = [];
  const board: (typeof Board.$inferInsert)[] = [];
  const list: (typeof List.$inferInsert)[] = [];

  const boardPayload: typeof Board.$inferInsert = {
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 'user_2gI9gRUmn8wuzCknBS2nKJNjCK2',
  };

  const listPayload: typeof List.$inferInsert = {
    id: uuidv4(),
    name: faker.internet.userName(),
    createdAt: new Date(),
    updatedAt: new Date(),
    boardId: 'bad712a9-ab4e-4831-bb1d-86202d943fdf',
    position: '1',
  };

  const cardPayload: typeof Card.$inferInsert = {
    id: uuidv4(),
    title: faker.internet.userName(),
    createdAt: new Date(),
    updatedAt: new Date(),
    listId: '6cc101ac-dbd1-4493-8d7b-6ae4510a54fc',
    description: faker.internet.userName(),
    dueDate: faker.date.anytime(),
    reminderDate: faker.date.anytime(),
    isActive: true,
  };

  for (let i = 0; i < 2; i++) {
    card.push({
      id: uuidv4(),
      title: faker.internet.userName(),
      createdAt: new Date(),
      updatedAt: new Date(),
      listId: '041f07ab-c6bc-485a-abb7-cb03a90312b8',
      description: faker.internet.userName(),
      dueDate: faker.date.anytime(),
      reminderDate: faker.date.anytime(),
      isActive: true,
    });
  }

  console.log('Seed start card');
  await db.insert(Card).values(card);
  console.log('Seed done');
};

main();
