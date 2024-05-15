import React from 'react';
import { log } from '../log';
import { db } from '../db/drizzle';
import { Board, Card, List } from '../db/schema';
import * as schema from '../db/schema';
import { drizzle } from 'drizzle-orm/neon-http';
import Header from '@/components/header';
import { eq, ne } from 'drizzle-orm';
import { neon } from '@neondatabase/serverless';

// import { auth, clerkClient } from '@clerk/nextjs/server';

async function layout({ children }: { children: React.ReactNode }) {
  log.info('creating user due to clerk webhook');
  const lists = await db.select().from(List);
  const cards = await db
    .select()
    .from(Card)
    .fullJoin(List, eq(Card.listId, List.id));
  // console.log('boardsdfsfsf-----', lists, cards);

  return (
    <div className='flex flex-col justify-center relative overflow-hidden text-gray-300'>
      <Header />
      <div className='w-full'>
        <div className='h-[calc(100vh-4.2rem)] bg-gray-950'>
          <div className='h-full px-space8 sm:px-space24 pt-space16 text-justify '>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default layout;
