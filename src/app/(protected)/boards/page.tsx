'use client';

import { testAction } from '@/app/actions/text';
import { currentUser } from '@clerk/nextjs/server';

import Board from '@/components/board';

export default function Page() {
  //const user = await currentUser();
  //const res = await testAction();
  //console.log('----', res);
  return (
    <section className=''>
      <Board />
    </section>
  );
}
