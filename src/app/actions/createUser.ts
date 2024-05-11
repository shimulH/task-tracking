'use server';
import { currentUser } from '@clerk/nextjs/server';
import { db } from '../db/drizzle';
import { User } from '../db/schema';
import { NextResponse } from 'next/server';
import { log } from '@/app/log';

async function createUser(
  id: string,
  imageUrl: string,
  userFirstName: string,
  userLastName: string
) {
  log.info('creating user due to clerk webhook');
  await db.insert(User).values({
    id,
    imageUrl,
    userFirstName,
    userLastName,
  });

  return NextResponse.json(
    {
      message: 'user created',
    },
    { status: 200 }
  );
}

export default createUser;
