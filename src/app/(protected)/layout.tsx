import React from 'react';
// import { auth, clerkClient } from '@clerk/nextjs/server';

async function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex justify-center py-24 caret-lime-500'>
      layout{children}
    </div>
  );
}

export default layout;
