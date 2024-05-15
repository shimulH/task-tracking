import { currentUser } from '@clerk/nextjs/server';

import Board from '@/components/board';
import getBoards from '@/app/actions/getBoards';
import { cookies } from 'next/headers';
import Boards from '@/components/boards';
import getLists from '@/app/actions/getLists';
import getCards from '@/app/actions/getCards';

export default async function Page({
  searchParams,
}: {
  searchParams: { boardId: string };
}) {
  const res = await getBoards();
  const boardId = searchParams.boardId;
  const cards = await getCards();

  const lists = await getLists(process.env.NEXT_PUBLIC_BOARD_ID!);

  return (
    <section className=''>
      {/* <Boards boards={res?.data} /> */}
      <Board cards={cards?.data} lists={lists?.data} />
    </section>
  );
}
