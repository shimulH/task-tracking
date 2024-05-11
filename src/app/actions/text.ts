'use server';
import { currentUser } from '@clerk/nextjs/server';

export const testAction = async () => {
  const user = await currentUser();
  if (!user) throw new Error('User not found');
  return user;
};
