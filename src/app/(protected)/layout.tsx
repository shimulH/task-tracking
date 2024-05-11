import React from 'react';
import { log } from '../log';
import { db } from '../db/drizzle';
import { Board } from '../db/schema';
import * as schema from '../db/schema';
import { drizzle } from 'drizzle-orm/neon-http';

// import { auth, clerkClient } from '@clerk/nextjs/server';

async function layout({ children }: { children: React.ReactNode }) {
  log.info('creating user due to clerk webhook');
  const res = await db.select().from(Board);
  console.log('boards', res);
  return (
    <div className='flex justify-center py-24 caret-lime-500'>
      layout{children}
    </div>
  );
}

export default layout;
