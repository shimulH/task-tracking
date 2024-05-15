'use server';

import { Card, CardDef } from '../db/schema';
import { db } from '../db/drizzle';
import { log } from '../log';
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';

async function updateCard({
  id,
  title,
  listId,
  dueDate,
  description,
  reminderDate,
}: {
  id: CardDef['id'];
  title: CardDef['title'];
  listId: CardDef['listId'];
  dueDate: CardDef['dueDate'];
  description: CardDef['description'];
  reminderDate: CardDef['reminderDate'];
}) {
  log.info('update card..');
  const res = await db
    .update(Card)
    .set({
      id,
      title,
      description,
      dueDate,
      reminderDate,
      listId,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(Card.id, id));

  revalidatePath('/boards');

  return { success: true };
}

export default updateCard;
