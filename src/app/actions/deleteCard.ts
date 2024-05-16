'use server';

import { Card } from '../db/schema';
import { db } from '../db/drizzle';
import { log } from '../log';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

async function deleteCard({ id }: { id: string }) {
  try {
    log.info('deleting card..');

    await db.delete(Card).where(eq(Card.id, id));
    revalidatePath('/boards');

    return { success: true };
  } catch {
    return { success: false, status: 500, error: 'Something went wrong' };
  }
}

export default deleteCard;
