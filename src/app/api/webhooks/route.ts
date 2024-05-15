import createUser from '@/app/actions/createUser';
import { WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { Webhook } from 'svix';
import { v4 as uuidv4 } from 'uuid';

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || ``;

async function validateRequest(request: Request) {
  const payloadString = await request.text();
  const headerPayload = headers();

  const svixHeaders = {
    'svix-id': headerPayload.get('svix-id')!,
    'svix-timestamp': headerPayload.get('svix-timestamp')!,
    'svix-signature': headerPayload.get('svix-signature')!,
  };
  const wh = new Webhook(webhookSecret);
  return wh.verify(payloadString, svixHeaders) as WebhookEvent;
}

export async function POST(request: Request) {
  const payload = await validateRequest(request);
  if (payload.type === 'user.created') {
    const res = await createUser(
      payload.data.id,
      payload.data.image_url,
      payload.data.first_name ?? '',
      payload.data.last_name ?? ''
    );
  }
  return Response.json({ message: 'Received' });
}
