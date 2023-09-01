import axios from 'axios';
import { mainApi } from '../config';

const url = `${mainApi}/api/authaccount/registration`;

export const goRegistration: PostRegistrations = async (data) => {
  const res = await axios.post(url, data);
  return res.data;
};

export interface RegistrationRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegistrationRes {
  $id: string;
  code: number;
  message: string;
  data: RegistrationResponse;
}

export interface RegistrationResponse {
  id: string;
  email: string;
  name: string;
}

type PostRegistrations = (data: RegistrationRequest) => Promise<RegistrationRes>;
