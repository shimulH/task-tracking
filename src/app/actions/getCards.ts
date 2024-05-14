'use server';
import { currentUser } from '@clerk/nextjs/server';

import { Card, List, ListDef, UserDef } from '../db/schema';
import { db } from '../db/drizzle';
import { Board } from '../db/schema';
import { NextResponse } from 'next/server';
import { log } from '../log';
import { v4 as uuidv4 } from 'uuid';
import { eq } from 'drizzle-orm';

async function getCards() {
  try {
    log.info('getting cards..');
    const user = await currentUser();
    if (user) {
      const res = await db.select().from(Card);
      console.log();
      return {
        message: 'got cards',
        success: true,
        data: res,
        status: 200,
      };
    }
  } catch {
    return { success: false, status: 500, error: 'Something went wrong' };
  }
}

export default getCards;
