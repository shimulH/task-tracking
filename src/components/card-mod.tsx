import { CardContent, Card } from '@/components/ui/card';
import { CardDef } from '@/app/db/schema';
import { useBoardStore } from '@/store/board-store';
import { useState } from 'react';
import CardDetails from './card-details';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Dialog } from './ui/dialog';

export default function CardMod({
  card,
  cardIndex,
  columnIndex,
}: {
  card: CardDef;
  cardIndex: number;
  columnIndex: number;
}) {
  const setDraggingCard = useBoardStore((state) => state.setDraggingCard);
  const [openDetails, setOpen] = useState(false);

  return (
    <Dialog>
      <Card
        draggable
        onDragStart={(ev) => {
          setDraggingCard(card?.id, columnIndex, cardIndex);
          // This enables the dragging functionality on iOS too.
          ev.dataTransfer.setData('text/html', ev.currentTarget.outerHTML);
        }}
        onClick={() => setOpen(true)}
        onDragEnd={() => setDraggingCard(null, 0, null)}
        style={{ viewTransitionName: `card-${card?.id}` }}
        className='cursor-grab border border-gray-900 rounded-lg bg-gray-700 p-2 shadow-md hover:bg-gray-600 transition-colors active:animate-pulse active:cursor-grabbing'
      >
        <CardContent>
          <div className='flex  flex-col gap-2 '>
            <DialogTrigger>
              <div className='flex justify-between'>
                <h3 className='text-lg font-semibold '>{card?.title}</h3>
                <div>Edit</div>
              </div>
            </DialogTrigger>

            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Product launch for our new line of smart home devices.
            </p>
            <div className='flex items-center gap-2'>
              <span className='bg-green-700 text-white px-2 py-1 rounded-md text-xs font-medium'>
                Today
              </span>
              <span className='bg-yellow-500 text-white px-2 py-1 rounded-md text-xs font-medium'>
                1 Week
              </span>
              <span className='bg-red-700 text-white px-2 py-1 rounded-md text-xs font-medium'>
                1 Month
              </span>
            </div>
          </div>
          {/* <div className='flex items-center justify-between'>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            Product launch for our new line of smart home devices.
          </p>
          <div className='flex -space-x-2'>
            <Avatar>
              <AvatarImage alt='@jaredpalmer' src='/placeholder-avatar.jpg' />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage alt='@shadcn' src='/placeholder-avatar.jpg' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage alt='@maxleiter' src='/placeholder-avatar.jpg' />
              <AvatarFallback>ML</AvatarFallback>
            </Avatar>
          </div>
        </div> */}

          <CardDetails
            setOpen={() => setOpen(false)}
            openDetails={openDetails}
            card={card}
          />
        </CardContent>
      </Card>
    </Dialog>
  );
}
