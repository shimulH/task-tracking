'use server';
import { db } from '../db/drizzle';
import { List } from '../db/schema';
import { log } from '../log';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

async function deleteList({ id }: { id: string }) {
  log.info('deleting list..');

  await db.delete(List).where(eq(List.id, id));
  revalidatePath('/boards');
  return { success: true };
}

export default deleteList;
