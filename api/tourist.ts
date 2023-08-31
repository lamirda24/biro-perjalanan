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

export const getTourist: FetchTourist = async (id) => {
  const res = await axiosx(true).get(`${url}/${id}`);
  return res.data;
};

export const deleteTourist: DeleteTourist = async (id: string) => {
  const res = await axiosx(true).delete(`${url}/${id}`);
  return res.data;
};

export const updateTourist: UpdateTourist = async ({ id, data }) => {
  const res = await axiosx(true).put(`${url}/${id}`, data);
  return res.data;
};

export interface TouristsList {
  createdat: string;
  id: string;
  tourist_email: string;
  tourist_location: string;
  tourist_name: string;
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

export interface TouristRes {
  $id: string;
  createdat: string;
  id: string;
  tourist_email: string;
  tourist_profilepicture: string;
  tourist_location: string;
  tourist_name: string;
}
export interface UpdateTouristReq {
  id: string;
  data: CreateTouristReq;
}

type CreateTourist = (data: CreateTouristReq) => Promise<TouristRes>;
type UpdateTourist = (args: UpdateTouristReq) => Promise<TouristRes>;
type FetchTourist = (id: string) => Promise<TouristRes>;
type DeleteTourist = (id: string) => Promise<TouristRes>;
