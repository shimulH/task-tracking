import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <section className='h-screen flex w-full items-center justify-center'>
      <SignIn />
    </section>
  );
}
