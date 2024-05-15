'use server';

import { ListDef } from '../db/schema';
import { currentUser } from '@clerk/nextjs/server';
import { db } from '../db/drizzle';
import { List } from '../db/schema';
import { NextResponse } from 'next/server';
import { log } from '../log';
import { v4 as uuidv4 } from 'uuid';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

async function deleteList({ id }: { id: string }) {
  console.log('ddd', id);

  log.info('deleting list..');

  const res = await db.delete(List).where(eq(List.id, id));

  revalidatePath('/boards');

  return { success: true };
}

export default deleteList;
