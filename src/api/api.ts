import axios, { AxiosResponse } from "axios";
import { AxiosKnownErrorType } from "../types";

export const handleRequest = async (reqFun: Promise<AxiosResponse>, rejectFun: (val: string) => string | unknown) => {
  try {
    const { data } = await reqFun;
    return data;
  } catch (e: unknown) {
    if (axios.isAxiosError<AxiosKnownErrorType>(e)) {
      return rejectFun(e.message);
    }
    const error = e as string;
    return rejectFun(error)
  }
}
