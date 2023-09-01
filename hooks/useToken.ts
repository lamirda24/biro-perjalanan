import { useCallback, useEffect } from 'react';
import { useAtom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

const storage = createJSONStorage<Profile>(() => localStorage);
const someAtom = atomWithStorage('profile', { token: '', id: '', name: '' }, storage);

export const useProfile = () => {
  const [profile, setProfile] = useAtom(someAtom);

  const resetToken = useCallback(() => setProfile({ token: '', id: '', name: '' }), [setProfile]);

  return { profile, setProfile, resetToken };
};

interface Profile {
  token: string;
  id: string;
  name: string;
}
