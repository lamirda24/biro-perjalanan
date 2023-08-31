'use client';
import { useEffect, useMemo } from 'react';
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui';
import { useRouter } from 'next/navigation';

export const UserNav = () => {
  const data = typeof window !== 'undefined' && localStorage.getItem('profile');
  const router = useRouter();

  const profile = useMemo(() => {
    if (!data) return false;
    return JSON.parse(data);
  }, [data]);

  useEffect(() => {
    if (!profile) return;
    if (typeof window !== 'undefined') {
      localStorage.setItem('id', profile.Id);
    }
  }, [profile]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{profile?.Name}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => router.push('/profile')}>Profile</DropdownMenuItem>
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
