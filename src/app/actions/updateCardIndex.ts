'use server';

import { CardIndex, CardIndexDef } from './../db/schema';
import { db } from '../db/drizzle';
import { log } from '../log';
import { revalidatePath } from 'next/cache';

async function updateCardIndex({ listId, cardIndexArray }: CardIndexDef) {
  try {
    log.info('update cardIndex..');
    const res = await db.insert(CardIndex).values({
      listId,
      cardIndexArray,
    });

    revalidatePath('/boards');
    console.log(res);

    return { success: true };
  } catch {
    return { success: false, status: 500, error: 'Something went wrong' };
  }
}

export default updateCardIndex;
