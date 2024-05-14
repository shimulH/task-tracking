import { useState } from 'react';
import { flushSync } from 'react-dom';
import { Columns } from '@/types/types';
import { initialCardsPosition } from '@/store/data';
import { useBoardStore } from '@/store/board-store';
import { cn, moveCardToColumn } from '@/lib/utils';
import { Column } from '@/components/column';
import { NewColumn } from './new-list';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const columnTitles: { [key in Columns]: string } = {
  [Columns.IDEAS]: '💡 Ideas',

  [Columns.IN_PROGRESS]: '⏳ In Progress',
  [Columns.DONE]: '✅ Done',
  [Columns.DONEEE]: '✅ Done',
  [Columns.DONEEEE]: '✅ Done',
  [Columns.DONEEEEE]: '✅ Done',
  [Columns.DONEEEEEE]: '✅ Done',
};

const columns = Object.entries(columnTitles) as unknown as [Columns, string][];

export default function Board() {
  const [cards, setCards] = useState(initialCardsPosition);
  const [isVisible, setIsVisible] = useState(false);
  const draggingCard = useBoardStore((state) => state.draggingCard);
  const [addedColumns, addColumn] = useState(
    columns.length ? columns.length + 1 : 3
  );

  const addColumns = () => {
    addColumn(addedColumns + 1);
  };

  const onDrop = (column: Columns, index: number) => {
    if (!draggingCard) return;

    const newCards = moveCardToColumn({
      cards,
      cardId: draggingCard,
      column,
      index,
    });
    // @ts-ignore
    if (document.startViewTransition) {
      // @ts-ignore
      document.startViewTransition(() => {
        flushSync(() => {
          setCards(newCards);
        });
      });
      // If view transitions aren't supported other browser, we just update the state.
    } else {
      setCards(newCards);
    }
  };

  const showArea = () => {
    setIsVisible(true);
  };

  const hideArea = () => {
    setIsVisible(false);
  };

  const columnsMod: number = columns.length ? columns.length + 1 : 3;

  const handleDrop = (e: DragEvent) => {
    e.dataTransfer?.getData('id');
    const prevPosition = Number(e.dataTransfer?.getData('id'));
    const newPosition = 0;
    console.log(
      columns.splice(newPosition, 0, columns.splice(prevPosition, 1))
    );
    console.log(columns);
    const newColumn = [...columns.slice(0, prevPosition)];
  };

  return (
    <div className='flex '>
      <div className='flex flex-row'>
        <ScrollArea className='md:w-[calc(100vw-2rem)] md:overflow-x-auto md:overflow-y-hidden'>
          <div className='flex w-max space-x-4 p-4'>
            <div
              className='relative w-10 transition-[padding,opacity] before:absolute before:inset-2 before:rounded-xl before:border-2 before:border-dashed before:border-gray-500 before:bg-gray-600 only:h-32 last:h-32'
              onDrop={(e) => handleDrop(e)}
              onDragOver={(ev) => ev.preventDefault()}
            />
            {columns.map(([columnId, columnTitle], index) => (
              <>
                <div key={columnId} className='h-full'>
                  <Column
                    title={columnTitle}
                    id={columnId}
                    cards={cards[columnId]}
                    onDrop={onDrop}
                    index={index}
                  />
                </div>
                <div
                  className='relative w-10 transition-[padding,opacity] before:absolute before:inset-2 before:rounded-xl before:border-2 before:border-dashed before:border-gray-500 before:bg-gray-600 only:h-32 last:h-32'
                  onDrop={(e) => console.log(e.dataTransfer.getData('id'))}
                  onDragOver={(ev) => ev.preventDefault()}
                />
              </>
            ))}
            <div className='h-full'>
              <NewColumn addColumns={addColumns} title='New Col' />
            </div>
          </div>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      </div>
    </div>
  );
}
