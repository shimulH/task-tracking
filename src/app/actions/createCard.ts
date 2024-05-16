'use server';

import { Card, CardDef } from '../db/schema';
import { db } from '../db/drizzle';
import { log } from '../log';
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from 'next/cache';

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
  try {
    log.info('creating card..');
    await db.insert(Card).values({
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

    revalidatePath('/boards');

    return { success: true };
  } catch {
    return { success: false, status: 500, error: 'Something went wrong' };
  }
}

export default createCard;
