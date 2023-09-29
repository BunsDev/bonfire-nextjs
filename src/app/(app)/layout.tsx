import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/session';
import { Toaster } from '@/components/ui/toaster';
import { WebSocketProvider } from './ws-context';
import { MessagesProvider } from './messages-context';
import { Navbar } from './navbar';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <WebSocketProvider>
      <MessagesProvider>
        <div className="flex flex-col h-screen mx-auto bg-neutral-950">
          <Navbar user={user} />
          {children}
        </div>
        <Toaster />
      </MessagesProvider>
    </WebSocketProvider>
  );
}
