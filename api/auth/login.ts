import axios from "axios";
import { mainApi } from "../config";

const url = `${mainApi}/api/authaccount/login`;

export const postLogin: PostLogin = async (data) => {
  const res = await axios.post(`${url}`, data);

  return res.data;
};

export interface LoginRequest {
  email?: string;
  password?: string;
}

export interface LoginResponse {
  data: ProfileData;
  message: string;
}

export interface ProfileData {
  Id: string;
  name: string;
  email: string;
  Token: string;
}

type PostLogin = (data: LoginRequest) => Promise<LoginResponse>;
