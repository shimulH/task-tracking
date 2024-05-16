'use client';
import { BoardDef } from '@/app/db/schema';
import { cn } from '@/lib/utils';
import { useBoardStore } from '@/store/board-store';
import React, { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function Boards({ boards }: { boards: BoardDef[] | undefined }) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const boardId = searchParams.get('boardId');

  useEffect(() => {
    /* 
      Set the param of the board id so that from the server
      end the list api can work

      !important this feature is under development
    */
    boards && router.push(`${pathName}?boardId=${boards[0].id}`);
  }, [boards]);
  return (
    <div className=''>
      {/* {boards?.map((board, index) => (
        <div
          key={index + 1}
          className={cn(
            'p-4 bg-gray-800  cursor-pointer transition-colors hover:bg-gray-700',
            boardId === board.id && 'bg-gray-700'
          )}
          onClick={() => router.push(`${pathName}?boardId=${board.id}`)}
        >
          <h1>{board.name}</h1>
        </div>
      ))} */}
    </div>
  );
}

export default Boards;
