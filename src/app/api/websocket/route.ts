import { getSession } from '@/lib/session';
import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request: Request) {
  const session = await getSession();

  if (!session || !session.user) {
    return NextResponse.redirect('/login');
  }

  const token = crypto.getRandomValues(new Uint8Array(32)).join('');
  const expires = new Date(Date.now() + 60 * 1000); // 1 minute

  await db.user.update({
    where: { id: session.user.id },
    data: {
      webSocketAuthenticationToken: {
        create: {
          token,
          expires,
        },
      },
    },
  });

  return new Response(JSON.stringify({ token }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
