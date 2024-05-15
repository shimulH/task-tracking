'use server';

import { Card, CardDef } from '../db/schema';
import { db } from '../db/drizzle';
import { NextResponse } from 'next/server';
import { log } from '../log';
import { v4 as uuidv4 } from 'uuid';

async function createCard({
  title,
  listId,
  dueDate,
  description,
  reminderDate,
}: {
  title: CardDef['title'];
  listId: CardDef['listId'];
  dueDate: CardDef['dueDate'];
  description: CardDef['description'];
  reminderDate: CardDef['reminderDate'];
}) {
  log.info('creating card..');
  const res = await db.insert(Card).values({
    id: uuidv4(),
    title,
    description,
    dueDate,
    reminderDate,
    listId,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  console.log(res);

  return { success: true };
}

export default createCard;
