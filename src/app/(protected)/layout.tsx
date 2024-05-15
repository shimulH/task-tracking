import React from 'react';
import Header from '@/components/header';

async function layout({ children }: { children: React.ReactNode }) {
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
