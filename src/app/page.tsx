import Link from 'next/link';
import { CardContent, Card } from '@/components/ui/card';

export default function Component() {
  return (
    <div className='flex h-screen w-full items-center justify-center bg-gray-950 dark:bg-gray-950'>
      <Card className='w-full max-w-md bg-gray-800 dark:bg-gray-800'>
        <CardContent className='flex flex-col items-center justify-center space-y-12 p-12'>
          <h1 className='text-3xl font-bold tracking-tighter text-gray-200 dark:text-gray-50'>
            Welcome to Task Tracker
          </h1>
          <Link
            className='inline-flex h-10 items-center justify-center rounded-md bg-pink-700 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-pink-600/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-300 disabled:pointer-events-none disabled:opacity-50 dark:bg-[#ff6b6b] dark:text-gray-50 dark:hover:bg-[#ff6b6b]/90 dark:focus-visible:ring-gray-700'
            href='/boards'
          >
            Continue
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
