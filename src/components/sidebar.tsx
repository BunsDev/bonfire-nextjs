'use client';

import { useState } from 'react';
import { Icons } from './icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const stories = ['Story 1', 'Story 2', 'Story 3', 'Story 4', 'Story 5'];

export function Sidebar({
  user,
}: {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}) {
  let initials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
    : '';

  const [open, setOpen] = useState(true);
  const [hidden, setHidden] = useState(false);

  const handleTransitionEnd = () => {
    if (!open) {
      setHidden(true);
    }
  };

  return (
    <div
      className={cn(
        'h-full overflow-x-hidden transition-[width] duration-500 ',
        open ? 'w-[250px]' : 'w-0',
        hidden && 'hidden',
      )}
      onTransitionEnd={handleTransitionEnd}
    >
      <div
        className={cn(
          'h-full w-[250px] flex flex-col justify-between items-center bg-black border-r border-white/10',
        )}
      >
        <div className="w-full h-12 p-2 flex items-center gap-x-2">
          <div className="h-8 flex grow p-2 gap-x-2 items-center rounded-md border border-white/10 hover:cursor-pointer">
            <Icons.plus className="w-4 h-4" />
            <div className="text-xs font-light">New Story</div>
          </div>
          <div
            className="h-8 flex p-2 items-center justify-center rounded-md border border-white/10 hover:cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <Icons.sidepanel className="w-4 h-4" />
          </div>
        </div>
        <div className="w-full grow px-2 flex flex-col">
          <div className="text-xs p-2">Past Stories</div>
          <div className="flex flex-col gap-y-2">
            {stories.map((story, index) => (
              <div
                key={index}
                className="h-10 w-full p-2 flex items-center hover:bg-white/10 rounded-md text-xs font-light"
              >
                <Icons.logo className="w-4 h-4 mr-2" />
                {story}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-14 px-2 flex flex-col items-center justify-center">
          <div className="w-full h-12 flex items-center justify-between p-2 rounded-md hover:bg-white/10">
            <div className="flex items-center gap-x-2">
              <Avatar className="h-8 w-8 rounded-md">
                <AvatarImage
                  src={user.image ? user.image : undefined}
                  alt={user.name ? user.name : undefined}
                />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="text-xs font-bold">{user.name}</div>
            </div>
            <div>
              <Icons.moreHorizontal />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
