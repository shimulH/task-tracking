'use client';

import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { useBoardStore } from '@/store/board-store';
import { Column } from '@/components/column';
import { NewColumn } from './new-list';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { CardDef, CardIndexDef, ListDef } from '@/app/db/schema';
import updateCard from '@/app/actions/updateCard.';
import { DropAreaColumn } from './drop-area-columns';
import getCardIndex from '@/app/actions/getCardIndex';
import updateCardIndex from '@/app/actions/updateCardIndex';

interface ColumnDef extends ListDef {
  cards?: CardDef[] | undefined;
}
export default function Board({
  lists,
  cards,
}: {
  lists: ListDef[] | undefined;
  cards: CardDef[] | undefined;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const draggingCard = useBoardStore((state) => state.draggingCard);
  const draggingColumn = useBoardStore((state) => state.draggingColumn);
  const [columns, setColumns] = useState<ColumnDef[] | undefined>();
  const [cardIndexByColumn, setCardIndexByColumn] = useState<
    CardIndexDef[] | undefined
  >();

  const onDrop = async (
    column: string,
    index: number,
    dropAreaColumn: number
  ) => {
    if (!draggingCard) return;

    const newPosition = index;
    const prevPosition = draggingCard.cardIndex;
    if (draggingCard.columnIndex === dropAreaColumn) {
      let cloneColumns = columns && [...columns];
      let cloneFilteredCards = cloneColumns && [
        ...cloneColumns[dropAreaColumn].cards!,
      ];

      cloneFilteredCards?.splice(
        newPosition,
        0,
        cloneFilteredCards.splice(prevPosition!, 1)[0]
      );

      if (cloneColumns) {
        cloneColumns[dropAreaColumn].cards = cloneFilteredCards;
      }

      // @ts-ignore
      if (document.startViewTransition) {
        // @ts-ignore
        document.startViewTransition(() => {
          flushSync(() => {
            setColumns(cloneColumns);
          });
        });
        // If view transitions aren't supported other browser, we just update the state.
      } else {
        setColumns(cloneColumns);
      }
    }

    if (draggingCard.columnIndex !== dropAreaColumn) {
      let cloneColumns = columns && [...columns];

      if (cloneColumns && draggingCard) {
        const movedCard = cloneColumns[draggingCard.columnIndex].cards?.find(
          (card) => card.id === draggingCard.id
        );

        movedCard && (await updateCard({ ...movedCard, listId: column }));
        cloneColumns[dropAreaColumn].cards?.splice(newPosition, 0, movedCard!);

        cloneColumns[draggingCard.columnIndex].cards = cloneColumns[
          draggingCard.columnIndex
        ].cards?.filter((card) => card.id !== draggingCard.id);
        cloneColumns?.map((column) => {
          updateCardIndex({
            listId: column.id,
            cardIndexArray: column.cards?.map((card) => card.id) ?? null,
          });
        });
      }
      // @ts-ignore
      if (document.startViewTransition) {
        // @ts-ignore
        document.startViewTransition(() => {
          flushSync(() => {
            setColumns(cloneColumns);
          });
        });
        // If view transitions aren't supported other browser, we just update the state.
      } else {
        setColumns(cloneColumns);
      }
    }
  };

  const showArea = () => {
    setIsVisible(true);
  };

  const hideArea = () => {
    setIsVisible(false);
  };

  const handleDrop = (index: number) => {
    if (!draggingColumn) return;

    const prevPosition = Number(draggingColumn);
    const newPosition = index;

    let cloneColumns = columns && [...columns];

    cloneColumns?.splice(
      newPosition,
      0,
      cloneColumns.splice(prevPosition, 1)[0]
    );

    setColumns(cloneColumns);
  };

  useEffect(() => {
    setColumns(
      lists?.map((column) => ({
        ...column,
        cards: cards?.filter((card) => card.listId === column.id),
      }))
    );
  }, [lists]);

  useEffect(() => {
    const fetchIndex = async () => {
      const res = await getCardIndex();
      setCardIndexByColumn(res?.data);

      // setColumns();
    };
    fetchIndex();
  }, []);

  // useEffect(() => {
  //   let cloneColumns = columns && [...columns];

  //   cloneColumns = cloneColumns?.map((col) =>
  //     cardIndexByColumn?.map((data) => {
  //       if (data.listId === col.id) {
  //         let temCards: CardDef[] = [];
  //         data.cardIndexArray?.map((index) => {
  //           temCards.push(col.cards?.find((card) => card.id === index)!);
  //         });
  //         return { ...col, cards: temCards };
  //       }
  //     })
  //   );
  //   console.log(cloneColumns);
  // }, [cardIndexByColumn]);

  return (
    <div className='flex '>
      <div className='flex flex-row'>
        <ScrollArea className='md:w-[calc(100vw-2rem)] md:overflow-x-auto md:overflow-y-hidden'>
          <div className='flex w-max space-x-4 p-4'>
            <DropAreaColumn handleDrop={() => handleDrop(0)} />
            {columns?.map((column, index) => (
              <>
                <div key={column.id} className='h-full'>
                  <Column
                    title={column.name}
                    id={column.id}
                    cards={column.cards}
                    onDrop={onDrop}
                    index={index}
                  />
                </div>

                <DropAreaColumn handleDrop={() => handleDrop(index + 1)} />
              </>
            ))}
            <div className='h-full'>
              <NewColumn />
            </div>
          </div>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      </div>
    </div>
  );
}
