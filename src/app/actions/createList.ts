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

async function createList({
  name,
  boardId,
  position,
}: {
  name: ListDef['name'];
  boardId: ListDef['boardId'];
  position: ListDef['position'];
}) {
  log.info('creating list..');
  const listId = uuidv4();
  const res = await db.insert(List).values({
    id: listId,
    name,
    boardId,
    position,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const createdList = await db.select().from(List).where(eq(List.id, listId));
  revalidatePath('/boards');

  return { success: true, data: createdList };
}

export default createList;
