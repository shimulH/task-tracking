'use server';

import { CardIndex } from './../db/schema';

import { db } from '../db/drizzle';
import { log } from '../log';
import { revalidatePath } from 'next/cache';

async function getCardIndex() {
  try {
    log.info('get cardIndex..');
    const res = await db.select().from(CardIndex);
    revalidatePath('/boards');
    return { success: true, data: res };
  } catch {
    return { success: false, status: 500, error: 'Something went wrong' };
  }
}

export default getCardIndex;
