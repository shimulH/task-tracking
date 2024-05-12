import React from 'react';
import { log } from '../log';
import { db } from '../db/drizzle';
import { Board } from '../db/schema';
import * as schema from '../db/schema';
import { drizzle } from 'drizzle-orm/neon-http';
import Header from '@/components/header';

// import { auth, clerkClient } from '@clerk/nextjs/server';

async function layout({ children }: { children: React.ReactNode }) {
  log.info('creating user due to clerk webhook');
  const res = await db.select().from(Board);
  console.log('boards', res);
  return (
    <div className='flex flex-col justify-center'>
      <Header />
      <div className='mr-10 ml-10'>{children}</div>
    </div>
  );
}

export default layout;
