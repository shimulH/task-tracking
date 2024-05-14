'use server';

import { ListDef } from '../db/schema';
import { currentUser } from '@clerk/nextjs/server';
import { db } from '../db/drizzle';
import { List } from '../db/schema';
import { NextResponse } from 'next/server';
import { log } from '../log';
import { v4 as uuidv4 } from 'uuid';

async function createList({ name, boardId, position }: ListDef) {
  log.info('creating list..');
  const res = await db.insert(List).values({
    id: uuidv4(),
    name,
    boardId,
    position,
  });

  console.log(res);

  return NextResponse.json(
    {
      message: 'user created',
      success: true,
    },
    { status: 200 }
  );
}

export default createList;
