import { axiosx } from '@/lib/axios';
import { mainApi } from './config';

const url = `${mainApi}/api/user`;

export const getProfile: FetchProfileData = async (id) => {
  const res = axiosx(true).get(`${url}/${id}`);
  return res;
};

export interface FetchProfileRes {
  data: Profile;
}
export interface Profile {
  id: string;
  email: string;
  name: string;
  avatar: string;
}

type FetchProfileData = (id: string) => Promise<FetchProfileRes>;
