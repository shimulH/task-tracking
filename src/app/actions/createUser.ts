'use server';
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
  try {
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
  } catch {
    return { success: false, status: 500, error: 'Something went wrong' };
  }
}

export default createUser;
