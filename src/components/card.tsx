import { useBoardStore } from '@/store/board-store';
import type { Card as CardType } from '@/types/types';

type CardProps = CardType;

export const Card = ({ title, id, users, tags }: CardProps) => {
  const setDraggingCard = useBoardStore((state) => state.setDraggingCard);

  return (
    <div
      draggable
      onDragStart={(ev) => {
        setDraggingCard(id);
        // This enables the dragging functionality on iOS too.
        // See this great tweet by Adam Argyle: https://twitter.com/argyleink/status/1687160975374626816
        ev.dataTransfer.setData('text/html', ev.currentTarget.outerHTML);
      }}
      onDragEnd={() => setDraggingCard(null)}
      style={{ viewTransitionName: `card-${id}` }}
      className='cursor-grab rounded-lg bg-gray-700 p-4 shadow-md hover:bg-gray-600 transition-colors active:animate-pulse active:cursor-grabbing'
    >
      <p>{title}</p>

      <div className='my-2 flex flex-wrap gap-2'>
        <span className='rounded-md border border-gray-400 px-2 py-1 text-gray-400'>
          #{id}
        </span>
        {tags &&
          tags.map((tag, i) => (
            <span key={i + 1} className='rounded-md bg-gray-700 px-2 py-1'>
              {tag}
            </span>
          ))}
      </div>

      {users && (
        <div className='flex gap-2'>
          {users.map((user, i) => (
            <img
              key={i + 1}
              className='h-8 w-8 rounded-full'
              alt={user}
              src={`https://api.dicebear.com/6.x/notionists/svg?seed=${user}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
