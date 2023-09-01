'use client';
import { useCallback } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui';
import { useRouter } from 'next/navigation';
import { useProfile } from '@/hooks/useToken';

export const UserNav = () => {
  const router = useRouter();

  const { profile, resetToken } = useProfile();

  const onLogout = useCallback(() => {
    resetToken();
    router.push('/');
  }, [router, resetToken]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{profile?.name}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => router.push('/profile')}>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
