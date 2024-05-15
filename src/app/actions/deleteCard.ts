'use server';

import { Card, ListDef } from '../db/schema';
import { db } from '../db/drizzle';
import { List } from '../db/schema';
import { log } from '../log';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

async function deleteCard({ id }: { id: string }) {
  console.log('ddd', id);

  log.info('deleting card..');

  await db.delete(Card).where(eq(Card.id, id));

  revalidatePath('/boards');

  return { success: true };
}

export default deleteCard;
