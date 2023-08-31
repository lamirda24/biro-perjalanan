import { axiosx } from '@/lib/axios';
import { mainApi } from './config';

const url = `${mainApi}/api/Tourist`;

export const getTouristList = async (page: number): Promise<TouristListResponse> => {
  const res = await axiosx(true).get(`${url}${page && `?page=${page}`}`);
  return res.data;
};

export const createTourist: CreateTourist = async (data) => {
  const res = await axiosx(true).post(url, data);
  return res.data;
};

export interface TouristsList {
  $id: string;
  createdat: string;
  id: string;
  tourist_email: string;

  tourist_location: string;
  tourist_name: string;
  id_tourist: string;
}

export interface TouristListResponse {
  page: string;
  per_page: number;
  totalrecord: number;
  total_pages: number;
  data: TouristsList[];
}

export interface CreateTouristReq {
  tourist_name: string;
  tourist_email: string;
  tourist_location: string;
}

export interface CreateTouirstRes {
  $id: string;
  createdat: string;
  id: string;
  tourist_email: string;
  tourist_profilepicture: string;
  tourist_location: string;
  tourist_name: string;
}

type CreateTourist = (data: CreateTouristReq) => Promise<CreateTouirstRes>;
