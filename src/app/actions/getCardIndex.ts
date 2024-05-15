'use server';

import { CardIndex, CardIndexDef, List } from './../db/schema';

import { db } from '../db/drizzle';
import { log } from '../log';
import { revalidatePath } from 'next/cache';

async function getCardIndex() {
  log.info('get cardIndex..');
  const res = await db.select().from(CardIndex);
  revalidatePath('/boards');
  return { success: true, data: res };
}

export default getCardIndex;
