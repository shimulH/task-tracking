'use server';
import { currentUser } from '@clerk/nextjs/server';

import { Card, List, ListDef, UserDef } from '../db/schema';
import { db } from '../db/drizzle';
import { Board } from '../db/schema';
import { NextResponse } from 'next/server';
import { log } from '../log';
import { v4 as uuidv4 } from 'uuid';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

async function updateCard(listId: string, cardId: string) {
  try {
    log.info('updating cards..');
    const user = await currentUser();

    revalidatePath('/boards');
    if (user) {
      const res = await db
        .update(Card)
        .set({ listId: listId })
        .where(eq(Card.id, cardId));
      console.log('u---c---', res);
      return {
        message: 'card updated',
        success: true,
        data: res,
        status: 200,
      };
    }
  } catch {
    return { success: false, status: 500, error: 'Something went wrong' };
  }
}

export default updateCard;
