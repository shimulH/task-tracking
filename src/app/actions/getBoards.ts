'use server';
import { currentUser } from '@clerk/nextjs/server';

import { ListDef, UserDef } from '../db/schema';
import { db } from '../db/drizzle';
import { Board } from '../db/schema';
import { NextResponse } from 'next/server';
import { log } from '../log';
import { v4 as uuidv4 } from 'uuid';
import { eq } from 'drizzle-orm';

async function getBoards() {
  try {
    log.info('getting board..');

    const user = await currentUser();
    if (user) {
      const res = await db.select().from(Board);
      return {
        message: 'user created',
        success: true,
        data: res,
        status: 200,
      };
    }
  } catch {
    return { success: false, status: 500, error: 'Something went wrong' };
  }
}

export default getBoards;
