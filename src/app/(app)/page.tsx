import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';

import { WebSocketProvider } from './ws-context';
import { Dashboard } from './dashboard';

export default async function Home() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <WebSocketProvider>
        <Dashboard />
      </WebSocketProvider>
    </main>
  );
}
