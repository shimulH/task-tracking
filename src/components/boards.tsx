'use client';
import { BoardDef } from '@/app/db/schema';
import { cn } from '@/lib/utils';
import { useBoardStore } from '@/store/board-store';
import React, { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function boards({ boards }: { boards: BoardDef[] | undefined }) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const boardId = searchParams.get('boardId');

  useEffect(() => {
    boards && router.push(`${pathName}?boardId=${boards[0].id}`);
  }, [boards]);
  return (
    <div>
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

export default boards;
